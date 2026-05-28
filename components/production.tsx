"use client";

import { motion } from "framer-motion";
import { CinematicLoopMedia } from "@/components/cinematic-loop-media";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { PRODUCTION_CARDS } from "@/lib/constants";
import { clipReveal, staggerLuxury, viewportOnce } from "@/lib/motion";

export function Production() {
  return (
    <SectionAtmosphere
      id="production"
      tone="dark"
      className="production-bg section-pad relative overflow-hidden text-white"
    >
      <div className="container-luxury relative">
        <p className="font-sans text-xs font-medium tracking-[0.2em] text-yacht-gold/90">
          02 — Производство
        </p>
        <ClipReveal as="h2" className="text-mega-light mt-4 max-w-3xl" delay={0.1}>
          Собственное производство
          <br />
          под задачи яхтенных проектов
        </ClipReveal>
        <ClipReveal as="p" className="mt-8 max-w-2xl" delay={0.2}>
          <p className="font-sans text-base leading-relaxed text-white/55 tablet:text-lg">
            Мы производим мебель в России и можем адаптировать изделия под
            габариты палубы, стиль яхты, условия эксплуатации и требования к
            материалам.
          </p>
        </ClipReveal>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:mt-20"
          variants={staggerLuxury}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PRODUCTION_CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={clipReveal}
              className="production-card-luxury group"
            >
              <div className="production-card-media">
                <CinematicLoopMedia
                  photo={card.photo}
                  videoSrc={card.video}
                  macro
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent" />
                <div className="production-light-sweep" aria-hidden />
              </div>
              <div className="production-card-body">
                <h3 className="font-display text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/52">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionAtmosphere>
  );
}
