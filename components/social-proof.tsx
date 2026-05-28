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
          VERANDARU
          <br />
          <span className="text-muted">для частных яхт и премиальных outdoor-проектов</span>
        </ClipReveal>
        <ClipReveal as="p" className="text-mega-muted mx-auto mt-6 max-w-2xl" delay={0.22}>
          <p>
            Мы создаём мебель для частных клиентов, террас у воды и сложных
            outdoor-пространств, где важны эстетика, долговечность и точная
            посадка решения в проект.
          </p>
        </ClipReveal>
        <ClipReveal as="p" className="mx-auto mt-8 max-w-lg font-sans text-xs tracking-[0.12em] text-muted" delay={0.3}>
          Опыт VERANDARU в премиальных объектах
        </ClipReveal>
      </div>

      <motion.div
        className="marquee-mask relative mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeIn}
        aria-label="Партнёры и клиенты"
      >
        <div className="flex w-max animate-marquee-slow items-center gap-14 px-8 tablet:gap-20 tablet:px-12">
          {MARQUEE_ITEMS.map((brand, i) => (
            <motion.div
              key={`${brand.name}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: (i % 6) * 0.08 }}
              className="flex h-10 shrink-0 items-center tablet:h-11"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="marquee-logo h-7 w-auto max-w-[min(42vw,200px)] object-contain object-left tablet:h-8"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionAtmosphere>
  );
}
