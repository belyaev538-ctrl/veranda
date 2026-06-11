"use client";

import Image from "next/image";
import { useState } from "react";
import { FounderVideoModal } from "@/components/founder-video-modal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { FOUNDER } from "@/lib/constants";

function PlayIcon() {
  return (
    <svg
      className="h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

export function Founder() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <SectionAtmosphere
      id="founder"
      tone="dark"
      className="production-bg section-pad relative text-white"
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 gap-12 desktop:grid-cols-2 desktop:gap-16 desktop:items-stretch">
          <div className="order-2 flex flex-col justify-center desktop:order-1 desktop:py-4">
            <p className="font-sans text-xs font-medium tracking-[0.2em] text-yacht-gold/90">
              09 — Основатель
            </p>
            <ClipReveal as="h2" className="text-mega-light mt-4 max-w-xl" delay={0.1}>
              <span id="founder-heading">{FOUNDER.name}</span>
            </ClipReveal>
            <ClipReveal
              as="p"
              className="mt-4 font-sans text-sm leading-relaxed text-white/50 tablet:text-base"
              delay={0.16}
            >
              {FOUNDER.eyebrow}
            </ClipReveal>

            <ClipReveal
              as="div"
              className="mt-8 max-w-xl space-y-4 font-sans text-base leading-relaxed text-white/55 tablet:text-lg"
              delay={0.22}
            >
              <p>{FOUNDER.quote}</p>
              {FOUNDER.quoteSecondary && <p>{FOUNDER.quoteSecondary}</p>}
            </ClipReveal>

            <ClipReveal
              as="div"
              className="mt-10 flex flex-col gap-1.5 border-t border-white/10 pt-8 font-sans text-sm tablet:text-base"
              delay={0.28}
            >
              <a
                href={FOUNDER.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 transition-colors hover:text-yacht-gold"
              >
                {FOUNDER.telegram}
              </a>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="text-white/75 transition-colors hover:text-yacht-gold"
              >
                {FOUNDER.email}
              </a>
            </ClipReveal>

            <ClipReveal as="div" className="mt-10" delay={0.34}>
              <button
                type="button"
                className="founder-video-trigger group"
                onClick={() => setVideoOpen(true)}
              >
                <span className="founder-video-thumb">
                  <Image
                    src={FOUNDER.videoPoster}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover object-[center_15%]"
                  />
                  <span className="founder-video-play" aria-hidden>
                    <PlayIcon />
                  </span>
                </span>
                <span className="font-sans text-sm font-medium text-white/85">
                  {FOUNDER.videoCta}
                </span>
              </button>
            </ClipReveal>
          </div>

          <ClipReveal
            as="div"
            delay={0.12}
            duration={1.2}
            className="order-1 relative min-h-[400px] overflow-hidden rounded-luxury desktop:order-2 desktop:min-h-[min(85vh,720px)]"
          >
            <Image
              src="/images/founder-julia.webp"
              alt={FOUNDER.photoAlt}
              fill
              sizes="(max-width: 1200px) 100vw, 50vw"
              quality={90}
              className="object-cover object-[center_12%]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070B]/50 via-transparent to-transparent desktop:bg-gradient-to-l desktop:from-[#05070B]/40 desktop:via-transparent"
              aria-hidden
            />
          </ClipReveal>
        </div>
      </div>

      <FounderVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={FOUNDER.videoUrl}
        poster={FOUNDER.videoPoster}
      />
    </SectionAtmosphere>
  );
}
