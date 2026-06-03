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

export function V4Button({
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

export function V4Reveal({
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

export function V4Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("v4-label", className)}>{children}</p>;
}

export function V4DisplayTitle({
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
