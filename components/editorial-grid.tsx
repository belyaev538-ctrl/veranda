"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { PROJECTS } from "@/lib/constants";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

const CARD_WIDTHS = [
  "w-[min(88vw,520px)] tablet:w-[46vw] tablet:max-w-[560px]",
  "w-[min(78vw,380px)] tablet:w-[28vw] tablet:max-w-[400px]",
  "w-[min(82vw,440px)] tablet:w-[38vw] tablet:max-w-[480px]",
  "w-[min(78vw,400px)] tablet:w-[32vw] tablet:max-w-[420px]",
];

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditorialGrid() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const gap = 24;
    const step = (card?.offsetWidth ?? el.clientWidth * 0.45) + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = stripRef.current;
    if (!el) return;
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateScrollState]);

  return (
    <SectionAtmosphere
      id="projects"
      tone="cream"
      className="section-pad relative overflow-visible bg-cream"
    >
      <div className="container-luxury mb-8 desktop:mb-10">
        <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
          03 — Яхтенные проекты
        </p>
        <ClipReveal as="h2" className="text-mega mt-4 max-w-3xl" delay={0.08}>
          Яхтенные зоны,
          <br />
          <span className="text-muted">а не просто мебель</span>
        </ClipReveal>

        <div className="mt-6 flex flex-col gap-4 tablet:mt-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6">
          <ClipReveal
            as="p"
            className="max-w-xl font-sans text-base leading-snug text-muted"
            delay={0.14}
          >
            Решения для разных сценариев отдыха на борту.
          </ClipReveal>

          <div className="flex shrink-0 items-center gap-3 self-start tablet:self-auto">
            <p className="hidden font-sans text-sm leading-none text-muted tablet:block">
              4 зоны на борту — листайте вправо
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Предыдущий проект"
                disabled={!canScrollLeft}
                onClick={() => scrollByCard(-1)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-all duration-premium",
                  canScrollLeft
                    ? "hover:border-ink/20 hover:shadow-soft"
                    : "cursor-not-allowed opacity-35",
                )}
              >
                <ChevronIcon className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Следующий проект"
                disabled={!canScrollRight}
                onClick={() => scrollByCard(1)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-all duration-premium",
                  canScrollRight
                    ? "hover:border-ink/20 hover:shadow-soft"
                    : "cursor-not-allowed opacity-35",
                )}
              >
                <ChevronIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-visible">
        <div className="strip-fade-cream-left pointer-events-none absolute inset-y-2 left-0 z-10 w-14 tablet:inset-y-3 tablet:w-24" />
        <div className="strip-fade-cream-right pointer-events-none absolute inset-y-2 right-0 z-10 w-14 tablet:inset-y-3 tablet:w-24" />

        <div
          ref={stripRef}
          onScroll={updateScrollState}
          className="projects-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth pl-5 pr-[12vw] scrollbar-hide tablet:gap-4 tablet:pl-8 tablet:pr-[10vw] desktop:gap-5 desktop:pl-12 desktop:pr-[8vw]"
        >
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              data-project-card
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: luxuryEase,
              }}
              className={cn("shrink-0 snap-start snap-always", CARD_WIDTHS[i])}
            >
              <div className="project-card-shell h-full">
              <div className="project-card-cinematic group relative aspect-[4/5] w-full overflow-hidden rounded-luxury bg-navy-deep">
                <div className="project-media project-media-inner absolute inset-0">
                  <PlaceholderImage
                    photo={project.photo}
                    hoverMode="none"
                    rounded={false}
                    sizes="(max-width: 768px) 88vw, 52vw"
                    quality={85}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="project-card-gradient pointer-events-none absolute inset-0 z-[1]" />
                <div className="absolute inset-x-0 bottom-0 z-[2] p-6 transition-transform duration-[1.1s] ease-out group-hover:-translate-y-1.5 tablet:p-8">
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-yacht-gold">
                    {project.type}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white transition-transform duration-700 group-hover:-translate-y-0.5 tablet:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-white/55">
                    {project.location}
                  </p>
                  <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/80">
                    {project.description}
                  </p>
                </div>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <p className="container-luxury mt-6 font-sans text-xs text-muted tablet:hidden">
        Свайпните влево, чтобы увидеть остальные проекты →
      </p>
    </SectionAtmosphere>
  );
}
