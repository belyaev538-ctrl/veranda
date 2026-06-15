"use client";

import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-media";

/** Анимации появления секций — только desktop, не mobile */
export function useV5MotionEnabled() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile(767);
  return !reduced && !isMobile;
}
