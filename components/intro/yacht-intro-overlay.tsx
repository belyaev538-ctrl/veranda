"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CompassSvg,
  headingDegFromPointer,
} from "@/components/intro/compass-svg";
import { useIsMobile } from "@/hooks/use-media";
import {
  markIntroSeen,
  type IntroStorageVariant,
} from "@/lib/intro-storage";

const POWER4_IN_OUT = [0.77, 0, 0.175, 1] as const;

type YachtIntroOverlayProps = {
  heroImage: string;
  onComplete: () => void;
  introVariant?: IntroStorageVariant;
  backgroundColor?: string;
  scrollCoords?: readonly string[];
};

export function YachtIntroOverlay({
  heroImage,
  onComplete,
  introVariant = "v2",
  backgroundColor = "#020B26",
  scrollCoords,
}: YachtIntroOverlayProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<"enter" | "idle" | "exit" | "done">("enter");
  const [ticksReady, setTicksReady] = useState(false);
  const triggered = useRef(false);
  const wheelSteps = useRef(0);
  const [coordIndex, setCoordIndex] = useState(0);
  const compassWrapRef = useRef<HTMLDivElement>(null);
  const compassControls = useAnimationControls();
  const headingBase = useRef(0);
  const heading = useMotionValue(0);
  const headingSpring = useSpring(heading, {
    stiffness: 72,
    damping: 18,
    mass: 0.6,
  });
  const isTransitioning = phase === "exit";

  const finish = useCallback(() => {
    markIntroSeen(introVariant);
    setPhase("done");
    onComplete();
  }, [onComplete, introVariant]);

  const pointTo = useCallback((clientX: number, clientY: number) => {
    const el = compassWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const deg = headingDegFromPointer(clientX, clientY, cx, cy);
    headingBase.current = deg;
    heading.set(deg);
  }, [heading]);

  const startExit = useCallback(async () => {
    if (triggered.current || phase !== "idle") return;
    triggered.current = true;
    setPhase("exit");

    await compassControls.start({
      rotate: headingBase.current + 720,
      scale: 8,
      transition: {
        rotate: { duration: 1.2, ease: POWER4_IN_OUT },
        scale: { duration: 1.5, ease: POWER4_IN_OUT },
      },
    });

    window.setTimeout(finish, 350);
  }, [compassControls, finish, phase]);

  useEffect(() => {
    if (reducedMotion) {
      finish();
      return;
    }

    void compassControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    });

    const t = window.setTimeout(() => {
      setTicksReady(true);
      setPhase("idle");
    }, 150);

    return () => window.clearTimeout(t);
  }, [reducedMotion, finish, compassControls]);

  useEffect(() => {
    if (phase !== "idle") return;

    document.body.style.overflow = "hidden";

    const onPointerMove = (e: PointerEvent) => {
      pointTo(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [phase, pointTo]);

  useEffect(() => {
    if (phase !== "idle") return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();

      if (scrollCoords?.length) {
        wheelSteps.current += 1;
        if (wheelSteps.current >= scrollCoords.length) {
          void startExit();
          return;
        }
        setCoordIndex(wheelSteps.current);
        return;
      }

      void startExit();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => window.removeEventListener("wheel", onWheel);
  }, [phase, startExit, scrollCoords]);

  useEffect(() => {
    if (phase !== "idle" || !isMobile) return;

    const auto = window.setTimeout(() => void startExit(), 3000);

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      const t = e.touches[0];
      if (t) pointTo(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) pointTo(t.clientX, t.clientY);

      const y = t?.clientY ?? 0;
      if (touchY - y > 40) {
        e.preventDefault();
        if (scrollCoords?.length) {
          wheelSteps.current += 1;
          if (wheelSteps.current >= scrollCoords.length) {
            void startExit();
            return;
          }
          setCoordIndex(wheelSteps.current);
          return;
        }
        void startExit();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      clearTimeout(auto);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase, isMobile, startExit, pointTo, scrollCoords]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="intro-overlay fixed inset-0 z-[300] flex items-center justify-center"
      style={{ backgroundColor }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      role="presentation"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0d1322]/35" />
      </motion.div>

      <motion.div
        className="intro-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: isTransitioning ? 1 : 0,
          scale: isTransitioning ? 2.8 : 0.4,
        }}
        transition={{ duration: 1.2, ease: POWER4_IN_OUT }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          ref={compassWrapRef}
          className="intro-compass-wrap"
          style={{ rotate: headingSpring }}
          animate={compassControls}
          initial={{ opacity: 0, scale: 0.8 }}
        >
          <CompassSvg ticksReady={ticksReady} />
        </motion.div>
        {scrollCoords && scrollCoords.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.p
              key={scrollCoords[coordIndex]}
              className="intro-coords v3-mono"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {scrollCoords[coordIndex]}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
