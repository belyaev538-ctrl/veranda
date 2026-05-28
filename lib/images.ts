/** Ассеты в /public/images (исходники: /image) */
export const IMAGE_FILES = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image11.png",
  "/images/image12.png",
  "/images/image13.png",
  "/images/image14.png",
] as const;

export const IMAGE_COUNT = IMAGE_FILES.length;

/** Смысловые ключи — удобно переставлять без дублей image1≈image3 */
const IMG = {
  loungeClassic: "/images/image1.png",
  craftDetail: "/images/image2.png",
  sunbedBow: "/images/image4.png",
  cockpitLounge: "/images/image5.png",
  diningAft: "/images/image6.png",
  softClose: "/images/image7.png",
  loungeWide: "/images/image8.png",
  resortLounge: "/images/image9.png",
  curvedSunset: "/images/image10.png",
  editorialSplit: "/images/image11.png",
  flybridgeSet: "/images/image12.png",
  heroPanorama: "/images/image13.png",
  textileDetail: "/images/image14.png",
} as const;

/** Слоты 1–18 по секциям лендинга */
const PHOTO_TO_IMAGE: Record<number, (typeof IMAGE_FILES)[number]> = {
  1: IMG.heroPanorama,
  2: IMG.loungeWide,
  3: IMG.flybridgeSet,
  4: IMG.diningAft,
  5: IMG.sunbedBow,
  6: IMG.cockpitLounge,
  7: IMG.curvedSunset,
  8: IMG.craftDetail,
  9: IMG.editorialSplit,
  10: IMG.softClose,
  11: IMG.resortLounge,
  12: IMG.textileDetail,
  13: IMG.loungeClassic,
  14: IMG.sunbedBow,
  15: IMG.resortLounge,
  16: IMG.editorialSplit,
  17: IMG.cockpitLounge,
  18: IMG.heroPanorama,
};

const PHOTO_ALT: Record<number, string> = {
  1: "Лаунж на палубе яхты на закате — VERANDARU",
  2: "Премиальная мебель для зон отдыха на яхте",
  3: "Лаунж на flybridge — коллекция VERANDARU",
  4: "Dining-зона на кормовой палубе",
  5: "Sunbed-зона на носу яхты",
  6: "Зона отдыха в cockpit",
  7: "Обсудить проект мебели для яхты",
  8: "Тик и плетение — материалы VERANDARU",
  9: "Столярка и детали отделки на производстве",
  10: "Outdoor-ткани и мягкие элементы",
  11: "Кастомная комплектация под проект яхты",
  12: "Текстиль с быстрым отводом влаги",
  13: "Яхтенный проект — палубная зона",
  14: "Sunbed и шезлонги на палубе",
  15: "Лаунж у воды на закате",
  16: "Детали отделки и сервировки",
  17: "Зона отдыха на палубе",
  18: "Панорама палубы на закате",
};

export function getImageSrc(photo: number): string {
  return PHOTO_TO_IMAGE[photo] ?? IMAGE_FILES[(photo - 1) % IMAGE_COUNT];
}

export function getImageAlt(photo: number): string {
  return PHOTO_ALT[photo] ?? `VERANDARU — фото ${photo}`;
}
