"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useIntro } from "@/components/intro/intro-context";
import { V5Hero } from "@/components/v5/v5-hero";

const V5BelowFold = dynamic(
  () => import("@/components/v5/v5-below-fold").then((mod) => mod.V5BelowFold),
  { ssr: false },
);

export function V5PageContent() {
  const { introComplete } = useIntro();
  const [chunkReady, setChunkReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/v5/v5-below-fold").then(() => {
      if (!cancelled) setChunkReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const showBelowFold = introComplete && chunkReady;

  return (
    <>
      <V5Hero />
      {showBelowFold ? <V5BelowFold /> : null}
    </>
  );
}
