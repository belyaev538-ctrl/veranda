"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { v4LineReveal, v4Stagger, viewportOnceDeep } from "@/lib/motion";
import { cn } from "@/lib/cn";

type V4FullscreenChapterProps = {
  id: string;
  image: string;
  lines: readonly string[];
  subtitle: string;
  align?: "center" | "bottom";
};

export function V4FullscreenChapter({
  id,
  image,
  lines,
  subtitle,
  align = "center",
}: V4FullscreenChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.4, 1, 1, 0.35]);

  const content = (
    <motion.div
      className={align === "center" ? "max-w-2xl" : "container-luxury max-w-2xl pb-6"}
      variants={v4Stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceDeep}
    >
      <h2 className="text-white">
        {lines.map((line, i) => (
          <motion.span
            key={line}
            className="v2-hero-line block"
            variants={v4LineReveal}
          >
            {i === 0 ? (
              <TextShimmer as="span" tone="light" className="inline-block">
                {line}
              </TextShimmer>
            ) : (
              line
            )}
          </motion.span>
        ))}
      </h2>
      <motion.p className="v4-chapter-sub mx-auto mt-6 max-w-lg" variants={v4LineReveal}>
        <TextShimmer tone="light" className="inline">
          {subtitle}
        </TextShimmer>
      </motion.p>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className="v4-fullscreen relative h-svh min-h-[520px] overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={image} alt="" fill priority={false} sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="v4-fullscreen-overlay absolute inset-0" />
      <LightSweep className="v4-fullscreen__sweep" loop />

      <div
        className={cn(
          "relative z-10 flex h-full section-pad",
          align === "center"
            ? "flex-col items-center justify-center px-6 text-center"
            : "items-end",
        )}
      >
        {reduced ? (
          <div className={align === "center" ? "max-w-2xl" : "container-luxury max-w-2xl pb-6"}>
            <h2 className="text-white">
              {lines.map((line) => (
                <span key={line} className="v2-hero-line block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="v4-chapter-sub mx-auto mt-6 max-w-lg">{subtitle}</p>
          </div>
        ) : (
          <motion.div style={{ opacity: contentOpacity }} className="w-full">
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
