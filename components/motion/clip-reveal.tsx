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
  /** Above-the-fold: animate on mount (desktop) or show immediately (mobile) */
  priority?: boolean;
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
  priority = false,
  direction = "up",
  as = "div",
}: ClipRevealProps) {
  const Component = motion[as];
  const { isMobile, reducedMotion } = useScrollMotion();

  if (reducedMotion || (isMobile && priority)) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (priority) {
    return (
      <Component
        className={cn(className)}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: Math.min(duration, 0.9), delay, ease: luxuryEase }}
      >
        {children}
      </Component>
    );
  }

  if (isMobile) {
    const mobileDelay = delay * 0.35;
    return (
      <Component
        className={cn(className)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.65, delay: mobileDelay, ease: luxuryEase }}
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
