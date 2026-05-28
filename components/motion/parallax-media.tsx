"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { useScrollMotion } from "@/components/motion/scroll-provider";
import { cn } from "@/lib/cn";

type ParallaxMediaProps = {
  photo: number;
  className?: string;
  speed?: number;
  scaleRange?: [number, number];
  breathe?: boolean;
};

export function ParallaxMedia({
  photo,
  className,
  speed = 0.08,
  scaleRange = [1, 1.06],
  breathe = false,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { smoothProgress, isMobile, reducedMotion } = useScrollMotion();

  const effectiveSpeed = isMobile && !reducedMotion ? speed * 0.2 : speed;

  const y = useTransform(
    smoothProgress,
    [0, 1],
    reducedMotion
      ? ["0%", "0%"]
      : [`-${effectiveSpeed * 60}%`, `${effectiveSpeed * 60}%`],
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    reducedMotion || isMobile ? [1, 1, 1] : [scaleRange[0], 1.02, scaleRange[1]],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className={cn(
          "absolute inset-0 h-[115%] w-full -top-[7.5%]",
          breathe && !isMobile && !reducedMotion && "animate-breathe",
        )}
        style={reducedMotion || isMobile ? undefined : { y, scale }}
      >
        <PlaceholderImage
          photo={photo}
          rounded={false}
          hoverMode="luxury"
          className="h-full w-full"
        />
      </motion.div>
    </div>
  );
}
