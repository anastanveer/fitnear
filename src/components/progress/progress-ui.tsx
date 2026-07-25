"use client";

import { cn } from "@/lib/utils";
import { Counter } from "@/components/shared/Counter";

/* ============================================================
   Small presentational building blocks for the Progress page.
   ============================================================ */

/** Section heading with an icon chip, used above each block. */
export function SectionHeading({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-700">
          {icon}
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-xl text-sm text-fg-muted">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

/** Animated stat tile (count-up). */
export function StatTile({
  icon,
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-5 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
          {label}
        </span>
        <span className="text-lime-600" aria-hidden>
          {icon}
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">
        <Counter
          to={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      {hint && <p className="mt-1 text-xs text-fg-muted">{hint}</p>}
    </div>
  );
}

/* ---------- Formatting helpers ---------- */

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} • ${time}`;
}

export function relativeDay(iso: string, now: number): string {
  const day = 86_400_000;
  const then = new Date(iso);
  const a = new Date(then.getFullYear(), then.getMonth(), then.getDate());
  const nd = new Date(now);
  const b = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
  const diff = Math.round((b.getTime() - a.getTime()) / day);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return then.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
