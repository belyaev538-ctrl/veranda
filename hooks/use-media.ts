"use client";

import { useSyncExternalStore } from "react";

function getMobileQuery(breakpoint: number) {
  return `(max-width: ${breakpoint}px)`;
}

export function useIsMobile(breakpoint = 767) {
  const query = getMobileQuery(breakpoint);

  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useIsDesktop(breakpoint = 1199) {
  const query = `(min-width: ${breakpoint + 1}px)`;

  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
