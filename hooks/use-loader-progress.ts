"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Плавный счётчик до complete, затем 100% */
export function useLoaderProgress(complete: boolean, exiting: boolean) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (exiting || complete) {
      setProgress(100);
      return;
    }

    if (reducedMotion) return;

    let value = 0;
    const id = window.setInterval(() => {
      const step = value < 55 ? 2.4 : value < 82 ? 0.9 : value < 92 ? 0.35 : 0.12;
      value = Math.min(92, value + step);
      setProgress(Math.floor(value));
    }, 70);

    return () => window.clearInterval(id);
  }, [complete, exiting, reducedMotion]);

  return progress;
}
