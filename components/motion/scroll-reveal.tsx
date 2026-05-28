"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { luxuryEase, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useIsMobile } from "@/hooks/use-media";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  clip?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 48,
  clip = false,
}: ScrollRevealProps) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (clip && !reducedMotion) {
    return (
      <ClipReveal className={className} delay={delay}>
        {children}
      </ClipReveal>
    );
  }

  const offset = isMobile || reducedMotion ? Math.min(y, 12) : Math.min(y, 28);
  const mobileDelay = isMobile ? delay * 0.4 : delay;

  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: isMobile ? 0.55 : 1,
        delay: mobileDelay,
        ease: luxuryEase,
      }}
    >
      {children}
    </motion.div>
  );
}
