"use client";

import Image from "next/image";
import {
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
import { useLoaderProgress } from "@/hooks/use-loader-progress";
import { cn } from "@/lib/cn";

const POWER4_IN_OUT = [0.77, 0, 0.175, 1] as const;

type CompassLoaderOverlayProps = {
  backgroundColor?: string;
  heroImage?: string;
  /** fixed — на весь экран; absolute — внутри родителя (hero) */
  variant?: "fixed" | "absolute";
  className?: string;
  /** Запускает анимацию выхода (компас + reveal фото) */
  complete?: boolean;
  onDismissed?: () => void;
  /** Счётчик «Загрузка N%» внизу */
  showProgress?: boolean;
  /** Повторно не грузить hero при выходе (кадр уже под оверлеем) */
  revealHeroOnExit?: boolean;
  /** После complete оставить компас на экране (v5 hero) */
  persistOnComplete?: boolean;
  /** Вызывается когда загрузка завершена (в т.ч. при persist) */
  onReady?: () => void;
};

export function CompassLoaderOverlay({
  backgroundColor = "#020B1F",
  heroImage,
  variant = "fixed",
  className,
  complete = false,
  onDismissed,
  showProgress = true,
  revealHeroOnExit = true,
  persistOnComplete = false,
  onReady,
}: CompassLoaderOverlayProps) {
  const reducedMotion = useReducedMotion();
  const [ticksReady, setTicksReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const compassWrapRef = useRef<HTMLDivElement>(null);
  const compassControls = useAnimationControls();
  const dismissedRef = useRef(false);
  const headingBase = useRef(0);
  const heading = useMotionValue(0);
  const headingSpring = useSpring(heading, {
    stiffness: 72,
    damping: 18,
    mass: 0.6,
  });
  const progress = useLoaderProgress(complete, exiting);

  const pointTo = useCallback(
    (clientX: number, clientY: number) => {
      const el = compassWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const deg = headingDegFromPointer(clientX, clientY, cx, cy);
      headingBase.current = deg;
      heading.set(deg);
    },
    [heading],
  );

  useEffect(() => {
    if (reducedMotion) {
      setTicksReady(true);
      return;
    }

    void compassControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    });

    const t = window.setTimeout(() => setTicksReady(true), 150);
    return () => window.clearTimeout(t);
  }, [reducedMotion, compassControls]);

  const gentleExit = !revealHeroOnExit;

  useEffect(() => {
    if (!complete || dismissedRef.current) return;

    if (persistOnComplete) {
      dismissedRef.current = true;
      onReady?.();
      return;
    }

    if (reducedMotion) {
      dismissedRef.current = true;
      onReady?.();
      onDismissed?.();
      return;
    }

    dismissedRef.current = true;
    setExiting(true);

    if (gentleExit) {
      void (async () => {
        await compassControls.start({
          opacity: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        });
        onReady?.();
        onDismissed?.();
      })();
      return;
    }

    void (async () => {
      await compassControls.start({
        rotate: headingBase.current + 720,
        scale: 8,
        transition: {
          rotate: { duration: 1.2, ease: POWER4_IN_OUT },
          scale: { duration: 1.5, ease: POWER4_IN_OUT },
        },
      });
      window.setTimeout(() => {
        onReady?.();
        onDismissed?.();
      }, 350);
    })();
  }, [
    complete,
    gentleExit,
    reducedMotion,
    persistOnComplete,
    compassControls,
    onDismissed,
    onReady,
  ]);

  useEffect(() => {
    if (reducedMotion || exiting || !ticksReady) return;

    const onPointerMove = (e: PointerEvent) => {
      pointTo(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion, exiting, ticksReady, pointTo]);

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        variant === "fixed"
          ? "intro-overlay fixed inset-0 z-[300]"
          : "absolute inset-0 z-[20]",
        exiting && "pointer-events-none",
        className,
      )}
      style={{ backgroundColor }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{
        duration: gentleExit && exiting ? 0.45 : 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      role="status"
      aria-live="polite"
      aria-busy={!complete}
      aria-label={`Загрузка ${progress}%`}
    >
      {heroImage && revealHeroOnExit && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 1 : 0 }}
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
      )}

      {!gentleExit && (
        <motion.div
          className="intro-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: exiting ? 1 : 0,
            scale: exiting ? 2.8 : 0.4,
          }}
          transition={{ duration: 1.2, ease: POWER4_IN_OUT }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          ref={compassWrapRef}
          className="intro-compass-wrap"
          style={exiting ? undefined : { rotate: headingSpring }}
          animate={compassControls}
          initial={{
            opacity: reducedMotion ? 1 : 0,
            scale: reducedMotion ? 1 : 0.8,
          }}
        >
          <CompassSvg ticksReady={ticksReady} />
        </motion.div>
      </div>

      {showProgress && !exiting && (
        <div className="intro-loader-progress pointer-events-none absolute inset-x-0 bottom-8 z-10 tablet:bottom-10">
          <p className="intro-loader-progress__label">Загрузка</p>
          <p className="intro-loader-progress__value">{progress}%</p>
        </div>
      )}
    </motion.div>
  );
}
