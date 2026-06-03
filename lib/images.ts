import { V1_HERO_IMAGE, YACHT_POOL, yachtImg } from "@/lib/yacht-assets";

/** Ассеты в /public/images (исходники: /image) */
export const IMAGE_FILES = [...YACHT_POOL] as const;

export const IMAGE_COUNT = IMAGE_FILES.length;

const IMG = {
  loungeClassic: yachtImg(6),
  craftDetail: yachtImg(7),
  sunbedBow: yachtImg(8),
  cockpitLounge: yachtImg(9),
  diningAft: yachtImg(10),
  softClose: yachtImg(11),
  loungeWide: yachtImg(12),
  resortLounge: yachtImg(13),
  curvedSunset: yachtImg(14),
  editorialSplit: yachtImg(15),
  flybridgeSet: yachtImg(1),
  heroPanorama: V1_HERO_IMAGE,
  textileDetail: yachtImg(4),
} as const;

/** Слоты 1–18 по секциям лендинга (v1: hero ≠ yacht-hero) */
const PHOTO_TO_IMAGE: Record<number, (typeof IMAGE_FILES)[number]> = {
  1: V1_HERO_IMAGE,
  2: yachtImg(2),
  3: yachtImg(3),
  4: yachtImg(4),
  5: yachtImg(5),
  6: yachtImg(6),
  7: yachtImg(7),
  8: yachtImg(8),
  9: yachtImg(9),
  10: yachtImg(10),
  11: yachtImg(11),
  12: yachtImg(12),
  13: yachtImg(13),
  14: yachtImg(14),
  15: yachtImg(15),
  16: yachtImg(0),
  17: yachtImg(1),
  18: yachtImg(2),
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
