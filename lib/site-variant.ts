export type SiteVariant = "1" | "2" | "3" | "4" | "5" | "6";

export const SITE_VARIANTS: Record<
  SiteVariant,
  { label: string; path: string; branch: string }
> = {
  "1": {
    label: "Вариант 1",
    path: "/v1",
    branch: "variant-1",
  },
  "2": {
    label: "Вариант 2",
    path: "/v2",
    branch: "variant-2",
  },
  "3": {
    label: "Вариант 3",
    path: "/v3",
    branch: "variant-3",
  },
  "4": {
    label: "Вариант 4",
    path: "/v4",
    branch: "variant-4",
  },
  "5": {
    label: "Вариант 5",
    path: "/v5",
    branch: "variant-5",
  },
  "6": {
    label: "ЛАУНЖ",
    path: "/",
    branch: "variant-6",
  },
};

export function getVariantLeadSource(
  variant: SiteVariant,
  form: "modal" | "cta",
): string {
  const v = SITE_VARIANTS[variant].label;
  const formLabel =
    form === "modal" ? "модальная форма" : "секция «Контакт»";
  return `${v} · ${formLabel}`;
}
