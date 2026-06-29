function escapeTelegram(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatSubmittedAt(date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getSourceLabel(lead) {
  if (lead.source === "modal") return "ЛАУНЖ · модальная форма";
  if (lead.source === "cta") return "ЛАУНЖ · секция «Контакт»";
  return "ЛАУНЖ";
}

function formatLeadMessage(lead) {
  const lines = [
    "<b>🛥 Новая заявка ЛАУНЖ</b>",
    `<b>Дата и время:</b> ${formatSubmittedAt()} (МСК)`,
    `<b>Источник:</b> ${escapeTelegram(getSourceLabel(lead))}`,
  ];

  if (lead.page) lines.push(`<b>Страница:</b> ${escapeTelegram(lead.page)}`);
  lines.push("", `<b>Имя:</b> ${escapeTelegram(lead.name)}`, `<b>Телефон:</b> ${escapeTelegram(lead.phone)}`);

  if (lead.comment) lines.push("", `<b>Комментарий:</b>`, escapeTelegram(lead.comment));

  return lines.join("\n");
}

function getTelegramChatIds() {
  const fromList = process.env.TELEGRAM_CHAT_IDS?.trim();
  if (fromList) {
    return fromList.split(/[,;\s]+/).map((id) => id.trim()).filter(Boolean);
  }

  const single = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!single) return [];

  return single.split(/[,;\s]+/).map((id) => id.trim()).filter(Boolean);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const secret = process.env.TELEGRAM_RELAY_SECRET;
  const auth = req.headers.authorization?.replace(/^Bearer\s+/i, "");

  if (!secret || auth !== secret) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return;
  }

  const lead = req.body;
  if (!lead?.name || !lead?.phone) {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = getTelegramChatIds();

  if (!token || !chatIds.length) {
    res.status(500).json({ ok: false, error: "Telegram is not configured" });
    return;
  }

  const text = formatLeadMessage(lead);

  try {
    for (const chatId of chatIds) {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      const data = await tgRes.json();

      if (!tgRes.ok || !data.ok) {
        res.status(500).json({ ok: false, error: data.description ?? "Telegram API error" });
        return;
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Relay error",
    });
  }
};
