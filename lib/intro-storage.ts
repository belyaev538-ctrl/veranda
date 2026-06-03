const INTRO_KEYS = {
  v2: "verandaru-yacht-intro-v2-seen",
  v3: "verandaru-yacht-intro-v3-seen",
  v4: "verandaru-yacht-intro-v4-seen",
  v5: "verandaru-yacht-intro-v5-seen",
} as const;

export type IntroStorageVariant = keyof typeof INTRO_KEYS;

export function hasSeenIntro(variant: IntroStorageVariant = "v2"): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(INTRO_KEYS[variant]) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(variant: IntroStorageVariant = "v2"): void {
  try {
    localStorage.setItem(INTRO_KEYS[variant], "1");
  } catch {
    /* private mode */
  }
}
