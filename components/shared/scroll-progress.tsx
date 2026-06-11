"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { useIntro } from "@/components/intro/intro-context";
import { cn } from "@/lib/cn";

type ScrollProgressProps = {
  /** Светлая тема для v1 (кремовый фон); accent — голубой fill (v5) */
  tone?: "light" | "dark" | "accent";
};

export function ScrollProgress({ tone = "dark" }: ScrollProgressProps) {
  const { introComplete } = useIntro();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  if (!introComplete) return null;

  return (
    <div
      className={cn(
        "luxury-scroll-progress",
        tone === "light" && "luxury-scroll-progress--light",
        tone === "accent" && "luxury-scroll-progress--accent",
      )}
      aria-hidden
    >
      <span className="luxury-scroll-progress__label">scroll</span>
      <div className="luxury-scroll-progress__track">
        <motion.div className="luxury-scroll-progress__fill" style={{ scaleY }} />
      </div>
      <span className="luxury-scroll-progress__percent">{percent}</span>
    </div>
  );
}
