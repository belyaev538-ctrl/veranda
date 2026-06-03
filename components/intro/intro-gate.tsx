"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IntroContextProvider } from "@/components/intro/intro-context";
import { YachtIntroOverlay } from "@/components/intro/yacht-intro-overlay";
import {
  hasSeenIntro,
  type IntroStorageVariant,
} from "@/lib/intro-storage";
import { useReducedMotion } from "framer-motion";

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
};

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

  useEffect(() => {
    const skip = hasSeenIntro(introVariant) || reducedMotion === true;
    setIntroComplete(skip);
    setHeroEnter(skip);
    setReady(true);
  }, [reducedMotion, introVariant]);

  const showIntro = ready && !introComplete;

  const handleComplete = () => {
    setIntroComplete(true);
    setHeroEnter(true);
  };

  if (!ready) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: INTRO_BG[introVariant] }}
        aria-busy="true"
      />
    );
  }

  return (
    <IntroContextProvider value={{ introComplete, heroEnter }}>
      {showIntro && (
        <YachtIntroOverlay
          heroImage={heroImage}
          introVariant={introVariant}
          backgroundColor={INTRO_BG[introVariant]}
          scrollCoords={scrollCoords}
          onComplete={handleComplete}
        />
      )}
      <div
        className={showIntro ? "pointer-events-none select-none" : undefined}
        aria-hidden={showIntro}
      >
        {children}
      </div>
    </IntroContextProvider>
  );
}
