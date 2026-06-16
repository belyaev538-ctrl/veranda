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

/** Насколько крест и стрелка выходят за внешний круг */
const R_EXTEND = 30;
const CROSS_OUTER = R_OUTER + R_EXTEND;
const CROSS_INNER = CROSS_OUTER * (42 / 44.8);

/** Буквы снаружи внешнего кольца */
const R_DIR = R_OUTER + 48;
const VIEW_PAD = 52;
const VIEW_SIZE = 200 + VIEW_PAD * 2;

/** Единая толщина линий стрелки N и крупных засечек */
const STROKE_BOLD = 2.25;
const STROKE_TICK_MINOR = 1;

/** Стрелка — остриё за внешним кольцом */
const N_TIP = CY - CROSS_OUTER;
const N_HEAD = N_TIP + 18;
const S_TIP = CY + CROSS_OUTER;
const S_HEAD = S_TIP - 18;
const ARROW_HEAD_W_N = 8;
const ARROW_HEAD_W_S = 6.5;

/** Простая стрелка: стержень + треугольный наконечник */
export function CompassNeedle({
  tipY,
  headY,
  headWidth,
  color,
  cx = CX,
  cy = CY,
  strokeWidth = STROKE_BOLD,
}: {
  tipY: number;
  headY: number;
  headWidth: number;
  color: string;
  cx?: number;
  cy?: number;
  strokeWidth?: number;
}) {
  const half = headWidth / 2;
  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={headY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
      />
      <polygon
        points={`${cx},${tipY} ${cx - half},${headY} ${cx + half},${headY}`}
        fill={color}
      />
    </g>
  );
}

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

const DIRECTIONS = [
  { label: "N", x: CX, y: CY - R_DIR },
  { label: "E", x: CX + R_DIR, y: CY },
  { label: "S", x: CX, y: CY + R_DIR },
  { label: "W", x: CX - R_DIR, y: CY },
] as const;

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
  /** Без framer-анимации прорисовки (мобилка hero) */
  staticTicks?: boolean;
};

function CompassDirections() {
  return (
    <>
      {DIRECTIONS.map(({ label, x, y }) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={
            label === "N"
              ? "intro-compass-dir intro-compass-dir--north"
              : "intro-compass-dir"
          }
        >
          {label}
        </text>
      ))}
    </>
  );
}

export function CompassSvg({
  className,
  ticksReady = true,
  staticTicks = false,
}: CompassSvgProps) {
  const showTicks = staticTicks || ticksReady;

  return (
    <svg
      viewBox={`${-VIEW_PAD} ${-VIEW_PAD} ${VIEW_SIZE} ${VIEW_SIZE}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      overflow="visible"
      aria-hidden
    >
      <circle
        cx={CX}
        cy={CY}
        r={R_OUTER}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />
      {staticTicks ? (
        <circle
          cx={CX}
          cy={CY}
          r={R_OUTER}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={1.25}
        />
      ) : (
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
      )}

      <circle
        cx={CX}
        cy={CY}
        r={R_INNER}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />

      <g>
        {TICKS.map((t) =>
          staticTicks ? (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)"}
              strokeWidth={t.major ? STROKE_BOLD : STROKE_TICK_MINOR}
              strokeLinecap="round"
            />
          ) : (
            <motion.line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)"}
              strokeWidth={t.major ? STROKE_BOLD : STROKE_TICK_MINOR}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: showTicks ? 1 : 0,
                opacity: showTicks ? 1 : 0,
              }}
              transition={{
                duration: 1.5,
                delay: t.key * 0.008,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ),
        )}
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

      <CompassNeedle
        tipY={N_TIP}
        headY={N_HEAD}
        headWidth={ARROW_HEAD_W_N}
        color="rgba(255,255,255,0.85)"
      />
      <CompassNeedle
        tipY={S_TIP}
        headY={S_HEAD}
        headWidth={ARROW_HEAD_W_S}
        color="rgba(255,255,255,0.18)"
      />

      <circle cx={CX} cy={CY} r={3.2} fill="rgba(255,255,255,0.85)" />
      <circle
        cx={CX}
        cy={CY}
        r={5.6}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.75}
      />

      <CompassDirections />
    </svg>
  );
}
