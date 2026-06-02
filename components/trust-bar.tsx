"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TRUST_BAR_ITEMS } from "@/lib/constants";
import { luxuryEase, viewportOnce } from "@/lib/motion";

function TrustItemIcon({ index }: { index: number }) {
  const iconClass = "h-3.5 w-3.5";
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path d="M4 17V7l8-3 8 3v10l-8 3-8-3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path d="M6 18h12M7.5 18l1-7h7l1 7M10 11V8a2 2 0 1 1 4 0v3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
      <path d="M7 18h10M8 18l1-9h6l1 9M10 9V7a2 2 0 1 1 4 0v2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 9h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function TrustBar() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative z-20 border-y border-border/80 bg-white/85 backdrop-blur-sm">
      <motion.div
        className="container-luxury py-[22px]"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: reducedMotion ? 0 : 0.85, ease: luxuryEase }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3 desktop:flex-nowrap desktop:justify-between">
          {TRUST_BAR_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center">
              <motion.span
                className="inline-flex items-center gap-2 px-4 text-center font-sans text-[11px] font-medium leading-snug text-ink/75 tablet:px-6 tablet:text-xs"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{
                  delay: reducedMotion ? 0 : 0.1 * i + 0.15,
                  duration: reducedMotion ? 0 : 0.75,
                  ease: luxuryEase,
                }}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink/15 bg-white/90 text-ink/70">
                  <TrustItemIcon index={i} />
                </span>
                {item}
              </motion.span>
              {i < TRUST_BAR_ITEMS.length - 1 && (
                <span className="trust-divider hidden h-4 w-px shrink-0 bg-gold/50 desktop:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
