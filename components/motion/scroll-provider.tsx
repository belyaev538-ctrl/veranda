"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useIsMobile } from "@/hooks/use-media";

export type DeviceTier = "mobile" | "desktop";

type MotionContextValue = {
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  isMobile: boolean;
  reducedMotion: boolean;
  /** Desktop + no reduced motion — full cinematic layers */
  cinematic: boolean;
  deviceTier: DeviceTier;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}

/** Global motion state — single scroll timeline for all sections */
export function MotionProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion() ?? false;
  const cinematic = !isMobile && !reducedMotion;
  const deviceTier: DeviceTier = isMobile ? "mobile" : "desktop";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: reducedMotion || isMobile ? 400 : 88,
    damping: reducedMotion || isMobile ? 42 : 30,
    restDelta: 0.001,
  });

  const smoothProgress =
    reducedMotion || isMobile ? scrollYProgress : springProgress;

  const value = useMemo(
    () => ({
      scrollYProgress,
      smoothProgress,
      isMobile,
      reducedMotion,
      cinematic,
      deviceTier,
    }),
    [
      scrollYProgress,
      smoothProgress,
      isMobile,
      reducedMotion,
      cinematic,
      deviceTier,
    ],
  );

  return (
    <MotionContext.Provider value={value}>
      <motion.main
        ref={ref}
        className="overflow-x-hidden desktop:pb-0"
      >
        {children}
      </motion.main>
    </MotionContext.Provider>
  );
}

export function useScrollMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useScrollMotion must be used within MotionProvider");
  }
  return ctx;
}

/** Alias for spec naming */
export const useMotion = useScrollMotion;
