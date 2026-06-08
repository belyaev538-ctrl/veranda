"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { v4LineReveal, v4Stagger, viewportOnceDeep } from "@/lib/motion";
import { V5FullscreenText } from "@/components/v5/v5-ui";
import { cn } from "@/lib/cn";

type V5FullscreenChapterProps = {
  id: string;
  image: string;
  label: string;
  lines: readonly string[];
  subtitle: string;
  align?: "center" | "bottom";
  stackIndex?: number;
  overlap?: boolean;
  runway?: boolean;
};

function V5ChapterTitleContent({ lines }: { lines: readonly string[] }) {
  return (
    <span className="v5-chapter-title__lines">
      {lines.map((line, i) => (
        <Fragment key={`${line}-${i}`}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </span>
  );
}

type V5FullscreenStatementProps = {
  id: string;
  image: string;
  label: string;
  titleLines: readonly string[];
  subtitle: string;
};

function V5ScrollCoverShell({
  id,
  image,
  imagePriority = false,
  align = "center",
  stackZIndex = 5,
  overlap = false,
  runway = true,
  fadeText = true,
  children,
}: {
  id: string;
  image: string;
  imagePriority?: boolean;
  align?: "center" | "top" | "bottom";
  stackZIndex?: number;
  overlap?: boolean;
  runway?: boolean;
  fadeText?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [useScrollCover, setUseScrollCover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setUseScrollCover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollCoverOn = useScrollCover && runway;
  const overlapOn = useScrollCover && overlap;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -56]);

  const contentWrap = (content: ReactNode) => (
    <div
      className={cn(
        "relative z-10 flex h-full w-full section-pad",
        align === "center" &&
          "flex-col items-center justify-center text-center",
        align === "top" &&
          "v4-fullscreen__content--top flex-col items-center justify-start pb-16 text-center",
        align === "bottom" && "items-end",
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col items-center",
          align === "top" ? "justify-start" : "justify-center",
        )}
      >
        {content}
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "v4-fullscreen v5-scroll-cover relative overflow-hidden bg-[#020B1F]",
        scrollCoverOn && "v5-scroll-cover-pin",
        scrollCoverOn ? "h-[200vh] min-h-[1040px]" : "h-svh min-h-[520px]",
        overlapOn && "-mt-[100svh]",
      )}
      style={{ zIndex: stackZIndex }}
    >
      <div className="sticky top-0 h-svh min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority={imagePriority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="v4-fullscreen-overlay absolute inset-0 z-[1]" />
        <LightSweep className="v4-fullscreen__sweep z-[2]" loop />

        {reduced || !fadeText || !scrollCoverOn ? (
          contentWrap(children)
        ) : (
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="h-full w-full"
          >
            {contentWrap(children)}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function V5FullscreenChapter({
  id,
  image,
  label,
  lines,
  subtitle,
  align = "center",
  stackIndex = 0,
  overlap = true,
  runway = true,
}: V5FullscreenChapterProps) {
  const reduced = useReducedMotion();
  const wrapShell = (child: ReactNode) => (
    <V5FullscreenText innerClassName="flex flex-col items-center">{child}</V5FullscreenText>
  );

  const titleContent = <V5ChapterTitleContent lines={lines} />;

  const body = (
    <>
      <motion.p
        className="v4-label v5-type-eyebrow text-white"
        variants={reduced ? undefined : v4LineReveal}
      >
        {label}
      </motion.p>
      <motion.h2
        className="v5-chapter-title v5-type-display-xl mt-4 w-full text-center text-white"
        variants={reduced ? undefined : v4LineReveal}
      >
        {!reduced ? (
          <TextShimmer as="span" tone="light" className="block w-full">
            {titleContent}
          </TextShimmer>
        ) : (
          <span className="block w-full">{titleContent}</span>
        )}
      </motion.h2>
      <motion.p
        className="v4-chapter-sub v5-narrow-text mt-6"
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

  const content = reduced ? (
    wrapShell(body)
  ) : (
    <motion.div
      variants={v4Stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceDeep}
    >
      {wrapShell(body)}
    </motion.div>
  );

  return (
    <V5ScrollCoverShell
      id={id}
      image={image}
      align={align}
      stackZIndex={10 + stackIndex}
      overlap={overlap}
      runway={runway}
    >
      {content}
    </V5ScrollCoverShell>
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
  const wrapShell = (child: ReactNode) => (
    <V5FullscreenText innerClassName="flex flex-col items-center">{child}</V5FullscreenText>
  );

  const titleContent = <V5ChapterTitleContent lines={titleLines} />;

  const body = (
    <>
      <motion.p
        className="v4-label v5-type-eyebrow text-white"
        variants={reduced ? undefined : v4LineReveal}
      >
        {label}
      </motion.p>
      <motion.h2
        className="v5-statement-title v5-type-display-xl mt-6 w-full text-center text-white"
        variants={reduced ? undefined : v4LineReveal}
      >
        {!reduced ? (
          <TextShimmer as="span" tone="light" className="block w-full">
            {titleContent}
          </TextShimmer>
        ) : (
          <span className="block w-full">{titleContent}</span>
        )}
      </motion.h2>
      <motion.p
        className="v4-chapter-sub v5-narrow-text mt-6"
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

  const content = reduced ? (
    wrapShell(body)
  ) : (
    <motion.div
      variants={v4Stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceDeep}
    >
      {wrapShell(body)}
    </motion.div>
  );

  return (
    <V5ScrollCoverShell
      id={id}
      image={image}
      imagePriority
      stackZIndex={1}
      overlap={false}
      runway
    >
      {content}
    </V5ScrollCoverShell>
  );
}
