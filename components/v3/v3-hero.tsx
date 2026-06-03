"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/intro/intro-context";
import {
  V3_HERO_ENTRANCE,
  V3_HERO_LINES,
  V3_IMAGES,
} from "@/lib/v3-content";
import { luxuryEase } from "@/lib/motion";

export function V3Hero() {
  const { heroEnter } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const [showScrollLines, setShowScrollLines] = useState(false);
  const [kenBurns, setKenBurns] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
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
      id="v3-hero"
      ref={ref}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-svh min-h-[520px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
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
              src={V3_IMAGES.hero}
              alt="Яхта в Средиземном море"
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
        <div className="v3-hero-overlay absolute inset-0" aria-hidden />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end pb-8 tablet:pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: heroEnter ? 1 : 0 }}
          transition={{ duration: 1.2, ease: luxuryEase }}
        >
          <div className="container-luxury v3-hero-bottom w-full text-center">
            <div className="relative min-h-[clamp(5rem,18vw,11rem)] w-full">
              {heroEnter && !showScrollLines && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1">
                  {V3_HERO_ENTRANCE.map((word, i) => (
                    <motion.h1
                      key={word}
                      className="v3-hero-line !relative !bottom-auto"
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
                V3_HERO_LINES.map((line, i) => (
                  <motion.h1
                    key={line.join("|")}
                    className="v3-hero-line v2-hero-line--stack absolute inset-x-0 bottom-0"
                    style={{ opacity: opacities[i] }}
                  >
                    {line.map((row) => (
                      <span key={row} className="block">
                        {row}
                      </span>
                    ))}
                  </motion.h1>
                ))}
            </div>

            <motion.p
              className="v3-scroll-hint mt-6 tablet:mt-8"
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
