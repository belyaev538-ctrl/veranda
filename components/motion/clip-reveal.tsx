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

export function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 1.15,
  priority = false,
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

  const y = isMobile ? 14 : 36;
  const viewDelay = isMobile ? delay * 0.35 : delay;

  return (
    <Component
      className={cn(className)}
      initial={{
        opacity: 0,
        y,
        scale: isMobile ? 1 : 0.98,
        filter: isMobile ? "blur(0px)" : "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={viewportOnce}
      transition={{
        duration: isMobile ? 0.7 : Math.min(duration, 1.1),
        delay: viewDelay,
        ease: luxuryEase,
      }}
    >
      {children}
    </Component>
  );
}
