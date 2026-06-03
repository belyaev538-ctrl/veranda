"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { V3_PILLARS } from "@/lib/v3-content";
import { luxuryEase } from "@/lib/motion";

export function V3Pillars() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - rect.bottom / (rect.height + window.innerHeight);
      const idx = Math.min(
        V3_PILLARS.length - 1,
        Math.max(0, Math.floor(progress * V3_PILLARS.length)),
      );
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pillar = V3_PILLARS[active];

  return (
    <section
      id="v3-pillars"
      ref={sectionRef}
      className="relative bg-[#0d1322] text-white"
      style={{ minHeight: "220vh" }}
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-center section-pad">
        <div className="container-luxury">
          <div className="flex flex-wrap gap-6 border-b border-white/10 pb-8 desktop:gap-12">
            {V3_PILLARS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={`v3-pillar-tab ${i === active ? "v3-pillar-tab--active" : ""}`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 desktop:grid-cols-12 desktop:gap-16">
            <div className="desktop:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: luxuryEase }}
                >
                  <h2 className="v3-pillar-title">{pillar.title}</h2>
                  <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-white/65">
                    {pillar.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden desktop:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: luxuryEase }}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 55vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
