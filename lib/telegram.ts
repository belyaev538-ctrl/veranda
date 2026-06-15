import { CONTACT_CHANNELS } from "@/lib/constants";
import type { LeadPayload } from "@/lib/lead-types";
import { getVariantLeadSource } from "@/lib/site-variant";

const CHANNEL_LABELS = Object.fromEntries(
  CONTACT_CHANNELS.map((c) => [c.id, c.label]),
) as Record<string, string>;

function getSourceLabel(lead: LeadPayload): string {
  if (lead.variant) {
    return getVariantLeadSource(lead.variant, lead.source);
  }
  return lead.source === "modal"
    ? "Модальная форма (шапка / кнопки на сайте)"
    : "Секция «Контакт» внизу страницы";
}

function escapeTelegram(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSubmittedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatLeadMessage(lead: LeadPayload): string {
  const isCatalog = lead.requestType === "catalog";
  const lines = [
    isCatalog
      ? "<b>📖 Запрос каталога VERANDARU</b>"
      : "<b>🛥 Новая заявка VERANDARU</b>",
    `<b>Дата и время:</b> ${formatSubmittedAt()} (МСК)`,
    `<b>Источник:</b> ${escapeTelegram(getSourceLabel(lead))}`,
    ...(lead.page
      ? [`<b>Страница:</b> ${escapeTelegram(lead.page)}`]
      : []),
    "",
    `<b>Имя:</b> ${escapeTelegram(lead.name)}`,
    `<b>Телефон:</b> ${escapeTelegram(lead.phone)}`,
  ];

  if (lead.channels?.length) {
    const labels = lead.channels.map((id) => CHANNEL_LABELS[id] ?? id).join(", ");
    lines.push(`<b>Связь:</b> ${escapeTelegram(labels)}`);
  }

  if (lead.telegramHandle?.trim()) {
    lines.push(`<b>Telegram:</b> ${escapeTelegram(lead.telegramHandle.trim())}`);
  }

  if (lead.yacht?.trim()) {
    lines.push(`<b>Яхта / зона:</b> ${escapeTelegram(lead.yacht.trim())}`);
  }

  if (lead.comment?.trim()) {
    lines.push("", `<b>Комментарий:</b>`, escapeTelegram(lead.comment.trim()));
  }

  return lines.join("\n");
}

export async function sendLeadToTelegram(lead: LeadPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const data = (await res.json()) as { ok: boolean; description?: string };

  if (!res.ok || !data.ok) {
    throw new Error(data.description ?? "Telegram API error");
  }
}
