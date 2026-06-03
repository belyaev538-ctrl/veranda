import { NextResponse } from "next/server";
import { CONTACT_CHANNELS, type ContactChannelId } from "@/lib/constants";
import type { LeadPayload, LeadSource } from "@/lib/lead-types";
import { validateRuPhone } from "@/lib/phone";
import { sendLeadToTelegram } from "@/lib/telegram";

const VALID_CHANNELS = new Set<ContactChannelId>(
  CONTACT_CHANNELS.map((c) => c.id),
);

function trim(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parseBody(body: unknown): LeadPayload | null {
  if (!body || typeof body !== "object") return null;

  const b = body as Record<string, unknown>;
  const name = trim(b.name, 120);
  const phone = trim(b.phone, 40);
  const source = b.source as LeadSource;
  const variant = b.variant === "1" || b.variant === "2" ? b.variant : undefined;

  if (!name || !phone || (source !== "modal" && source !== "cta")) {
    return null;
  }

  const channels = Array.isArray(b.channels)
    ? (b.channels.filter((c) => typeof c === "string" && VALID_CHANNELS.has(c as ContactChannelId)) as ContactChannelId[])
    : undefined;

  return {
    name,
    phone,
    source,
    variant,
    channels: channels?.length ? channels : undefined,
    telegramHandle: trim(b.telegramHandle, 80) || undefined,
    comment: trim(b.comment, 2000) || undefined,
    yacht: trim(b.yacht, 200) || undefined,
    page: trim(b.page, 300) || undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = parseBody(body);

    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные формы." },
        { status: 400 },
      );
    }

    if (
      lead.source === "modal" &&
      lead.channels?.includes("telegram") &&
      !lead.telegramHandle
    ) {
      return NextResponse.json(
        { ok: false, error: "Укажите никнейм в Telegram." },
        { status: 400 },
      );
    }

    const phoneCheck = validateRuPhone(lead.phone);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { ok: false, error: phoneCheck.error ?? "Некорректный номер телефона." },
        { status: 400 },
      );
    }

    await sendLeadToTelegram({
      ...lead,
      phone: phoneCheck.formatted ?? lead.phone,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error && err.message === "Telegram is not configured"
        ? "Сервис заявок временно недоступен."
        : "Не удалось отправить заявку. Попробуйте позже или напишите в Telegram.";

    console.error("[lead]", err);

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
