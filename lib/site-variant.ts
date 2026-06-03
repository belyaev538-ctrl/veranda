export type SiteVariant = "1" | "2";

export const SITE_VARIANTS: Record<
  SiteVariant,
  { label: string; path: string; branch: string }
> = {
  "1": {
    label: "Вариант 1",
    path: "/",
    branch: "variant-1",
  },
  "2": {
    label: "Вариант 2",
    path: "/variant-2",
    branch: "variant-2",
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
