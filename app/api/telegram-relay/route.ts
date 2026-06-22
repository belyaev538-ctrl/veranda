import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/lead-types";
import {
  isTelegramRelayAuthorized,
  sendLeadToTelegramDirect,
} from "@/lib/telegram";

function parseRelayLead(body: unknown): LeadPayload | null {
  if (!body || typeof body !== "object") return null;

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const source = b.source;

  if (!name || !phone || (source !== "modal" && source !== "cta")) {
    return null;
  }

  return body as LeadPayload;
}

/** Relay: yacht.veranda.ru → Vercel → api.telegram.org */
export async function POST(request: Request) {
  if (!isTelegramRelayAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const lead = parseRelayLead(body);

    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 },
      );
    }

    await sendLeadToTelegramDirect(lead);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram-relay]", err);

    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error ? err.message : "Failed to send to Telegram",
      },
      { status: 500 },
    );
  }
}
