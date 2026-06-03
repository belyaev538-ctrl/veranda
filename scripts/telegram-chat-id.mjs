/**
 * Узнать TELEGRAM_CHAT_ID группы:
 * 1. Напишите в группе с ботом любое сообщение (например «тест»)
 * 2. npm run telegram:chat-id
 */
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    }
  } catch {
    /* ignore */
  }
}

loadEnvLocal();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Добавьте TELEGRAM_BOT_TOKEN в .env.local");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();

if (!data.ok) {
  console.error("Ошибка API:", data.description);
  process.exit(1);
}

if (!data.result?.length) {
  console.log(
    "Пока пусто. Напишите сообщение в группе, где бот — админ, и запустите снова.",
  );
  process.exit(0);
}

const seen = new Set();
for (const u of data.result) {
  const chat = u.message?.chat ?? u.my_chat_member?.chat;
  if (!chat?.id || seen.has(chat.id)) continue;
  seen.add(chat.id);
  const title = chat.title ?? chat.username ?? chat.first_name ?? "?";
  console.log(`Chat ID: ${chat.id}  (${chat.type}: ${title})`);
}

console.log("\nСкопируйте нужный ID в .env.local → TELEGRAM_CHAT_ID=");
