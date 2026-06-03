/**
 * Ассеты из /image → /public/images
 * Hero (яхта4) — только v2–v5. Вариант 1 использует другой кадр на первом экране.
 */

export const YACHT_HERO = "/images/yacht-hero.png";

/** Hero только для /v5 */
export const YACHT_HERO_V5 = "/images/yacht-7.png";

/** Пул для расстановки по секциям (дубли при нехватке) */
export const YACHT_POOL = [
  "/images/yacht-hero.png",
  "/images/yacht-2.png",
  "/images/yacht-3.png",
  "/images/yacht-deck.png",
  "/images/image13.png",
  "/images/image14.png",
  "/images/image1.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/yacht-2.png",
  "/images/image12.png",
  "/images/image2.png",
] as const;

export type YachtImagePath = (typeof YACHT_POOL)[number];

export function yachtImg(index: number): YachtImagePath {
  return YACHT_POOL[index % YACHT_POOL.length]!;
}

/** v2 / v3 / v4 / v5 — общие слоты */
export const YACHT_VARIANT_IMAGES = {
  hero: YACHT_HERO,
  somnium: yachtImg(3),
  yard: yachtImg(4),
  refit: yachtImg(5),
  craft: yachtImg(6),
  interior: yachtImg(7),
} as const;

/** v1 — первый экран без yacht-hero */
export const V1_HERO_IMAGE = "/images/image13.png";
