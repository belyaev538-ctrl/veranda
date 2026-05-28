"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TRUST_BAR_ITEMS } from "@/lib/constants";
import { luxuryEase } from "@/lib/motion";

export function TrustBar() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative z-20 border-y border-border/80 bg-white/85 backdrop-blur-sm">
      <motion.div
        className="container-luxury overflow-hidden py-[22px]"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: luxuryEase }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3 desktop:flex-nowrap desktop:justify-between">
          {TRUST_BAR_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center">
              <motion.span
                className="px-4 text-center font-sans text-[11px] font-medium leading-snug text-ink/75 tablet:px-6 tablet:text-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i + 0.2, duration: 0.9, ease: luxuryEase }}
              >
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
