"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { luxuryEase, v4Reveal, viewportOnceDeep } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const v4FadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: luxuryEase },
  },
};

export function V5Button({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const cls = cn("v4-btn", className);
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function V5Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceDeep}
      variants={v4Reveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function V5Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("v4-label v5-type-caption", className)}>{children}</p>;
}

/** Заголовок секции — Display Medium (44px) */
export function V5SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("v5-type-display-md font-sans", className)}>{children}</h2>
  );
}

/** Fullscreen: Content 1280 → Text 720, визуально по центру экрана */
export function V5FullscreenText({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn("v5-fullscreen-text", className)}>
      <div className={cn("v5-fullscreen-text__inner", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

export function V5DisplayTitle({
  lines,
  className,
  shimmer = false,
  shimmerTone = "light",
}: {
  lines: string[];
  className?: string;
  shimmer?: boolean;
  shimmerTone?: "light" | "dark" | "gold";
}) {
  return (
    <h2 className={cn("v4-display-title", className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          {shimmer && i === 0 ? (
            <TextShimmer as="span" tone={shimmerTone} className="inline-block">
              {line}
            </TextShimmer>
          ) : (
            line
          )}
        </span>
      ))}
    </h2>
  );
}
