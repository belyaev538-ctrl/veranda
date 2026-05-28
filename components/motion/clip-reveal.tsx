"use client";

import { motion } from "framer-motion";
import { luxuryEase, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useScrollMotion } from "@/components/motion/scroll-provider";

type ClipRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** inset direction: bottom-up cinematic emerge */
  direction?: "up" | "down" | "left";
  as?: "div" | "article" | "h1" | "h2" | "h3" | "p" | "span" | "li";
};

const clipHidden = {
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
} as const;

export function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 1.15,
  direction = "up",
  as = "div",
}: ClipRevealProps) {
  const Component = motion[as];
  const { isMobile, reducedMotion } = useScrollMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (isMobile) {
    return (
      <Component
        className={cn(className)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, delay, ease: luxuryEase }}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={cn("will-change-[clip-path]", className)}
      initial={{ opacity: 0, clipPath: clipHidden[direction] }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: luxuryEase }}
    >
      {children}
    </Component>
  );
}
