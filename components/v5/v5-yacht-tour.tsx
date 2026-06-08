"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { V5FullscreenText, V5Label } from "@/components/v5/v5-ui";
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

  const zoneContent = (
    <>
      {zone.subtitleRu ? (
        <V5Label className="v5-type-eyebrow text-white">{zone.subtitleRu}</V5Label>
      ) : (
        index === 0 && (
          <V5Label className="v5-type-eyebrow text-white">{V5_YACHT_TOUR.label}</V5Label>
        )
      )}
      <h2
        className={cn(
          "v5-yacht-tour__title v5-type-yacht-title",
          (zone.subtitleRu || index === 0) && "mt-4",
        )}
      >
        <TextShimmer tone="light">{zone.title}</TextShimmer>
      </h2>
      {isCover && zone.intro ? (
        <p className="v4-chapter-sub v5-narrow-text mt-6">
          <TextShimmer tone="light" className="inline">
            {zone.intro}
          </TextShimmer>
        </p>
      ) : (
        <>
          {zone.description && (
            <p className="v5-yacht-tour__desc v5-narrow-text">{zone.description}</p>
          )}
          {zone.solutions && zone.solutions.length > 0 && (
            <div className="v5-yacht-tour__solutions">
              <p className="v5-yacht-tour__solutions-label">Что можем разместить</p>
              <ul>
                {zone.solutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );

  const textBlock = (
    <motion.div
      className="v5-yacht-tour__copy"
      initial={reduced ? false : { opacity: 0, y: 60 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnceDeep}
      transition={{ duration: 1.1, ease: luxuryEase, delay: 0.12 }}
      style={reduced ? undefined : { y: textY }}
    >
      {zoneContent}
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
      {!isCover && <div className="v5-yacht-tour__visual-shade" aria-hidden />}
      <LightSweep className="v5-yacht-tour__sweep" playOnView />
    </motion.div>
  );

  if (isCover) {
    return (
      <section
        ref={ref}
        id={zone.id}
        className="v5-yacht-tour-screen v5-yacht-tour-screen--cover v4-fullscreen relative h-svh min-h-[520px] overflow-hidden"
      >
        {imageBlock}
        <div className="v4-fullscreen-overlay absolute inset-0" />
        <div className="relative z-10 flex h-full w-full section-pad flex-col items-center justify-center text-center">
          <motion.div
            className="flex w-full flex-col items-center justify-center"
            initial={reduced ? false : { opacity: 0, y: 48 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnceDeep}
            transition={{ duration: 1.1, ease: luxuryEase, delay: 0.12 }}
          >
            <V5FullscreenText innerClassName="flex flex-col items-center text-center">
              {zoneContent}
            </V5FullscreenText>
          </motion.div>
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
