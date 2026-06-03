"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type LightSweepProps = {
  className?: string;
  /** Запуск при появлении в viewport (как на production-карточках) */
  playOnView?: boolean;
  /** Бесконечное мягкое мерцание */
  loop?: boolean;
};

export function LightSweep({
  className,
  playOnView = true,
  loop = false,
}: LightSweepProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  if (loop) {
    return (
      <div
        className={cn("luxury-light-sweep luxury-light-sweep--loop", className)}
        aria-hidden
      />
    );
  }

  if (!playOnView) {
    return (
      <div className={cn("luxury-light-sweep", className)} aria-hidden />
    );
  }

  return (
    <motion.div
      className={cn("luxury-light-sweep", className)}
      aria-hidden
      initial={{ opacity: 0, x: "-120%" }}
      whileInView={{
        opacity: [0, 1, 1, 0],
        x: ["-120%", "0%", "120%", "160%"],
      }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.15, 0.85, 1],
      }}
    />
  );
}
