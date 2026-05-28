"use client";

import {
  AnimatePresence,
  motion,
  PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { PlaceholderImage } from "@/components/placeholder-image";
import { useScrollMotion } from "@/components/motion/scroll-provider";
import { GALLERY_PHOTOS } from "@/lib/constants";
import { getImageSrc } from "@/lib/images";
import { clipReveal, luxuryEase, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

const MASONRY_LAYOUT = [
  { photo: 13, className: "tablet:col-span-7 tablet:row-span-2 min-h-[280px]" },
  { photo: 14, className: "tablet:col-span-5 min-h-[200px]" },
  { photo: 15, className: "tablet:col-span-5 min-h-[200px]" },
  { photo: 16, className: "tablet:col-span-6 min-h-[220px]" },
  { photo: 17, className: "tablet:col-span-6 min-h-[220px]" },
  { photo: 18, className: "tablet:col-span-12 min-h-[240px]" },
] as const;

const GRID_DELAYS = [0, 0.22, 0.14, 0.28, 0.18, 0.35];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = useMemo(() => [...GALLERY_PHOTOS], []);
  const { isMobile, reducedMotion } = useScrollMotion();

  const close = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const preload = (idx: number) => {
      const img = new Image();
      img.src = getImageSrc(photos[idx]);
    };
    preload((activeIndex + 1) % photos.length);
    preload((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, photos]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, goNext, goPrev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = isMobile ? 40 : 60;
    const velocity = info.velocity.x;
    if (info.offset.x < -threshold || velocity < -400) goNext();
    else if (info.offset.x > threshold || velocity > 400) goPrev();
  };

  return (
    <>
      <SectionAtmosphere
        id="collections"
        tone="white"
        className="section-pad bg-white"
      >
        <div className="container-luxury">
          <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
            07 — Реализации
          </p>
        <ClipReveal as="h2" className="text-mega mt-4 max-w-3xl" delay={0.1}>
          Фактуры
          <br />
          <span className="text-muted">для жизни на воде</span>
        </ClipReveal>
        <ClipReveal as="p" className="mt-4 max-w-xl font-sans text-base text-muted" delay={0.16}>
          Массив, ткани, металл и мягкие элементы в проектах VERANDARU.
        </ClipReveal>

          <div className="mt-14 grid grid-cols-1 gap-4 tablet:grid-cols-12 tablet:gap-5 desktop:mt-20 desktop:gap-6">
            {MASONRY_LAYOUT.map((item, index) => (
              <motion.button
                key={item.photo}
                type="button"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={clipReveal}
                transition={{
                  delay: GRID_DELAYS[index],
                  duration: 1.1,
                  ease: luxuryEase,
                }}
                className={cn(
                  "block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green",
                  item.className,
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Открыть фото ${item.photo}`}
              >
                <PlaceholderImage
                  photo={item.photo}
                  hoverMode={isMobile ? "none" : "luxury"}
                  className="h-full w-full min-h-[inherit]"
                  quality={82}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </SectionAtmosphere>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051227]/98 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: luxuryEase }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Галерея"
          >
            <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden />

            <button
              type="button"
              className="absolute right-5 top-5 z-[110] font-sans text-sm text-white/60 transition-colors hover:text-white"
              onClick={close}
              aria-label="Закрыть"
            >
              Закрыть
            </button>

            <button
              type="button"
              className="absolute left-4 top-1/2 z-[110] hidden -translate-y-1/2 p-4 text-white/50 transition-colors hover:text-white desktop:block"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Предыдущее"
            >
              ←
            </button>

            <button
              type="button"
              className="absolute right-4 top-1/2 z-[110] hidden -translate-y-1/2 p-4 text-white/50 transition-colors hover:text-white desktop:block"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Следующее"
            >
              →
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="relative w-full max-w-5xl overflow-hidden rounded-luxury"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                drag={isMobile ? "x" : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                dragTransition={{ bounceStiffness: 260, bounceDamping: 32 }}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <PlaceholderImage
                  photo={photos[activeIndex]}
                  sizes="92vw"
                  hoverMode="none"
                  priority
                  quality={90}
                  className="aspect-[4/3] w-full max-h-[82vh]"
                />
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-6 left-0 right-0 text-center font-sans text-xs text-white/45">
              {activeIndex + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
