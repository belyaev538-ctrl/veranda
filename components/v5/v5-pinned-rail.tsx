"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { V5Button, V5Label, V5Reveal, V5SectionTitle } from "@/components/v5/v5-ui";

export type V5PinCard = {
  title: string;
  text: string;
  image: string;
  cta?: string;
  /** Крупный номер этапа (блок production) */
  num?: string;
};

type V5PinnedRailProps = {
  id: string;
  /** Лейбл над заголовком секции (как CUSTOM PROJECTS) */
  eyebrow?: string;
  label?: string;
  labelSubtitle?: string;
  headerTitle?: string | readonly string[];
  headerSubtitle?: string | readonly string[];
  cards: readonly V5PinCard[];
  variant?: "spaces" | "gallery" | "production";
  onCta?: () => void;
  ctaLabel?: string;
};

export function V5PinnedRail({
  id,
  eyebrow,
  label,
  labelSubtitle,
  headerTitle,
  headerSubtitle,
  cards,
  variant = "spaces",
  onCta,
  ctaLabel,
}: V5PinnedRailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [usePin, setUsePin] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setUsePin(mq.matches);
      if (!trackRef.current) return;
      const overflow = trackRef.current.scrollWidth - window.innerWidth;
      setMaxX(Math.max(0, overflow));
    };
    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [cards]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  const scrollHeight = usePin
    ? `${Math.max(cards.length * 85, 220)}vh`
    : "auto";

  const headerTitleLines =
    typeof headerTitle === "string"
      ? [headerTitle]
      : headerTitle
        ? [...headerTitle]
        : [];

  const headerBlock =
    headerTitleLines.length > 0 || headerSubtitle ? (
      <>
        {headerTitleLines.length > 0 && (
          <h2 className="v5-production-header v5-type-display-lg font-sans text-white">
            {headerTitleLines.length === 1
              ? headerTitleLines[0]
              : headerTitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
          </h2>
        )}
        {headerSubtitle && (
          <p className="v4-body-light mx-auto mt-4 max-w-md">
            {typeof headerSubtitle === "string" ? (
              headerSubtitle
            ) : (
              headerSubtitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            )}
          </p>
        )}
      </>
    ) : null;

  const labelBlock = label ? (
    <V5Reveal>
      <div className="flex flex-col items-center text-center">
        {eyebrow && (
          <V5Label className="v5-type-eyebrow text-white">{eyebrow}</V5Label>
        )}
        <V5SectionTitle className={eyebrow ? "mt-4 text-center" : "text-center"}>
          {label}
        </V5SectionTitle>
        {labelSubtitle && (
          <p className="v4-body-light mx-auto mt-4 max-w-lg">{labelSubtitle}</p>
        )}
      </div>
    </V5Reveal>
  ) : null;

  if (!usePin) {
    return (
      <section id={id} className="v4-panel v4-panel--dark section-pad">
        {headerBlock && (
          <div className="container-luxury mb-8 pt-[80px] pb-[80px] text-center">
            {headerBlock}
          </div>
        )}
        {labelBlock && (
          <div className="container-luxury mb-8">{labelBlock}</div>
        )}
        <div className="v4-rail v5-content-edge flex gap-4 overflow-x-auto pb-4 pr-5 scrollbar-none snap-x snap-mandatory">
          {cards.map((card) => (
            <V5PinCardView
              key={card.title}
              card={card}
              variant={variant}
              onCta={onCta}
            />
          ))}
        </div>
        {ctaLabel && onCta && (
          <div className="container-luxury mt-10 pt-[25px] pb-[25px] text-center">
            <V5Button onClick={onCta}>{ctaLabel}</V5Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={id}
      className="v4-pin-section v4-panel--dark"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {headerBlock && (
          <div className="v5-production-intro container-luxury shrink-0 pt-16 pb-10 text-center desktop:pt-[120px] desktop:pb-[96px]">
            {headerBlock}
          </div>
        )}
        {labelBlock && headerTitleLines.length === 0 && (
          <div className="container-luxury shrink-0 pt-10 pb-6">{labelBlock}</div>
        )}
        <motion.div
          ref={trackRef}
          className={
            variant === "production"
              ? "v4-pin-track v4-pin-track--production v5-content-edge flex h-full min-h-0 flex-1 items-end gap-5 pb-6 pr-5"
              : "v4-pin-track v5-content-edge flex h-full min-h-0 flex-1 items-center gap-5 pb-6 pr-5"
          }
          style={{ x }}
        >
          {cards.map((card) => (
            <V5PinCardView
              key={card.title}
              card={card}
              variant={variant}
              onCta={onCta}
            />
          ))}
        </motion.div>
        {ctaLabel && onCta && (
          <div className="container-luxury shrink-0 pt-[25px] pb-[57px] text-center">
            <V5Button onClick={onCta}>{ctaLabel}</V5Button>
          </div>
        )}
      </div>
    </section>
  );
}

function V5PinCardView({
  card,
  variant,
  onCta,
}: {
  card: V5PinCard;
  variant: "spaces" | "gallery" | "production";
  onCta?: () => void;
}) {
  const cardClass =
    variant === "gallery"
      ? "v4-gallery-card group relative shrink-0 overflow-hidden"
      : variant === "production"
        ? "v4-space-card v4-space-card--production group relative shrink-0 overflow-hidden"
        : "v4-space-card group relative shrink-0 overflow-hidden";

  return (
    <article className={cardClass}>
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width:1024px) 78vw, 32vw"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
      />
      <div className="v4-pin-card-overlay absolute inset-0" />
      <LightSweep className="v4-pin-card-sweep" playOnView />
      <div className="absolute bottom-0 left-0 right-0 p-6 tablet:p-8">
        {variant === "production" && card.num ? (
          <>
            <p className="v4-production-card__num" aria-hidden>
              {card.num}
            </p>
            <p className="v4-production-card__title mt-3 text-white">
              {card.title}
            </p>
            <p className="v4-production-card__text mt-3">{card.text}</p>
          </>
        ) : (
          <>
            <p className="v4-pin-card-title text-white">{card.title}</p>
            <p className="v4-pin-card-desc mt-2 text-white/75">{card.text}</p>
          </>
        )}
        {card.cta && onCta && (
          <V5Button className="v4-btn--sm mt-5" onClick={onCta}>
            {card.cta}
          </V5Button>
        )}
      </div>
    </article>
  );
}
