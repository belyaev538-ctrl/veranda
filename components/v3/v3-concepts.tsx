"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { V3_CONCEPTS } from "@/lib/v3-content";

export function V3Concepts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-v3-card]");
    if (!card) return;
    const w = card.offsetWidth + 16;
    setIndex(Math.round(el.scrollLeft / w));
  };

  return (
    <section id="v3-concepts" className="bg-[#0d1322] pb-24 pt-8 text-white desktop:pb-32">
      <div className="container-luxury mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="v3-eyebrow">Onboard</p>
          <h2 className="v3-heading-light mt-4">Зоны на палубе</h2>
        </div>
        <p className="v3-mono hidden text-sm text-white/40 desktop:block">
          — {index + 1} / {V3_CONCEPTS.length}
        </p>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="v3-concepts-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-1280px)/2+1rem))] pb-4 scrollbar-none"
      >
        {V3_CONCEPTS.map((item, i) => (
          <article
            key={item.title}
            data-v3-card
            className="v3-concept-card relative shrink-0 snap-start overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 85vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322]/80 via-transparent to-transparent" />
            <span className="v3-mono absolute left-6 top-6 text-sm text-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="v3-concept-title absolute bottom-8 left-6">{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
