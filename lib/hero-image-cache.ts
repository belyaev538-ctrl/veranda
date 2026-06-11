const loadedHeroImages = new Set<string>();

export function markHeroImageLoaded(src: string) {
  loadedHeroImages.add(src);
}

export function isHeroImageLoaded(src: string) {
  return loadedHeroImages.has(src);
}

/** Прогрев кеша браузера до монтирования hero */
export function preloadHeroImage(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (loadedHeroImages.has(src)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      loadedHeroImages.add(src);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}
