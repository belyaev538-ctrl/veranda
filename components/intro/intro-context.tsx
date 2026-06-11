"use client";

import { createContext, useContext, type ReactNode } from "react";

type IntroContextValue = {
  introComplete: boolean;
  heroEnter: boolean;
  /** Интро с hero-кадром было показано в этой сессии (не skip) */
  introWasPlayed: boolean;
  /** Hero готов после compass-лоадера (v5/v6) */
  signalHeroEnter: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  introComplete: true,
  heroEnter: true,
  introWasPlayed: false,
  signalHeroEnter: () => {},
});

export function IntroContextProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: IntroContextValue;
}) {
  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
