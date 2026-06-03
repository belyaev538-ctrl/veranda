"use client";

import { createContext, useContext, type ReactNode } from "react";

type IntroContextValue = {
  introComplete: boolean;
  heroEnter: boolean;
};

const IntroContext = createContext<IntroContextValue>({
  introComplete: true,
  heroEnter: true,
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
