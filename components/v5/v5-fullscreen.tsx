"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { v4LineReveal, v4Stagger, viewportOnceDeep } from "@/lib/motion";
import { cn } from "@/lib/cn";

type V5FullscreenChapterProps = {
  id: string;
  image: string;
  lines: readonly string[];
  subtitle: string;
  align?: "center" | "bottom";
};

type StatementTitleLine = string | readonly string[];

function statementLineParts(line: StatementTitleLine): readonly string[] {
  return typeof line === "string" ? [line] : line;
}

function statementLineKey(line: StatementTitleLine): string {
  return statementLineParts(line).join("|");
}

type V5FullscreenStatementProps = {
  id: string;
  image: string;
  label: string;
  titleLines: readonly StatementTitleLine[];
  subtitle: string;
};

function V5FullscreenShell({
  id,
  image,
  imagePriority = false,
  align = "center",
  children,
}: {
  id: string;
  image: string;
  imagePriority?: boolean;
  align?: "center" | "top" | "bottom";
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.4, 1, 1, 0.35]);

  return (
    <section
      ref={ref}
      id={id}
      className="v4-fullscreen relative h-svh min-h-[520px] overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={image}
          alt=""
          fill
          priority={imagePriority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="v4-fullscreen-overlay absolute inset-0" />
      <LightSweep className="v4-fullscreen__sweep" loop />

      <div
        className={cn(
          "relative z-10 flex h-full w-full section-pad",
          align === "center" &&
            "flex-col items-center justify-center px-6 text-center",
          align === "top" &&
            "v4-fullscreen__content--top flex-col items-center justify-start px-6 pb-16 text-center",
          align === "bottom" && "items-end",
        )}
      >
        {reduced ? (
          <div
            className={cn(
              "flex w-full flex-col items-center",
              align === "top" ? "justify-start" : "justify-center",
            )}
          >
            {children}
          </div>
        ) : (
          <motion.div
            style={{ opacity: contentOpacity }}
            className={cn(
              "flex w-full flex-col items-center",
              align === "top" ? "justify-start" : "justify-center",
            )}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function V5FullscreenChapter({
  id,
  image,
  lines,
  subtitle,
  align = "center",
}: V5FullscreenChapterProps) {
  const reduced = useReducedMotion();
  const wrapClass =
    align === "center"
      ? "mx-auto flex w-full max-w-2xl flex-col items-center text-center"
      : "container-luxury w-full max-w-2xl pb-6";

  const body = (
    <>
      <h2 className="w-full text-center text-white">
        {lines.map((line, i) => (
          <motion.span
            key={line}
            className="v2-hero-line block"
            variants={reduced ? undefined : v4LineReveal}
          >
            {i === 0 && !reduced ? (
              <TextShimmer as="span" tone="light" className="inline-block">
                {line}
              </TextShimmer>
            ) : (
              line
            )}
          </motion.span>
        ))}
      </h2>
      <motion.p
        className="v4-chapter-sub mx-auto mt-6 max-w-lg"
        variants={reduced ? undefined : v4LineReveal}
      >
        {reduced ? (
          subtitle
        ) : (
          <TextShimmer tone="light" className="inline">
            {subtitle}
          </TextShimmer>
        )}
      </motion.p>
    </>
  );

  return (
    <V5FullscreenShell id={id} image={image} align={align}>
      {reduced ? (
        <div className={wrapClass}>{body}</div>
      ) : (
        <motion.div
          className={wrapClass}
          variants={v4Stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceDeep}
        >
          {body}
        </motion.div>
      )}
    </V5FullscreenShell>
  );
}

export function V5FullscreenStatement({
  id,
  image,
  label,
  titleLines,
  subtitle,
}: V5FullscreenStatementProps) {
  const reduced = useReducedMotion();
  const wrapClass =
    "mx-auto flex w-full max-w-3xl flex-col items-center text-center";

  const body = (
    <>
      <motion.p
        className="v4-label text-white"
        variants={reduced ? undefined : v4LineReveal}
      >
        {label}
      </motion.p>
      <h2 className="mt-6 w-full text-center text-white">
        {titleLines.map((line, i) => {
          const parts = statementLineParts(line);
          const rows = parts.map((row) => (
            <span key={row} className="block">
              {row}
            </span>
          ));

          return (
            <motion.span
              key={statementLineKey(line)}
              className="v2-hero-line v2-hero-line--stack block"
              variants={reduced ? undefined : v4LineReveal}
            >
              {i === 0 && !reduced ? (
                <TextShimmer as="span" tone="light" className="inline-block">
                  {rows}
                </TextShimmer>
              ) : (
                rows
              )}
            </motion.span>
          );
        })}
      </h2>
      <motion.p
        className="v4-chapter-sub mx-auto mt-6 max-w-lg"
        variants={reduced ? undefined : v4LineReveal}
      >
        {reduced ? (
          subtitle
        ) : (
          <TextShimmer tone="light" className="inline">
            {subtitle}
          </TextShimmer>
        )}
      </motion.p>
    </>
  );

  return (
    <V5FullscreenShell id={id} image={image} imagePriority align="top">
      {reduced ? (
        <div className={wrapClass}>{body}</div>
      ) : (
        <motion.div
          className={wrapClass}
          variants={v4Stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceDeep}
        >
          {body}
        </motion.div>
      )}
    </V5FullscreenShell>
  );
}
