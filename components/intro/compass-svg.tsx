"use client";

import { motion } from "framer-motion";

const CX = 100;
const CY = 100;
const TICK_COUNT = 72;

const R_OUTER = 76.8;
const R_INNER = 57.6;
const R_TICK_OUTER = 75;
const R_TICK_INNER_MAJOR = 60.8;
const R_TICK_INNER_MINOR = 67.2;

const CROSS_OUTER = 44.8;
const CROSS_INNER = 42;

const R_LABEL = 88;

/** Стрелка симметрично относительно центра (100, 100) */
const N_TIP = 38;
const N_BASE = 54;
const S_TIP = 162;
const S_BASE = 146;

function buildTicks() {
  return Array.from({ length: TICK_COUNT }, (_, i) => {
    const angle = ((i * 360) / TICK_COUNT - 90) * (Math.PI / 180);
    const major = i % 9 === 0;
    const inner = major ? R_TICK_INNER_MAJOR : R_TICK_INNER_MINOR;
    const x1 = CX + Math.cos(angle) * inner;
    const y1 = CY + Math.sin(angle) * inner;
    const x2 = CX + Math.cos(angle) * R_TICK_OUTER;
    const y2 = CY + Math.sin(angle) * R_TICK_OUTER;
    return { x1, y1, x2, y2, major, key: i };
  });
}

const TICKS = buildTicks();

export function headingDegFromPointer(
  clientX: number,
  clientY: number,
  centerX: number,
  centerY: number,
): number {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  if (dx * dx + dy * dy < 36) return 0;
  return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
}

type CompassSvgProps = {
  className?: string;
  ticksReady?: boolean;
};

export function CompassSvg({ className, ticksReady = true }: CompassSvgProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <text
        x={CX + R_LABEL}
        y={CY + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontSize={11}
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight={300}
        letterSpacing="0.2em"
      >
        E
      </text>
      <text
        x={CX}
        y={CY - R_LABEL + 5}
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontSize={11}
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight={300}
        letterSpacing="0.2em"
      >
        N
      </text>
      <text
        x={CX}
        y={CY + R_LABEL + 5}
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontSize={11}
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight={300}
        letterSpacing="0.2em"
      >
        S
      </text>
      <text
        x={CX - R_LABEL}
        y={CY + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontSize={11}
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight={300}
        letterSpacing="0.2em"
      >
        W
      </text>

      <circle
        cx={CX}
        cy={CY}
        r={R_OUTER}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />
      <motion.circle
        cx={CX}
        cy={CY}
        r={R_OUTER}
        stroke="rgba(255,255,255,0.85)"
        strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: ticksReady ? 1 : 0, opacity: ticksReady ? 1 : 0.4 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <circle
        cx={CX}
        cy={CY}
        r={R_INNER}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />

      <g>
        {TICKS.map((t) => (
          <motion.line
            key={t.key}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)"}
            strokeWidth={t.major ? 1.25 : 0.75}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: ticksReady ? 1 : 0,
              opacity: ticksReady ? 1 : 0,
            }}
            transition={{
              duration: 1.5,
              delay: t.key * 0.008,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </g>

      <line
        x1={CX}
        y1={CY - CROSS_OUTER}
        x2={CX}
        y2={CY + CROSS_OUTER}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />
      <line
        x1={CX - CROSS_OUTER}
        y1={CY}
        x2={CX + CROSS_OUTER}
        y2={CY}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />
      <line
        x1={CX}
        y1={CY - CROSS_INNER}
        x2={CX}
        y2={CY + CROSS_INNER}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={0.5}
      />
      <line
        x1={CX - CROSS_INNER}
        y1={CY}
        x2={CX + CROSS_INNER}
        y2={CY}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={0.5}
      />

      {/* Стрелка — строго по центру viewBox */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <line
          x1={CX}
          y1={CY}
          x2={CX}
          y2={N_TIP + 4}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={1.5}
        />
        <line
          x1={CX}
          y1={N_TIP}
          x2={CX - 8}
          y2={N_BASE}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={1.25}
        />
        <line
          x1={CX}
          y1={N_TIP}
          x2={CX + 8}
          y2={N_BASE}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={1.25}
        />
        <line
          x1={CX}
          y1={CY}
          x2={CX}
          y2={S_TIP - 4}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1.25}
        />
        <line
          x1={CX}
          y1={S_TIP}
          x2={CX - 6}
          y2={S_BASE}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
        />
        <line
          x1={CX}
          y1={S_TIP}
          x2={CX + 6}
          y2={S_BASE}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
        />
      </g>

      <circle cx={CX} cy={CY} r={3.2} fill="rgba(255,255,255,0.85)" />
      <circle
        cx={CX}
        cy={CY}
        r={5.6}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />
    </svg>
  );
}
