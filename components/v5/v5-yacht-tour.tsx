"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { V5Label } from "@/components/v5/v5-ui";
import type { V5YachtTourZone } from "@/lib/v5-content";
import { V5_YACHT_TOUR } from "@/lib/v5-content";
import { luxuryEase, viewportOnceDeep } from "@/lib/motion";
import { cn } from "@/lib/cn";

function YachtTourScreen({ zone, index }: { zone: V5YachtTourZone; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isCover = zone.layout === "cover";
  const imageRight = zone.layout === "image-right";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1]);

  const textBlock = (
    <motion.div
      className="v5-yacht-tour__copy"
      initial={reduced ? false : { opacity: 0, y: 60 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnceDeep}
      transition={{ duration: 1.1, ease: luxuryEase, delay: 0.12 }}
      style={reduced ? undefined : { y: isCover ? undefined : textY }}
    >
      {index === 0 && (
        <V5Label className="mb-6 block">{V5_YACHT_TOUR.label}</V5Label>
      )}
      <h2 className="v5-yacht-tour__title">
        <TextShimmer tone="light">{zone.title}</TextShimmer>
      </h2>
      <p className="v5-yacht-tour__subtitle">{zone.subtitleRu}</p>
      <p className="v5-yacht-tour__desc">{zone.description}</p>
      <div className="v5-yacht-tour__solutions">
        <p className="v5-yacht-tour__solutions-label">Что можем разместить</p>
        <ul>
          {zone.solutions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      className={cn(
        "v5-yacht-tour__visual",
        isCover && "v5-yacht-tour__visual--cover",
      )}
      initial={reduced ? false : { scale: 1.08 }}
      whileInView={reduced ? undefined : { scale: 1 }}
      viewport={viewportOnceDeep}
      transition={{ duration: 1.35, ease: luxuryEase }}
      style={reduced ? undefined : { y: imageY, scale: isCover ? imageScale : undefined }}
    >
      <Image
        src={zone.image}
        alt=""
        fill
        sizes={isCover ? "100vw" : "(max-width: 1024px) 100vw, 65vw"}
        className="object-cover"
        priority={index < 2}
      />
      <div className="v5-yacht-tour__visual-shade" aria-hidden />
      <LightSweep className="v5-yacht-tour__sweep" playOnView />
    </motion.div>
  );

  if (isCover) {
    return (
      <section
        ref={ref}
        id={zone.id}
        className="v5-yacht-tour-screen v5-yacht-tour-screen--cover relative min-h-svh overflow-hidden"
      >
        {imageBlock}
        <div className="relative z-10 flex min-h-svh items-end section-pad pb-16 tablet:items-center tablet:pb-20">
          <div className="container-luxury w-full max-w-2xl">{textBlock}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={zone.id}
      className="v5-yacht-tour-screen relative min-h-svh overflow-hidden bg-[#020B1F]"
    >
      <div
        className={cn(
          "v5-yacht-tour__split container-luxury min-h-svh",
          imageRight ? "v5-yacht-tour__split--img-right" : "v5-yacht-tour__split--img-left",
        )}
      >
        {imageRight ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}

export function V5YachtTour() {
  return (
    <div id="v5-areas" className="v5-yacht-tour">
      {V5_YACHT_TOUR.zones.map((zone, index) => (
        <YachtTourScreen key={zone.id} zone={zone} index={index} />
      ))}
    </div>
  );
}
