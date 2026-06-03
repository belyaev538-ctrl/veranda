"use client";

import Image from "next/image";
import { V5Button } from "@/components/v5/v5-ui";

export type RailCard = {
  num?: string;
  title: string;
  titleRu?: string;
  text: string;
  image: string;
  cta?: string;
};

export function V5HorizontalRail({
  cards,
  onCta,
}: {
  cards: readonly RailCard[];
  onCta?: () => void;
}) {
  return (
    <div className="v4-rail flex gap-4 overflow-x-auto px-[max(1rem,calc((100vw-1280px)/2+1rem))] pb-6 scrollbar-none snap-x snap-mandatory">
      {cards.map((card) => (
        <article key={card.title} className="v4-rail-card group relative shrink-0 snap-start overflow-hidden">
          <Image src={card.image} alt={card.titleRu ?? card.title} fill sizes="(max-width:768px) 78vw, 32vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
          <div className="v4-rail-card-overlay absolute inset-0" />
          {card.num && (
            <span className="v4-mono absolute left-5 top-5 text-white/50">{card.num}</span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 tablet:p-6">
            <p className="v4-mono text-white/55">{card.title}</p>
            {card.titleRu && <p className="mt-1 font-sans text-sm text-white/70">{card.titleRu}</p>}
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/85 opacity-90 transition-opacity group-hover:opacity-100">
              {card.text}
            </p>
            {card.cta && onCta && (
              <V5Button className="v4-btn--sm mt-4" onClick={onCta}>
                {card.cta}
              </V5Button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
