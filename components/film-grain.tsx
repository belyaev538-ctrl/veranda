"use client";

import { useScrollMotion } from "@/components/motion/scroll-provider";
import { cn } from "@/lib/cn";

export function FilmGrain() {
  const { cinematic } = useScrollMotion();

  return (
    <div
      className={cn(
        "film-grain pointer-events-none fixed inset-0 z-[90]",
        cinematic && "animate-grain-shift",
      )}
      aria-hidden
    />
  );
}
