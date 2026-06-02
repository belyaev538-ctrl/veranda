"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { SOCIAL_PROOF_BRANDS } from "@/lib/brands";
import { fadeIn, viewportOnce } from "@/lib/motion";

const MARQUEE_ITEMS = [...SOCIAL_PROOF_BRANDS, ...SOCIAL_PROOF_BRANDS];

export function SocialProof() {
  return (
    <SectionAtmosphere
      tone="warm"
      className="section-pad overflow-hidden border-y border-border bg-[#F8F6F2]"
    >
      <div className="container-luxury text-center">
        <ClipReveal as="p" delay={0}>
          <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
            06 — Опыт
          </p>
        </ClipReveal>
        <ClipReveal as="h2" className="text-mega mx-auto mt-4 max-w-3xl" delay={0.12}>
          Наши клиенты
        </ClipReveal>
        <ClipReveal as="p" className="text-mega-muted mx-auto mt-6 max-w-2xl" delay={0.22}>
          <p>
            VERANDARU — для частных яхт, террас у воды и премиальных outdoor-проектов,
            где важны эстетика, долговечность и точная посадка решения в пространство.
          </p>
        </ClipReveal>
      </div>

      <motion.div
        className="marquee-mask relative mt-12 tablet:mt-14"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeIn}
        aria-label="Логотипы клиентов"
      >
        <div className="flex w-max animate-marquee-slow items-stretch gap-4 px-4 tablet:gap-5 tablet:px-8">
          {MARQUEE_ITEMS.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="brand-logo-tile"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="brand-logo-tile__img"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </SectionAtmosphere>
  );
}
