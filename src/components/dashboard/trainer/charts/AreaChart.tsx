"use client";

import { useMemo, useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Point } from "@/data/trainerDashboard";
import { smoothPath, niceMax, type XY } from "./chartUtils";

const W = 760;
const H = 300;
const PAD = { top: 24, right: 20, bottom: 40, left: 48 };

/**
 * Hand-built animated area/line chart (no chart library).
 * Path draws itself in, area fades up, dots pop, hover reveals a value marker.
 */
export function AreaChart({
  data,
  color = "#ccfa3c",
  stroke = "#a9dd12",
  valueFormat = (v: number) => String(v),
}: {
  data: Point[];
  color?: string;
  stroke?: string;
  valueFormat?: (v: number) => string;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number | null>(null);

  const { pts, line, area, gridY } = useMemo(() => {
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const max = niceMax(Math.max(...data.map((d) => d.value)));
    const pts: XY[] = data.map((d, i) => ({
      x: PAD.left + (data.length === 1 ? innerW / 2 : (innerW * i) / (data.length - 1)),
      y: PAD.top + innerH - (d.value / max) * innerH,
    }));
    const line = smoothPath(pts);
    const baseline = PAD.top + innerH;
    const area = `${line} L ${pts[pts.length - 1].x} ${baseline} L ${pts[0].x} ${baseline} Z`;
    const ticks = 4;
    const gridY = Array.from({ length: ticks + 1 }, (_, i) => ({
      value: (max / ticks) * i,
      y: PAD.top + innerH - (innerH * i) / ticks,
    }));
    return { pts, line, area, gridY };
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto overflow-visible"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={`Profile views trend across ${data.length} weeks, peaking at ${valueFormat(
        Math.max(...data.map((d) => d.value)),
      )}`}
    >
      <defs>
        <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

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
            {Math.round(g.value)}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <motion.path
        d={area}
        fill={`url(#area-${uid})`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Animated line draw */}
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Active vertical guide */}
      {active !== null && (
        <line
          x1={pts[active].x}
          x2={pts[active].x}
          y1={PAD.top}
          y2={H - PAD.bottom}
          stroke="#0b0d0b"
          strokeOpacity={0.18}
        />
      )}

      {/* Dots + x labels + hit areas */}
      {pts.map((p, i) => (
        <g key={i}>
          <text
            x={p.x}
            y={H - PAD.bottom + 22}
            textAnchor="middle"
            className="fill-fg-muted"
            fontSize="11"
            fontWeight={active === i ? 700 : 400}
          >
            {data[i].label}
          </text>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={active === i ? 6 : 4}
            fill="#0b0d0b"
            stroke={color}
            strokeWidth={active === i ? 4 : 2.5}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.06, type: "spring", stiffness: 300, damping: 18 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          {/* Tooltip */}
          {active === i && (
            <g>
              <rect
                x={Math.min(Math.max(p.x - 34, 4), W - 72)}
                y={p.y - 40}
                width={68}
                height={26}
                rx={8}
                fill="#0b0d0b"
              />
              <text
                x={Math.min(Math.max(p.x, 38), W - 38)}
                y={p.y - 22}
                textAnchor="middle"
                fill="#ccfa3c"
                fontSize="12"
                fontWeight={700}
              >
                {valueFormat(data[i].value)}
              </text>
            </g>
          )}
          {/* Invisible wide hit target */}
          <rect
            x={p.x - (W - PAD.left - PAD.right) / (2 * data.length)}
            y={0}
            width={(W - PAD.left - PAD.right) / data.length}
            height={H}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer"
          />
        </g>
      ))}
    </svg>
  );
}
