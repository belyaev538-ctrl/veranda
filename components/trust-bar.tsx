"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TRUST_BAR_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { luxuryEase, viewportOnce } from "@/lib/motion";

function TrustItemIcon({
  index,
  className = "h-3.5 w-3.5",
  strokeWidth = 1.8,
}: {
  index: number;
  className?: string;
  strokeWidth?: number;
}) {
  const sw = strokeWidth;
  const iconClass = className;
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path d="M4 17V7l8-3 8 3v10l-8 3-8-3Z" stroke="currentColor" strokeWidth={sw} />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth={sw} />
        <path d="M4 10h16" stroke="currentColor" strokeWidth={sw} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M6 18h12M7.5 18l1-7h7l1 7M10 11V8a2 2 0 1 1 4 0v3"
          stroke="currentColor"
          strokeWidth={sw}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
      <path
        d="M7 18h10M8 18l1-9h6l1 9M10 9V7a2 2 0 1 1 4 0v2"
        stroke="currentColor"
        strokeWidth={sw}
      />
      <path d="M5 9h14" stroke="currentColor" strokeWidth={sw} />
    </svg>
  );
}

type TrustBarProps = {
  /** В hero: под кнопками, белый текст на фоне изображения */
  variant?: "default" | "hero";
};

export function TrustBar({ variant = "default" }: TrustBarProps) {
  const reducedMotion = useReducedMotion();
  const onHero = variant === "hero";

  const content = (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-0 gap-y-3",
        onHero
          ? "mt-10 items-center justify-start gap-y-4 tablet:mt-12 desktop:flex-nowrap desktop:justify-between desktop:gap-y-0"
          : "justify-center desktop:flex-nowrap desktop:justify-between",
      )}
    >
      {TRUST_BAR_ITEMS.map((item, i) => (
        <div key={item} className="flex items-center">
          <motion.span
            className={cn(
              "inline-flex items-center gap-2 px-0 text-left font-sans text-[11px] font-medium leading-snug tablet:text-xs",
              onHero
                ? "gap-4 text-white/85 tablet:pr-2"
                : "px-4 text-center text-ink/75 tablet:px-6",
            )}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={onHero ? undefined : { opacity: 1 }}
            animate={onHero ? { opacity: 1 } : undefined}
            viewport={onHero ? undefined : viewportOnce}
            transition={{
              delay: reducedMotion ? 0 : 0.1 * i + (onHero ? 1.15 : 0.15),
              duration: reducedMotion ? 0 : 0.75,
              ease: luxuryEase,
            }}
          >
            {onHero ? (
              <span className="inline-flex shrink-0 items-center text-white/90">
                <TrustItemIcon index={i} className="h-14 w-14" strokeWidth={1} />
              </span>
            ) : (
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/90 text-ink/70">
                <TrustItemIcon index={i} />
              </span>
            )}
            {item}
          </motion.span>
          {i < TRUST_BAR_ITEMS.length - 1 && (
            <span
              className={cn(
                "trust-divider mx-3 hidden h-4 w-px shrink-0 desktop:block",
                onHero ? "bg-white/25" : "bg-gold/50",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (onHero) {
    return (
      <div className="hero-trust-bar" aria-label="Преимущества VERANDARU">
        {content}
      </div>
    );
  }

  return (
    <section className="relative z-20 border-y border-border/80 bg-white/85 backdrop-blur-sm">
      <motion.div
        className="container-luxury py-[22px]"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: reducedMotion ? 0 : 0.85, ease: luxuryEase }}
      >
        {content}
      </motion.div>
    </section>
  );
}
