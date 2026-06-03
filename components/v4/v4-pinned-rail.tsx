"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { V4Button, V4Label, V4Reveal } from "@/components/v4/v4-ui";

export type V4PinCard = {
  title: string;
  text: string;
  image: string;
  cta?: string;
};

type V4PinnedRailProps = {
  id: string;
  label?: string;
  cards: readonly V4PinCard[];
  variant?: "spaces" | "gallery";
  onCta?: () => void;
};

export function V4PinnedRail({
  id,
  label,
  cards,
  variant = "spaces",
  onCta,
}: V4PinnedRailProps) {
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

  if (!usePin) {
    return (
      <section id={id} className="v4-panel v4-panel--dark section-pad">
        {label && (
          <div className="container-luxury mb-8">
            <V4Reveal>
              <V4Label>{label}</V4Label>
            </V4Reveal>
          </div>
        )}
        <div className="v4-rail flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none snap-x snap-mandatory">
          {cards.map((card) => (
            <V4PinCardView
              key={card.title}
              card={card}
              variant={variant}
              onCta={onCta}
            />
          ))}
        </div>
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
        {label && (
          <div className="container-luxury shrink-0 pt-10 pb-6">
            <V4Label>{label}</V4Label>
          </div>
        )}
        <motion.div
          ref={trackRef}
          className="v4-pin-track flex h-full min-h-0 flex-1 items-center gap-5 px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] pb-10"
          style={{ x }}
        >
          {cards.map((card) => (
            <V4PinCardView
              key={card.title}
              card={card}
              variant={variant}
              onCta={onCta}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function V4PinCardView({
  card,
  variant,
  onCta,
}: {
  card: V4PinCard;
  variant: "spaces" | "gallery";
  onCta?: () => void;
}) {
  return (
    <article
      className={
        variant === "gallery"
          ? "v4-gallery-card group relative shrink-0 overflow-hidden"
          : "v4-space-card group relative shrink-0 overflow-hidden"
      }
    >
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
        <p className="v4-mono v4-pin-card-title">{card.title}</p>
        <p className="mt-2 font-sans text-sm text-white/75">{card.text}</p>
        {card.cta && onCta && (
          <V4Button className="v4-btn--sm mt-5" onClick={onCta}>
            {card.cta}
          </V4Button>
        )}
      </div>
    </article>
  );
}
