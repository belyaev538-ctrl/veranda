"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LightSweep } from "@/components/motion/light-sweep";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useV5MotionEnabled } from "@/hooks/use-v5-motion";
import type { ReactNode } from "react";

type V5SectionEnterProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Мерцание на стыке секций */
  sweep?: boolean;
  as?: "section" | "div";
};

/** Плавный вход секции + опциональный световой проход */
export function V5SectionEnter({
  children,
  id,
  className,
  sweep = true,
  as = "section",
}: V5SectionEnterProps) {
  const reduced = useReducedMotion();
  const motionOn = useV5MotionEnabled();
  const Tag = motion[as];

  if (reduced || !motionOn) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      className={cn("v4-section-enter relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.15, ease: luxuryEase }}
    >
      {sweep && (
        <LightSweep className="v4-section-enter__sweep" playOnView />
      )}
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
