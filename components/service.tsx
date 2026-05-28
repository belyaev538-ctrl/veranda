"use client";

import { motion } from "framer-motion";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { SERVICE_CARDS } from "@/lib/constants";
import { clipReveal, staggerLuxury, viewportOnce } from "@/lib/motion";

export function Service() {
  return (
    <SectionAtmosphere tone="cream" className="section-pad bg-cream">
      <div className="container-luxury">
        <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
          05 — Сервис
        </p>
        <ClipReveal as="h2" className="text-mega mt-4 max-w-3xl" delay={0.1}>
          От идеи
          <br />
          <span className="text-muted">до установки на борту</span>
        </ClipReveal>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:mt-20 desktop:grid-cols-3 desktop:gap-5"
          variants={staggerLuxury}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {SERVICE_CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={clipReveal}
              className="service-card-matte group p-6 tablet:p-8"
            >
              <span className="inline-block h-px w-8 bg-gold/70 transition-all duration-1000 ease-out group-hover:w-14" />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {card.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionAtmosphere>
  );
}
