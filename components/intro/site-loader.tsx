"use client";

import { CompassLoaderOverlay } from "@/components/intro/compass-loader-overlay";

type SiteLoaderProps = {
  backgroundColor?: string;
  heroImage?: string;
  complete?: boolean;
  onDismissed?: () => void;
};

export function SiteLoader({
  backgroundColor = "#020B1F",
  heroImage,
  complete = false,
  onDismissed,
}: SiteLoaderProps) {
  return (
    <CompassLoaderOverlay
      variant="fixed"
      backgroundColor={backgroundColor}
      heroImage={heroImage}
      complete={complete}
      onDismissed={onDismissed}
    />
  );
}
