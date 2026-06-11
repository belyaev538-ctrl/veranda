"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

function formatCoord(
  value: number,
  hemisphere: "N" | "S" | "E" | "W",
  scrambleSeconds: boolean,
) {
  const abs = Math.abs(value);
  const degrees = Math.floor(abs);
  const minutesFloat = (abs - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = scrambleSeconds
    ? Math.floor(Math.random() * 60)
    : Math.min(59, Math.floor((minutesFloat - minutes) * 60));

  return `[${degrees}° ${minutes.toString().padStart(2, "0")}' ${seconds
    .toString()
    .padStart(2, "0")}" ${hemisphere}]`;
}

type HeroCompassCoordsProps = {
  className?: string;
  opacity?: MotionValue<number>;
};

export function HeroCompassCoords({ className, opacity }: HeroCompassCoordsProps) {
  const [lat, setLat] = useState('[43° 07\' 12" N]');
  const [lon, setLon] = useState('[06° 54\' 08" E]');
  const movingRef = useRef(false);
  const stopTimerRef = useRef(0);
  const tickTimerRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  const updateCoords = (scrambleSeconds: boolean) => {
    const { x, y } = pointerRef.current;
    const latitude = 43.05 + (1 - y) * 1.35;
    const longitude = 6.15 + x * 2.75;
    setLat(formatCoord(latitude, "N", scrambleSeconds));
    setLon(formatCoord(longitude, "E", scrambleSeconds));
  };

  useEffect(() => {
    updateCoords(false);

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      movingRef.current = true;
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = window.setTimeout(() => {
        movingRef.current = false;
        updateCoords(false);
      }, 140);
      updateCoords(true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    tickTimerRef.current = window.setInterval(() => {
      if (!movingRef.current) return;
      updateCoords(true);
    }, 85);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.clearTimeout(stopTimerRef.current);
      window.clearInterval(tickTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      className={cn("v2-hero-coords", className)}
      style={opacity ? { opacity } : undefined}
      aria-hidden
    >
      <span className="v2-hero-coords__item">{lat}</span>
      <span className="v2-hero-coords__item">{lon}</span>
    </motion.div>
  );
}
