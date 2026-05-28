/** Assets in /public/images (source: /image) */
export const IMAGE_FILES = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image11.png",
] as const;

export const IMAGE_COUNT = IMAGE_FILES.length;

/** Слоты 1–18 по секциям лендинга */
const PHOTO_TO_IMAGE: Record<number, (typeof IMAGE_FILES)[number]> = {
  1: IMAGE_FILES[0], // Hero
  2: IMAGE_FILES[1], // Philosophy
  3: IMAGE_FILES[2], // Project 1
  4: IMAGE_FILES[3], // Project 2
  5: IMAGE_FILES[4], // Project 3
  6: IMAGE_FILES[5], // Project 4
  7: IMAGE_FILES[6], // CTA
  8: IMAGE_FILES[7], // Material + production
  9: IMAGE_FILES[8],
  10: IMAGE_FILES[9],
  11: IMAGE_FILES[10],
  12: IMAGE_FILES[4], // Material 5 (11 файлов — один повтор)
  13: IMAGE_FILES[6], // Gallery
  14: IMAGE_FILES[7],
  15: IMAGE_FILES[8],
  16: IMAGE_FILES[9],
  17: IMAGE_FILES[10],
  18: IMAGE_FILES[5],
};

export function getImageSrc(photo: number): string {
  return PHOTO_TO_IMAGE[photo] ?? IMAGE_FILES[(photo - 1) % IMAGE_COUNT];
}

export function getImageAlt(photo: number): string {
  return `VERANDARU — фото ${photo}`;
}
