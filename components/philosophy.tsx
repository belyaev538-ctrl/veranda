"use client";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { PHILOSOPHY_FEATURES } from "@/lib/constants";
import { useScrollMotion } from "@/components/motion/scroll-provider";

export function Philosophy() {
  const { cinematic } = useScrollMotion();

  return (
    <SectionAtmosphere
      id="about"
      tone="cream"
      className="section-pad bg-cream"
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 gap-12 desktop:grid-cols-2 desktop:gap-16">
          <div className="flex flex-col justify-center desktop:py-8">
            <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
              01 — Философия
            </p>
            <ClipReveal as="h2" className="text-mega mt-5" delay={0.12}>
              Мы создаём
              <br />
              пространство отдыха
              <br />
              <span className="text-mega-muted-strong">на борту</span>
            </ClipReveal>
            <ClipReveal as="div" className="philosophy-copy mt-8 space-y-4" delay={0.28}>
              <p>
                VERANDARU проектирует мебельные решения для яхтенных
                пространств — от лаунж-зон на палубе до компактных dining- и
                sunbed-композиций.
              </p>
              <p>
                Мы учитываем габариты яхты, сценарии отдыха, устойчивость
                материалов к солнцу, влаге и соли, а также эстетику самого
                судна.
              </p>
            </ClipReveal>

            <ul className="mt-12 space-y-6 border-t border-border pt-10">
              {PHILOSOPHY_FEATURES.map((feature, i) => (
                <ClipReveal
                  key={feature}
                  as="li"
                  delay={0.35 + i * 0.14}
                  duration={1.1}
                  className="flex items-start gap-4 font-sans text-sm leading-relaxed text-ink/85 tablet:text-base"
                >
                  <span className="mt-2.5 h-px w-10 shrink-0 bg-gold/50" />
                  {feature}
                </ClipReveal>
              ))}
            </ul>
          </div>

          <div
            className={
              cinematic
                ? "desktop:sticky desktop:top-28 desktop:self-start"
                : "relative"
            }
          >
            <div className="relative min-h-[420px] overflow-hidden rounded-luxury desktop:min-h-[min(85vh,720px)]">
              <ParallaxMedia
                photo={2}
                className="h-full min-h-[420px] desktop:min-h-[min(85vh,720px)]"
                speed={0.038}
                scaleRange={[1, 1.03]}
                breathe
              />
              {cinematic && (
                <div className="soft-reflection pointer-events-none absolute inset-0 rounded-luxury opacity-30" />
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionAtmosphere>
  );
}
