"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type TextShimmerProps = {
  children: ReactNode;
  className?: string;
  /** light = тёмный текст на светлом фоне */
  tone?: "light" | "dark" | "gold";
  as?: "span" | "p" | "h1" | "h2" | "h3";
};

export function TextShimmer({
  children,
  className,
  tone = "dark",
  as: Tag = "span",
}: TextShimmerProps) {
  return (
    <Tag
      className={cn(
        "luxury-text-shimmer",
        tone === "light" && "luxury-text-shimmer--on-dark",
        tone === "gold" && "luxury-text-shimmer--gold",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
