"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IntroContextProvider } from "@/components/intro/intro-context";
import { SiteLoader } from "@/components/intro/site-loader";
import { YachtIntroOverlay } from "@/components/intro/yacht-intro-overlay";
import {
  hasSeenIntro,
  type IntroStorageVariant,
} from "@/lib/intro-storage";
import { useReducedMotion } from "framer-motion";
import { preloadHeroImage } from "@/lib/hero-image-cache";

type IntroGateProps = {
  children: ReactNode;
  heroImage: string;
  /** Отдельный ключ интро для v2 / v3 */
  introVariant?: IntroStorageVariant;
  /** Координаты под компасом (v3): меняются при прокрутке */
  scrollCoords?: readonly string[];
};

const INTRO_BG: Record<IntroStorageVariant, string> = {
  v2: "#020B26",
  v3: "#0d1322",
  v4: "#020B1F",
  v5: "#020B1F",
  v6: "#020B1F",
};

function isHeroInlineIntro(variant: IntroStorageVariant): boolean {
  return variant === "v5" || variant === "v6";
}

export function IntroGate({
  children,
  heroImage,
  introVariant = "v2",
  scrollCoords,
}: IntroGateProps) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [heroEnter, setHeroEnter] = useState(false);
  const [introWasPlayed, setIntroWasPlayed] = useState(false);

  useEffect(() => {
    const heroInline = isHeroInlineIntro(introVariant);
    const skip = hasSeenIntro(introVariant) || reducedMotion === true;
    setIntroComplete(heroInline ? true : skip);
    setHeroEnter(heroInline ? false : skip);
    setIntroWasPlayed(false);
    setReady(true);
  }, [reducedMotion, introVariant]);

  const showIntro = ready && !introComplete && !isHeroInlineIntro(introVariant);

  useEffect(() => {
    if (!ready) return;
    void preloadHeroImage(heroImage);
    if (isHeroInlineIntro(introVariant)) {
      void import("@/components/v5/v5-below-fold");
    }
  }, [ready, heroImage, introVariant]);

  const handleComplete = () => {
    setIntroWasPlayed(true);
    setIntroComplete(true);
    setHeroEnter(true);
  };

  if (!ready) {
    return <SiteLoader backgroundColor={INTRO_BG[introVariant]} />;
  }

  return (
    <IntroContextProvider
      value={{
        introComplete,
        heroEnter,
        introWasPlayed,
        signalHeroEnter: () => setHeroEnter(true),
      }}
    >
      {showIntro && (
        <YachtIntroOverlay
          heroImage={heroImage}
          introVariant={introVariant}
          backgroundColor={INTRO_BG[introVariant]}
          scrollCoords={scrollCoords}
          onComplete={handleComplete}
        />
      )}
      {!showIntro ? children : null}
    </IntroContextProvider>
  );
}
