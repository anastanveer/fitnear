"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/shared/Counter";

const SIZE = 160;
const R = 66;
const STROKE = 14;
const C = 2 * Math.PI * R;
const CENTER = SIZE / 2;

/** Animated radial gauge for the profile-strength score. */
export function RadialProgress({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const frac = Math.max(0, Math.min(100, value)) / 100;

  return (
    <div className="relative inline-grid place-items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-40 h-40 -rotate-90"
        role="img"
        aria-label={`Profile strength ${value} percent`}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke="#0b0d0b"
          strokeOpacity={0.08}
          strokeWidth={STROKE}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke="#ccfa3c"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={C}
          initial={reduce ? { strokeDashoffset: C * (1 - frac) } : { strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - frac) }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <Counter
            to={value}
            suffix="%"
            className="font-display text-3xl font-bold text-fg"
          />
          <div className="text-xs font-medium text-fg-muted">strength</div>
        </div>
      </div>
    </div>
  );
}
