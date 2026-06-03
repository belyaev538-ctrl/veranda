"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LightSweep } from "@/components/motion/light-sweep";
import { useIntro } from "@/components/intro/intro-context";
import {
  V2_HERO_ENTRANCE,
  V2_HERO_LINES,
  V2_IMAGES,
} from "@/lib/v2-content";
import { luxuryEase } from "@/lib/motion";

type HeroScrollLine = (typeof V2_HERO_LINES)[number];

function heroLineParts(line: HeroScrollLine): readonly string[] {
  return typeof line === "string" ? [line] : line;
}

function heroLineKey(line: HeroScrollLine): string {
  return heroLineParts(line).join("|");
}

type V2HeroProps = {
  /** Якорь секции (v4 использует #v4-hero) */
  sectionId?: string;
  /** Свой кадр hero (например /v5 — yacht-7) */
  heroImage?: string;
  heroLines?: readonly HeroScrollLine[];
  /** Множитель зума фото при скролле (1 = 1→1.12, 3 = 1→1.36) */
  scrollZoomMultiplier?: number;
  /** Мерцание на фото в конце прокрутки hero (как production-card) */
  heroEndFlicker?: boolean;
  /** WebGL-лучи сверху (v5 hero) */
  lightRays?: boolean;
};

const LightRays = dynamic(() => import("@/components/motion/light-rays"), {
  ssr: false,
});

const HERO_SCROLL_SCALE_END = 1.12;

export function V2Hero({
  sectionId = "v2-hero",
  heroImage = V2_IMAGES.hero,
  heroLines = V2_HERO_LINES,
  scrollZoomMultiplier = 1,
  heroEndFlicker = false,
  lightRays = false,
}: V2HeroProps) {
  const reducedMotion = useReducedMotion();
  const { heroEnter } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const [showScrollLines, setShowScrollLines] = useState(false);
  const [kenBurns, setKenBurns] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleEnd =
    1 + (HERO_SCROLL_SCALE_END - 1) * Math.max(1, scrollZoomMultiplier);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, scaleEnd]);
  const endFlickerOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.92, 1],
    [0, 1, 1],
  );
  const line0 = useTransform(scrollYProgress, [0, 0.28, 0.32], [1, 1, 0]);
  const line1 = useTransform(scrollYProgress, [0.22, 0.32, 0.58, 0.62], [0, 1, 1, 0]);
  const line2 = useTransform(scrollYProgress, [0.52, 0.62, 1], [0, 1, 1]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacities = [line0, line1, line2];

  useEffect(() => {
    if (!heroEnter) return;
    setKenBurns(true);
    const t = window.setTimeout(() => setShowScrollLines(true), 2200);
    return () => window.clearTimeout(t);
  }, [heroEnter]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (heroEnter && v > 0.04) setShowScrollLines(true);
  });

  return (
    <section
      id={sectionId}
      ref={ref}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-svh min-h-[520px] overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: imageScale }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={kenBurns ? { scale: [1, 1.06] } : { scale: 1 }}
            transition={
              kenBurns
                ? {
                    duration: 18,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }
                : undefined
            }
          >
            <Image
              src={heroImage}
              alt="Яхта в Средиземном море"
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
            {heroEndFlicker && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-[2]"
                style={{ opacity: endFlickerOpacity }}
                aria-hidden
              >
                <LightSweep className="v2-hero-end-sweep" loop />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        {lightRays && !reducedMotion && (
          <div className="pointer-events-none absolute inset-0 z-[4]">
            <LightRays
              className="v2-hero-light-rays"
              raysOrigin="top-center"
              raysColor="#d4ebff"
              raysSpeed={1}
              lightSpread={0.34}
              rayLength={3.6}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={1.1}
              saturation={1}
              intensity={1.5}
            />
          </div>
        )}
        <div className="v2-hero-overlay absolute inset-0 z-[3]" aria-hidden />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end pb-8 tablet:pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: heroEnter ? 1 : 0 }}
          transition={{ duration: 1.2, ease: luxuryEase }}
        >
          <div className="container-luxury v2-hero-bottom w-full text-center">
            <div className="relative min-h-[clamp(5rem,18vw,11rem)] w-full">
              {heroEnter && !showScrollLines && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1">
                  {V2_HERO_ENTRANCE.map((word, i) => (
                    <motion.h1
                      key={word}
                      className="v2-hero-line !relative !bottom-auto"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.85,
                        ease: luxuryEase,
                      }}
                    >
                      {word}
                    </motion.h1>
                  ))}
                </div>
              )}

              {showScrollLines &&
                heroLines.map((line, i) => (
                  <motion.h1
                    key={heroLineKey(line)}
                    className="v2-hero-line v2-hero-line--stack absolute inset-x-0 bottom-0"
                    style={{ opacity: opacities[i] }}
                  >
                    {heroLineParts(line).map((row) => (
                      <span key={row} className="block">
                        {row}
                      </span>
                    ))}
                  </motion.h1>
                ))}
            </div>

            <motion.p
              className="v2-scroll-hint mt-6 tablet:mt-8"
              style={{ opacity: scrollHintOpacity }}
            >
              Листайте вниз
            </motion.p>

            <motion.div
              className="mt-4 flex justify-center tablet:mt-5"
              style={{ opacity: scrollHintOpacity }}
              aria-hidden
            >
              <span className="block h-10 w-px bg-white/30 tablet:h-12" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
