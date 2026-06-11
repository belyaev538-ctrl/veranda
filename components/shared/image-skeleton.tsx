"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type ImageSkeletonTone = "dark" | "light" | "warm";

const TONE_CLASS: Record<ImageSkeletonTone, string> = {
  dark: "image-skeleton--dark",
  light: "image-skeleton--light",
  warm: "image-skeleton--warm",
};

type ImageSkeletonProps = {
  tone?: ImageSkeletonTone;
  className?: string;
};

export function ImageSkeleton({ tone = "dark", className }: ImageSkeletonProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "image-skeleton",
        TONE_CLASS[tone],
        reduced && "image-skeleton--static",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Загрузка изображения"
    >
      <span className="image-skeleton__shine" aria-hidden />
      <span className="image-skeleton__pulse" aria-hidden />
    </div>
  );
}
