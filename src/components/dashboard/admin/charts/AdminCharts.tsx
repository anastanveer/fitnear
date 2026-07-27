"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Point, Slice } from "@/data/adminDashboard";

/* ---------- helpers ---------- */
interface XY {
  x: number;
  y: number;
}

function smoothPath(pts: XY[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function niceMax(max: number): number {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

const W = 760;
const H = 300;

/* ============================================================
   Bar chart — bookings per week
   ============================================================ */
export function AdminBarChart({
  data,
  ariaLabel,
  color = "#ccfa3c",
}: {
  data: Point[];
  ariaLabel: string;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const PAD = { top: 24, right: 16, bottom: 40, left: 48 };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={ariaLabel}
    >
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

      {bars.map((b, i) => (
        <g
          key={i}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          <motion.rect
            x={b.x}
            width={b.w}
            rx={7}
            fill={active === i ? "#0b0d0b" : color}
            initial={reduce ? { y: b.y, height: b.h } : { y: baseY, height: 0 }}
            animate={{ y: b.y, height: b.h }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          {active === i && (
            <text
              x={b.cx}
              y={b.y - 10}
              textAnchor="middle"
              className="fill-fg"
              fontSize="12"
              fontWeight={700}
            >
              {b.d.value}
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

/* ============================================================
   Area chart — revenue trend
   ============================================================ */
export function AdminAreaChart({
  data,
  ariaLabel,
  valueFormat = (v: number) => String(v),
  color = "#ccfa3c",
  stroke = "#a9dd12",
}: {
  data: Point[];
  ariaLabel: string;
  valueFormat?: (v: number) => string;
  color?: string;
  stroke?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number | null>(null);
  const PAD = { top: 24, right: 20, bottom: 40, left: 56 };

  const { pts, line, area, gridY } = useMemo(() => {
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const max = niceMax(Math.max(...data.map((d) => d.value)));
    const pts: XY[] = data.map((d, i) => ({
      x:
        PAD.left +
        (data.length === 1 ? innerW / 2 : (innerW * i) / (data.length - 1)),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={`aarea-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

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

      <motion.path
        d={area}
        fill={`url(#aarea-${uid})`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
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
            transition={{
              delay: 0.6 + i * 0.06,
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          {active === i && (
            <g>
              <rect
                x={Math.min(Math.max(p.x - 44, 4), W - 92)}
                y={p.y - 40}
                width={88}
                height={26}
                rx={8}
                fill="#0b0d0b"
              />
              <text
                x={Math.min(Math.max(p.x, 48), W - 48)}
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

/* ============================================================
   Donut chart — payment-status split
   ============================================================ */
const SIZE = 220;
const R = 82;
const D_STROKE = 30;
const C = 2 * Math.PI * R;
const CENTER = SIZE / 2;

export function AdminDonutChart({
  data,
  centerLabel,
  centerSub,
  ariaLabel,
}: {
  data: Slice[];
  centerLabel?: string;
  centerSub?: string;
  ariaLabel: string;
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
      className="h-auto w-full max-w-[220px]"
      style={{ aspectRatio: "1 / 1" }}
      role="img"
      aria-label={ariaLabel}
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={R}
        fill="none"
        stroke="#0b0d0b"
        strokeOpacity={0.05}
        strokeWidth={D_STROKE}
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
            strokeWidth={active === i ? D_STROKE + 6 : D_STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${s.frac * C} ${C}`}
            transform={`rotate(${s.offset * 360} ${CENTER} ${CENTER})`}
            initial={reduce ? false : { strokeDashoffset: s.frac * C }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </g>

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
