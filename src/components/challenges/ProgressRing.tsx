"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number; // completed count
  total: number; // total count
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}

/** Circular progress indicator — hardcoded lime + line hex per design tokens. */
export function ProgressRing({
  value,
  total,
  size = 120,
  stroke = 10,
  label,
  className,
}: ProgressRingProps) {
  const pct = total > 0 ? Math.min(1, value / total) : 0;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="img"
      aria-label={`${value} of ${total} days complete`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e2e6dc"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#ccfa3c"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-2xl font-bold leading-none text-fg">
          {value}
          <span className="text-fg-muted">/{total}</span>
        </span>
        {label && (
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
