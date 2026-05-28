import type { Variants } from "framer-motion";

export const luxuryEase = [0.22, 1, 0.36, 1] as const;
export const luxuryEaseSlow = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: luxuryEase },
  },
};

export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: luxuryEase },
  },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.15, ease: luxuryEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: luxuryEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

/** Luxury pacing — slower, calmer */
export const staggerLuxury: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.18 },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-10%" as const,
};
