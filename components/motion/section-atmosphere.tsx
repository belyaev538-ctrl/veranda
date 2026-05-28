import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionTone = "cream" | "white" | "dark" | "warm";

const toneClasses: Record<SectionTone, string> = {
  cream: "section-tone-cream",
  white: "section-tone-white",
  dark: "section-tone-dark",
  warm: "section-tone-warm",
};

type SectionAtmosphereProps = {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
  as?: "section" | "div";
};

/** Cinematic dissolve between page chapters */
export function SectionAtmosphere({
  children,
  className,
  tone = "cream",
  id,
  as: Tag = "section",
}: SectionAtmosphereProps) {
  return (
    <Tag
      id={id}
      className={cn("section-atmosphere relative", toneClasses[tone], className)}
    >
      <div className="section-atmosphere-fade-top pointer-events-none" aria-hidden />
      <div className="section-atmosphere-fade-bottom pointer-events-none" aria-hidden />
      {children}
    </Tag>
  );
}
