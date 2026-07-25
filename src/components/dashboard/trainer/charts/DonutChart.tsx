"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Slice } from "@/data/trainerDashboard";

const SIZE = 220;
const R = 82;
const STROKE = 30;
const C = 2 * Math.PI * R;
const CENTER = SIZE / 2;

/** Hand-built animated donut — each arc sweeps in from zero on mount. */
export function DonutChart({
  data,
  centerLabel,
  centerSub,
}: {
  data: Slice[];
  centerLabel?: string;
  centerSub?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const segments = useMemo(() => {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    return data.map((d, i) => {
      const frac = d.value / total;
      const offset =
        data.slice(0, i).reduce((s, p) => s + p.value, 0) / total;
      return { ...d, frac, offset, pct: Math.round(frac * 100) };
    });
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full h-auto max-w-[220px]"
      style={{ aspectRatio: "1 / 1" }}
      role="img"
      aria-label={`Enquiry sources: ${segments
        .map((s) => `${s.label} ${s.pct}%`)
        .join(", ")}`}
    >
      {/* Track */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={R}
        fill="none"
        stroke="#0b0d0b"
        strokeOpacity={0.05}
        strokeWidth={STROKE}
      />
      <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
        {segments.map((s, i) => (
          <motion.circle
            key={s.label}
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={active === i ? STROKE + 6 : STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${s.frac * C} ${C}`}
            transform={`rotate(${s.offset * 360} ${CENTER} ${CENTER})`}
            initial={reduce ? false : { strokeDashoffset: s.frac * C }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </g>

      {/* Center label */}
      <text
        x={CENTER}
        y={CENTER - 4}
        textAnchor="middle"
        className="fill-fg font-display"
        fontSize="30"
        fontWeight={700}
      >
        {active !== null ? `${segments[active].pct}%` : centerLabel}
      </text>
      <text
        x={CENTER}
        y={CENTER + 18}
        textAnchor="middle"
        className="fill-fg-muted"
        fontSize="11"
      >
        {active !== null ? segments[active].label : centerSub}
      </text>
    </svg>
  );
}
