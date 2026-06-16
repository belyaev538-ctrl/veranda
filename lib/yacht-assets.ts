/**
 * Ассеты из /image → /public/images
 * Hero (яхта4) — только v2–v5. Вариант 1 использует другой кадр на первом экране.
 */

export const YACHT_HERO = "/images/yacht-hero.webp";

/** Hero только для /v5 / v6 */
export const YACHT_HERO_V5 = "/images/hero-v5.png";

/** Fullscreen statement #v5-statement-visual */
export const YACHT_STATEMENT_V5 = "/images/statement-visual.png";

/** Молочная/философия панель #v5-statement */
export const YACHT_PHILOSOPHY_V5 = "/images/philosophy-statement.png";

/** Visual chapter Made for the Sea #v5-made-sea */
export const YACHT_MADE_SEA_V5 = "/images/made-sea.png";

/** Visual chapter Outdoor Living #v5-outdoor-living */
export const YACHT_OUTDOOR_LIVING_V5 = "/images/outdoor-living.png";

/** Visual chapter Attention to Detail #v5-detail */
export const YACHT_DETAIL_V5 = "/images/detail.png";

/** Yacht zone Foredeck — коллекция Лагун */
export const YACHT_LAGOON_FOREDECK = "/images/zone-foredeck.png";

/** Yacht zone Aft Deck — коллекция Лагун */
export const YACHT_LAGOON_AFT_DECK = "/images/lagoon-aft-deck.webp";

/** Yacht zone Flybridge — коллекция Лагун */
export const YACHT_LAGOON_FLYBRIDGE = "/images/lagoon-flybridge.webp";

/** Collections card LAGOON — коллекция Лагун */
export const YACHT_LAGOON_COLLECTION = "/images/collection-lagoon.png";

/** Collections card DUNE — коллекция Дюна */
export const YACHT_COLLECTION_DUNE = "/images/collection-dune.png";

/** Collections card BREEZE — коллекция Бриз */
export const YACHT_COLLECTION_BREEZE = "/images/collection-breeze.png";

/** Collections card GRID — коллекция Грид */
export const YACHT_COLLECTION_GRID = "/images/collection-grid.png";

/** Collections card JARDIN — коллекция Жардин Кутюр */
export const YACHT_COLLECTION_JARDIN = "/images/collection-jardin.png";

/** Visualization block #v5-viz */
export const YACHT_VIZ_V5 = "/images/viz.png";

/** Yacht zone Beach Club */
export const YACHT_ZONE_BEACH = "/images/zone-beach.png";

/** Materials */
export const YACHT_MATERIAL_TEAK = "/images/material-teak.png";
export const YACHT_MATERIAL_IROKO = "/images/material-iroko.png";
export const YACHT_MATERIAL_AGORA = "/images/material-agora.png";
export const YACHT_MATERIAL_AISI304 = "/images/material-aisi304.png";
export const YACHT_MATERIAL_FOAM = "/images/material-foam.png";

/** NDA block #v5-nda */
export const YACHT_NDA_V5 = "/images/nda.png";

/** Contact block #v5-contact */
export const YACHT_CONTACT_V5 = "/images/contact.png";

/** Gallery #v5-gallery */
export const YACHT_GALLERY_BRIZ_06 = "/images/gallery-briz-06.webp";
export const YACHT_GALLERY_BRIZ_03 = "/images/gallery-briz-03.webp";
export const YACHT_GALLERY_BRIZ_01 = "/images/gallery-briz-01.png";
export const YACHT_GALLERY_GRID_01 = "/images/gallery-grid-01.png";
export const YACHT_GALLERY_GRID_10 = "/images/gallery-grid-10.webp";
export const YACHT_GALLERY_JARDIN_01 = "/images/gallery-jardin-01.webp";
export const YACHT_GALLERY_JARDIN_09 = "/images/gallery-jardin-09.webp";
export const YACHT_GALLERY_JARDIN_10 = "/images/gallery-jardin-10.webp";
export const YACHT_GALLERY_MISC_11 = "/images/gallery-misc-11.webp";

/** Visual chapter Outdoor Living — коллекция Лагун */
export const YACHT_LAGOON_OUTDOOR_LIVING = "/images/lagoon-outdoor-living.webp";

/** Visual chapter Attention to Detail — коллекция Лагун */
export const YACHT_LAGOON_DETAIL = "/images/lagoon-detail.webp";

/** Production step 01 — Деревообработка */
export const YACHT_PRODUCTION_STEP_01 = "/images/production-step-01.webp";

/** Production step 02 — Металлопроизводство */
export const YACHT_PRODUCTION_STEP_02 = "/images/production-step-02.webp";

/** Production step 03 — Пошив мягких элементов */
export const YACHT_PRODUCTION_STEP_03 = "/images/production-step-03.webp";

/** Production step 04 — Финальная сборка */
export const YACHT_PRODUCTION_STEP_04 = "/images/production-step-04.png";

/** Materials tile SUNBRELLA */
export const YACHT_MATERIAL_SUNBRELLA = "/images/material-sunbrella.webp";

/** Yacht zone Sundeck */
export const YACHT_ZONE_SUNDECK = "/images/zone-sundeck.png";

/** Yacht zone Dining — коллекция Лагун */
export const YACHT_LAGOON_DINING = "/images/lagoon-dining.webp";

/** Yacht zone Private Lounge — коллекция Лагун */
export const YACHT_LAGOON_LOUNGE = "/images/zone-lounge.png";

/** Пул для расстановки по секциям (дубли при нехватке) */
export const YACHT_POOL = [
  "/images/yacht-hero.webp",
  "/images/yacht-2.webp",
  "/images/yacht-3.webp",
  "/images/yacht-deck.webp",
  "/images/image13.webp",
  "/images/image14.webp",
  "/images/image1.webp",
  "/images/image4.webp",
  "/images/image5.webp",
  "/images/image6.webp",
  "/images/image7.webp",
  "/images/image8.webp",
  "/images/image9.webp",
  "/images/image10.webp",
  "/images/yacht-2.webp",
  "/images/image12.webp",
  "/images/image2.webp",
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
export const V1_HERO_IMAGE = "/images/image13.webp";
