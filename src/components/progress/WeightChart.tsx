"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Measurement } from "@/data/progress";

/* ============================================================
   Dependency-free inline SVG line chart for weight trend.
   Responsive via viewBox; no layout shift (fixed aspect box).
   ============================================================ */

const W = 640;
const H = 220;
const PAD = { t: 20, r: 16, b: 28, l: 40 };

export function WeightChart({ data }: { data: Measurement[] }) {
  const gradId = useId();
  const reduce = useReducedMotion();

  // Oldest → newest.
  const points = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  if (points.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-ink-900/12 bg-cloud/60 text-center text-sm text-fg-muted">
        Log at least two weigh-ins to see your trend line.
      </div>
    );
  }

  const weights = points.map((p) => p.weightKg);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const span = max - min || 1;
  // pad the domain a touch so the line never hugs the edges
  const domMin = min - span * 0.25;
  const domMax = max + span * 0.25;

  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const x = (i: number) =>
    PAD.l + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) =>
    PAD.t + innerH - ((v - domMin) / (domMax - domMin)) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.weightKg).toFixed(1)}`)
    .join(" ");

  const areaPath =
    `${linePath} L ${x(points.length - 1).toFixed(1)} ${(H - PAD.b).toFixed(1)}` +
    ` L ${x(0).toFixed(1)} ${(H - PAD.b).toFixed(1)} Z`;

  // 3 horizontal guide lines
  const guides = [0, 0.5, 1].map((f) => domMin + f * (domMax - domMin));

  const latest = points[points.length - 1];
  const first = points[0];
  const delta = Math.round((latest.weightKg - first.weightKg) * 10) / 10;

  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        Weight trend from {first.weightKg}kg to {latest.weightKg}kg over{" "}
        {points.length} measurements.
      </figcaption>
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Weight trend line chart, ${delta <= 0 ? "down" : "up"} ${Math.abs(delta)} kilograms`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ccfa3c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ccfa3c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* guide lines + y labels */}
          {guides.map((g, i) => (
            <g key={i}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={y(g)}
                y2={y(g)}
                stroke="#0b0d0b"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              <text
                x={PAD.l - 8}
                y={y(g) + 3}
                textAnchor="end"
                fontSize="10"
                fill="#5b635c"
              >
                {g.toFixed(1)}
              </text>
            </g>
          ))}

          {/* area fill */}
          <motion.path
            d={areaPath}
            fill={`url(#${gradId})`}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#0b0d0b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* points */}
          {points.map((p, i) => (
            <circle
              key={p.id}
              cx={x(i)}
              cy={y(p.weightKg)}
              r={i === points.length - 1 ? 5 : 3.5}
              fill={i === points.length - 1 ? "#ccfa3c" : "#ffffff"}
              stroke="#0b0d0b"
              strokeWidth="2"
            >
              <title>
                {new Date(p.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
                : {p.weightKg}kg
              </title>
            </circle>
          ))}
        </svg>
      </div>
    </figure>
  );
}
