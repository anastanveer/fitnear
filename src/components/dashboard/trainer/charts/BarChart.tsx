"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Point } from "@/data/trainerDashboard";
import { niceMax } from "./chartUtils";

const W = 760;
const H = 300;
const PAD = { top: 24, right: 16, bottom: 40, left: 56 };

/** Hand-built animated bar chart — bars grow from the baseline on mount. */
export function BarChart({
  data,
  color = "#ccfa3c",
  valueFormat = (v: number) => String(v),
}: {
  data: Point[];
  color?: string;
  valueFormat?: (v: number) => string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const { bars, gridY, baseY } = useMemo(() => {
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const baseY = PAD.top + innerH;
    const max = niceMax(Math.max(...data.map((d) => d.value)));
    const slot = innerW / data.length;
    const bw = Math.min(slot * 0.5, 52);
    const bars = data.map((d, i) => {
      const h = (d.value / max) * innerH;
      return {
        x: PAD.left + slot * i + (slot - bw) / 2,
        y: baseY - h,
        w: bw,
        h,
        cx: PAD.left + slot * i + slot / 2,
        d,
      };
    });
    const ticks = 4;
    const gridY = Array.from({ length: ticks + 1 }, (_, i) => ({
      value: (max / ticks) * i,
      y: baseY - (innerH * i) / ticks,
    }));
    return { bars, gridY, baseY };
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto overflow-visible"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={`Earnings per month, latest ${valueFormat(data[data.length - 1].value)}`}
    >
      {/* Gridlines + y labels */}
      {gridY.map((g, i) => (
        <g key={i}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={g.y}
            y2={g.y}
            stroke="#0b0d0b"
            strokeOpacity={i === 0 ? 0.14 : 0.06}
            strokeDasharray={i === 0 ? "0" : "3 5"}
          />
          <text
            x={PAD.left - 10}
            y={g.y + 4}
            textAnchor="end"
            className="fill-fg-muted"
            fontSize="11"
          >
            {g.value >= 1000 ? `${Math.round(g.value / 1000)}k` : Math.round(g.value)}
          </text>
        </g>
      ))}

      {/* Bars */}
      {bars.map((b, i) => (
        <g key={i} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
          <motion.rect
            x={b.x}
            width={b.w}
            rx={7}
            fill={active === i ? "#0b0d0b" : color}
            initial={reduce ? { y: b.y, height: b.h } : { y: baseY, height: 0 }}
            animate={{ y: b.y, height: b.h }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          {/* Value on top when active */}
          {active === i && (
            <text
              x={b.cx}
              y={b.y - 10}
              textAnchor="middle"
              className="fill-fg"
              fontSize="12"
              fontWeight={700}
            >
              {valueFormat(b.d.value)}
            </text>
          )}
          <text
            x={b.cx}
            y={baseY + 22}
            textAnchor="middle"
            className="fill-fg-muted"
            fontSize="11"
            fontWeight={active === i ? 700 : 400}
          >
            {b.d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
