"use client";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { PlaceholderImage } from "@/components/placeholder-image";
import { MATERIALS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const LAYOUT = [
  "tablet:col-span-2 desktop:col-span-7 desktop:row-span-2",
  "tablet:col-span-2 desktop:col-span-5 desktop:row-span-2",
  "desktop:col-span-4",
  "desktop:col-span-4",
  "desktop:col-span-12 desktop:min-h-[200px]",
] as const;

const REVEAL_DELAYS = [0, 0.18, 0.32, 0.12, 0.26];

export function Materials() {
  return (
    <SectionAtmosphere
      id="materials"
      tone="white"
      className="section-pad bg-white"
    >
      <div className="container-luxury">
        <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
          04 — Материалы
        </p>
        <ClipReveal as="h2" className="text-mega mt-4 max-w-3xl" delay={0.1}>
          Материалы,
          <br />
          <span className="text-muted">которые выдерживают жизнь у воды</span>
        </ClipReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:mt-20 desktop:grid-cols-12 desktop:gap-5">
          {MATERIALS.map((material, i) => (
            <ClipReveal
              key={material.title}
              as="article"
              delay={REVEAL_DELAYS[i]}
              duration={1.15}
              className={cn("group", LAYOUT[i])}
            >
              <div
                className={cn(
                  "material-tactile relative overflow-hidden rounded-luxury bg-[#E8E4DE]",
                  i < 2
                    ? "aspect-[4/5] desktop:min-h-[420px]"
                    : i === 4
                      ? "aspect-[21/9] desktop:aspect-[3/1]"
                      : "aspect-[4/3]",
                )}
              >
                <PlaceholderImage
                  photo={material.photo}
                  hoverMode="luxury"
                  className="h-full"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={85}
                />
              </div>
              <div className="pt-5 desktop:pt-6">
                <h3 className="material-title">{material.title}</h3>
                <p className="mt-3 max-w-sm font-sans text-[15px] leading-[1.75] text-muted">
                  {material.description}
                </p>
              </div>
            </ClipReveal>
          ))}
        </div>
      </div>
    </SectionAtmosphere>
  );
}
