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
import { HeroCompassCoords } from "@/components/hero/hero-compass-coords";
import { CompassLoaderOverlay } from "@/components/intro/compass-loader-overlay";
import { LightSweep } from "@/components/motion/light-sweep";
import { useIntro } from "@/components/intro/intro-context";
import { useIsMobile } from "@/hooks/use-media";
import {
  V2_HERO_ENTRANCE,
  V2_HERO_LINES,
  V2_IMAGES,
} from "@/lib/v2-content";
import { isHeroImageLoaded, markHeroImageLoaded } from "@/lib/hero-image-cache";
import { luxuryEase } from "@/lib/motion";

const HERO_COMPASS_MIN_MS = 2400;

type HeroScrollLine = string | (typeof V2_HERO_LINES)[number];

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
  /** Цвет лучей (v5 — голубой акцент) */
  lightRaysColor?: string;
  /** Компас-лоадер пока грузится hero-фото (v5) */
  heroImageLoader?: boolean;
  /** Сразу scroll-строки без intro-анимации; смена только по скроллу (v5) */
  scrollLinesFromStart?: boolean;
  /** Высота scroll-runway секции (v5 — длиннее, чтобы успели все строки) */
  heroScrollHeight?: string;
  /** Компас по центру hero (v5) */
  heroCompassCenter?: boolean;
  /** Статичный оффер на мобилке вместо scroll-смены строк */
  heroMobileOffer?: string;
  onHeroLoaderDismissed?: () => void;
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
  lightRaysColor = "#d4ebff",
  heroImageLoader = false,
  scrollLinesFromStart = false,
  heroScrollHeight = "300vh",
  heroCompassCenter = false,
  heroMobileOffer,
  onHeroLoaderDismissed,
}: V2HeroProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(767);
  const useMobileStaticHero = isMobile && Boolean(heroMobileOffer);
  const { heroEnter, introWasPlayed, signalHeroEnter } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showScrollLines, setShowScrollLines] = useState(false);
  const [kenBurns, setKenBurns] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(!heroImageLoader);
  const [heroLoaderDismissed, setHeroLoaderDismissed] = useState(!heroImageLoader);
  const [compassMinReady, setCompassMinReady] = useState(!heroImageLoader);

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
  const line0 = useTransform(
    scrollYProgress,
    scrollLinesFromStart ? [0, 0.14, 0.18] : [0, 0.28, 0.32],
    [1, 1, 0],
  );
  const line1 = useTransform(
    scrollYProgress,
    scrollLinesFromStart ? [0.1, 0.18, 0.34, 0.4] : [0.22, 0.32, 0.58, 0.62],
    [0, 1, 1, 0],
  );
  const line2 = useTransform(
    scrollYProgress,
    scrollLinesFromStart ? [0.3, 0.4, 0.82, 0.92] : [0.52, 0.62, 1],
    scrollLinesFromStart ? [0, 1, 1, 0] : [0, 1, 1],
  );
  /** Подсказка и стрелка — видны всё время смены строк, гаснут ближе к концу hero */
  const scrollHintOpacity = useTransform(
    scrollYProgress,
    scrollLinesFromStart ? [0.72, 0.9] : [0.62, 0.82],
    [1, 0],
  );
  const opacities = [line0, line1, line2];

  useEffect(() => {
    if (!heroImageLoader) return;

    if (introWasPlayed && isHeroImageLoaded(heroImage)) {
      setHeroImageLoaded(true);
      setHeroLoaderDismissed(true);
      setCompassMinReady(true);
      return;
    }

    const img = imgRef.current;
    if (img?.complete && img.naturalHeight > 0) {
      setHeroImageLoaded(true);
      markHeroImageLoaded(heroImage);
    }
  }, [heroImage, heroImageLoader, introWasPlayed]);

  useEffect(() => {
    if (!heroImageLoader || heroLoaderDismissed) return;
    const t = window.setTimeout(() => setCompassMinReady(true), HERO_COMPASS_MIN_MS);
    return () => window.clearTimeout(t);
  }, [heroImageLoader, heroLoaderDismissed]);

  useEffect(() => {
    if (!heroImageLoader || !heroImageLoaded || heroLoaderDismissed) return;
    if (reducedMotion) setHeroLoaderDismissed(true);
  }, [heroImageLoader, heroImageLoaded, heroLoaderDismissed, reducedMotion]);

  useEffect(() => {
    if (!heroEnter || !heroLoaderDismissed) return;
    if (!isMobile) setKenBurns(true);
    if (scrollLinesFromStart) {
      setShowScrollLines(true);
      return;
    }
    const t = window.setTimeout(() => setShowScrollLines(true), 2200);
    return () => window.clearTimeout(t);
  }, [heroEnter, heroLoaderDismissed, scrollLinesFromStart, isMobile]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (heroEnter && heroLoaderDismissed && v > 0.04) setShowScrollLines(true);
  });

  const heroBottomVisible = heroEnter && heroLoaderDismissed;
  const heroBottomClassName =
    sectionId === "v5-hero"
      ? "relative z-10 flex h-full flex-col justify-end pb-12 tablet:pb-12"
      : "relative z-10 flex h-full flex-col justify-end pb-8 tablet:pb-10";

  const heroBottomInner = (
    <div className="container-luxury v2-hero-bottom w-full text-center">
      <div className="v2-hero-lines relative min-h-[clamp(5rem,18vw,11rem)] w-full">
        {useMobileStaticHero && heroBottomVisible && (
          <h1 className="v2-hero-line relative text-balance">{heroMobileOffer}</h1>
        )}

        {!useMobileStaticHero &&
          !isMobile &&
          heroBottomVisible &&
          !scrollLinesFromStart &&
          !showScrollLines && (
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

        {!useMobileStaticHero &&
          showScrollLines &&
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
        style={{ opacity: useMobileStaticHero ? 1 : scrollHintOpacity }}
      >
        Листайте вниз
      </motion.p>

      <motion.div
        className="mt-4 flex justify-center tablet:mt-5"
        style={{ opacity: useMobileStaticHero ? 1 : scrollHintOpacity }}
        aria-hidden
      >
        <span className="v2-scroll-marker" aria-hidden>
          <span className="v2-scroll-marker__line" />
        </span>
      </motion.div>
    </div>
  );

  return (
    <section
      id={sectionId}
      ref={ref}
      className="relative"
      style={{ height: useMobileStaticHero ? "100svh" : heroScrollHeight }}
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
              ref={imgRef}
              src={heroImage}
              alt="Яхта в Средиземном море"
              fill
              priority
              sizes="100vw"
              quality={82}
              className="object-cover object-center"
              onLoadingComplete={() => {
                markHeroImageLoaded(heroImage);
                setHeroImageLoaded(true);
              }}
            />
            {heroEndFlicker && !isMobile && (
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
        {lightRays && heroLoaderDismissed && !reducedMotion && !isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[4]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: luxuryEase }}
          >
            <LightRays
              className="v2-hero-light-rays"
              raysOrigin="top-center"
              raysColor={lightRaysColor}
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
              intensity={1.28}
            />
          </motion.div>
        )}
        <div className="v2-hero-overlay absolute inset-0 z-[3]" aria-hidden />
        {sectionId === "v5-hero" && (
          <div className="v2-hero-top-fade absolute inset-0 z-[3]" aria-hidden />
        )}

        {heroCompassCenter && (
          <HeroCompassCoords className="v2-hero-coords--below-compass" />
        )}

        {heroImageLoader && heroCompassCenter && (
          <CompassLoaderOverlay
            variant="absolute"
            className={heroCompassCenter ? "v5-hero-compass-loader" : undefined}
            backgroundColor="transparent"
            revealHeroOnExit={!heroCompassCenter}
            persistOnComplete={heroCompassCenter}
            showProgress={false}
            complete={heroImageLoaded && compassMinReady}
            onReady={() => {
              setHeroLoaderDismissed(true);
              signalHeroEnter();
              onHeroLoaderDismissed?.();
            }}
            onDismissed={() => {
              setHeroLoaderDismissed(true);
              signalHeroEnter();
              onHeroLoaderDismissed?.();
            }}
          />
        )}

        {isMobile ? (
          <div
            className={heroBottomClassName}
            style={{ opacity: heroBottomVisible ? 1 : 0 }}
          >
            {heroBottomInner}
          </div>
        ) : (
          <motion.div
            className={heroBottomClassName}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroBottomVisible ? 1 : 0 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
          >
            {heroBottomInner}
          </motion.div>
        )}
      </div>
    </section>
  );
}
