"use client";

import { ImageSkeleton } from "@/components/shared/image-skeleton";
import { LoadingImage } from "@/components/shared/loading-image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LightSweep } from "@/components/motion/light-sweep";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { v4LineReveal, v4Stagger, viewportOnceDeep } from "@/lib/motion";
import { V5FullscreenText } from "@/components/v5/v5-ui";
import { useV5ScrollCover } from "@/components/v5/use-v5-scroll-cover";
import {
  V5_SCROLL_COVER_EXIT,
  V5_SCROLL_COVER_FADE,
  V5_SCROLL_COVER_OVERLAP,
  V5_SCROLL_COVER_PIN,
  V5_SCROLL_COVER_SPRING,
} from "@/lib/v5-scroll-cover";
import { cn } from "@/lib/cn";

type ScrollCoverMotionContextValue = {
  progress: MotionValue<number>;
  active: boolean;
};

const ScrollCoverMotionContext = createContext<ScrollCoverMotionContextValue | null>(
  null,
);

function useScrollCoverMotion() {
  return useContext(ScrollCoverMotionContext);
}

export function ScrollCoverLine({
  progress,
  children,
  className,
  inStart,
  inEnd,
  outStart = V5_SCROLL_COVER_EXIT.outStart,
  outEnd = V5_SCROLL_COVER_EXIT.outEnd,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
  className?: string;
  inStart: number;
  inEnd: number;
  outStart?: number;
  outEnd?: number;
}) {
  const opacity = useTransform(
    progress,
    [0, inStart, inEnd, outStart, outEnd],
    [0, 0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [0, inStart, inEnd, outStart, outEnd],
    [40, 40, 0, 0, -52],
  );
  const filter = useTransform(
    progress,
    [0, inStart, inEnd, outStart, outEnd],
    ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  );

  return (
    <motion.div style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.div>
  );
}

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
  textBackdrop?: boolean;
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
  textBackdrop?: boolean;
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
  textBackdrop = false,
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
  textBackdrop?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [showImage, setShowImage] = useState(imagePriority);
  const useScrollCover = useV5ScrollCover();

  useEffect(() => {
    if (imagePriority || showImage) return;

    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight + 480) {
        setShowImage(true);
      }
    };

    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, [imagePriority, showImage]);

  const scrollCoverOn = useScrollCover && runway;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, V5_SCROLL_COVER_SPRING);
  const motionProgress = reduced || !scrollCoverOn ? scrollYProgress : smoothProgress;

  const textOpacity = useTransform(
    motionProgress,
    [0, V5_SCROLL_COVER_FADE.holdEnd, V5_SCROLL_COVER_FADE.fadeEnd],
    [1, 1, 0],
  );
  const textY = useTransform(
    motionProgress,
    [0, V5_SCROLL_COVER_FADE.holdEnd, V5_SCROLL_COVER_FADE.fadeEnd],
    [0, 0, -56],
  );

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
      {textBackdrop && (
        <div className="v5-text-backdrop-blur pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden />
      )}
      <div
        className={cn(
          "relative z-[1] flex w-full flex-col items-center",
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
        "v4-fullscreen v5-scroll-cover relative bg-[#020B1F]",
        runway && cn("v5-scroll-cover-pin h-svh min-h-[520px]", V5_SCROLL_COVER_PIN),
        overlap && V5_SCROLL_COVER_OVERLAP,
      )}
      style={{ zIndex: stackZIndex }}
    >
      <div className="sticky top-0 h-svh min-h-[520px] overflow-hidden">
        {showImage ? (
          <LoadingImage
            src={image}
            alt=""
            fill
            priority={imagePriority}
            sizes="100vw"
            className="object-cover"
            skeletonTone="dark"
          />
        ) : (
          <ImageSkeleton tone="dark" />
        )}
        <div className="v4-fullscreen-overlay absolute inset-0 z-[1]" />
        <LightSweep className="v4-fullscreen__sweep z-[2]" loop />

        <ScrollCoverMotionContext.Provider
          value={{
            progress: motionProgress,
            active: scrollCoverOn && !reduced,
          }}
        >
          {reduced || !scrollCoverOn ? (
            contentWrap(children)
          ) : fadeText ? (
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="h-full w-full"
            >
              {contentWrap(children)}
            </motion.div>
          ) : (
            contentWrap(children)
          )}
        </ScrollCoverMotionContext.Provider>
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
  textBackdrop = false,
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
      textBackdrop={textBackdrop}
    >
      {content}
    </V5ScrollCoverShell>
  );
}

function V5StatementScrollBody({
  label,
  titleLines,
  subtitle,
  progress,
}: {
  label: string;
  titleLines: readonly string[];
  subtitle: string;
  progress: MotionValue<number>;
}) {
  return (
    <>
      <ScrollCoverLine progress={progress} inStart={0.04} inEnd={0.14}>
        <p className="v4-label v5-type-eyebrow text-white">{label}</p>
      </ScrollCoverLine>
      <h2 className="v5-statement-title v5-type-display-xl mt-6 w-full text-center text-white">
        <TextShimmer as="span" tone="light" className="block w-full">
          <span className="v5-chapter-title__lines">
            {titleLines.map((line, index) => (
              <Fragment key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                <ScrollCoverLine
                  progress={progress}
                  inStart={0.1 + index * 0.06}
                  inEnd={0.2 + index * 0.06}
                  className="inline-block"
                >
                  {line}
                </ScrollCoverLine>
              </Fragment>
            ))}
          </span>
        </TextShimmer>
      </h2>
      <ScrollCoverLine progress={progress} inStart={0.3} inEnd={0.44} className="mt-6">
        <p className="v4-chapter-sub v5-narrow-text">
          <TextShimmer tone="light" className="inline">
            {subtitle}
          </TextShimmer>
        </p>
      </ScrollCoverLine>
    </>
  );
}

function V5StatementEntranceBody({
  label,
  titleLines,
  subtitle,
  reduced,
}: {
  label: string;
  titleLines: readonly string[];
  subtitle: string;
  reduced: boolean;
}) {
  const titleContent = <V5ChapterTitleContent lines={titleLines} />;

  return (
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
}

export function V5FullscreenStatement({
  id,
  image,
  label,
  titleLines,
  subtitle,
  textBackdrop = false,
}: V5FullscreenStatementProps) {
  const reduced = useReducedMotion();
  const scrollCover = useScrollCoverMotion();
  const wrapShell = (child: ReactNode) => (
    <V5FullscreenText innerClassName="flex flex-col items-center">{child}</V5FullscreenText>
  );

  const useScrollText = scrollCover?.active && !reduced;

  const body = useScrollText ? (
    <V5StatementScrollBody
      label={label}
      titleLines={titleLines}
      subtitle={subtitle}
      progress={scrollCover.progress}
    />
  ) : (
    <V5StatementEntranceBody
      label={label}
      titleLines={titleLines}
      subtitle={subtitle}
      reduced={!!reduced}
    />
  );

  const content =
    useScrollText || reduced ? (
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
      stackZIndex={6}
      overlap
      runway
      fadeText={false}
      textBackdrop={textBackdrop}
    >
      {content}
    </V5ScrollCoverShell>
  );
}
