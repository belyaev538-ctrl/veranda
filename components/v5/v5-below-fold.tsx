"use client";

import {
  V5Collections,
  V5Contact,
  V5Custom,
  V5Experience,
  V5Faq,
  V5Gallery,
  V5Materials,
  V5Nda,
  V5Production,
  V5Philosophy,
  V5StatementVisual,
  V5Visualization,
  V5VisualChapters,
  V5YachtTourSection,
} from "@/components/v5/v5-sections";

export function V5BelowFold() {
  return (
    <>
      <V5Philosophy />
      <V5StatementVisual />
      <V5VisualChapters />
      <V5Production />
      <V5YachtTourSection />
      <V5Custom />
      <V5Collections />
      <V5Visualization />
      <V5Materials />
      <V5Nda />
      <V5Gallery />
      <V5Experience />
      <V5Faq />
      <V5Contact />
    </>
  );
}
