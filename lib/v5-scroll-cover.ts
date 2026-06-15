/** Desktop scroll-cover: sticky runway + overlap for layer-on-layer scroll */
export const V5_SCROLL_COVER_PIN =
  "lg:h-[240vh] lg:min-h-[1248px]" as const;

export const V5_SCROLL_COVER_OVERLAP = "lg:-mt-[100svh]" as const;

export const V5_SCROLL_COVER_SPRING = {
  stiffness: 48,
  damping: 30,
  mass: 0.9,
  restDelta: 0.0005,
} as const;

/** Scroll progress: brief hold before fade-out on cover */
export const V5_SCROLL_COVER_EXIT = {
  outStart: 0.62,
  outEnd: 0.88,
} as const;

export const V5_SCROLL_COVER_FADE = {
  holdEnd: 0.65,
  fadeEnd: 0.88,
} as const;
