import type { LeadPayload } from "@/lib/lead-types";

function getPageContext(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const { pathname, search, hash } = window.location;
  const path = `${pathname}${search}${hash}`;
  return path === "/" ? "Главная (/)" : path;
}

export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page: payload.page ?? getPageContext(),
    }),
  });

  const data = (await res.json()) as { ok?: boolean; error?: string };

  if (!res.ok || !data.ok) {
    return {
      ok: false,
      error: data.error ?? "Не удалось отправить заявку.",
    };
  }

  return { ok: true };
}
