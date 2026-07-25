"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/shared/Counter";
import type { StreakInfo } from "@/data/progress";

/* ============================================================
   Prominent streak card — dark surface with a lime glow.
   ============================================================ */

export function StreakCard({ streak }: { streak: StreakInfo }) {
  const reduce = useReducedMotion();
  const active = streak.current > 0;

  return (
    <div className="surface-dark grain relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 glow-lime opacity-60" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Current streak */}
        <div className="flex items-center gap-5">
          <motion.div
            className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-lime-300/12 sm:h-24 sm:w-24"
            animate={
              reduce || !active
                ? undefined
                : { scale: [1, 1.06, 1], rotate: [0, -3, 3, 0] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame
              className={cn(
                "h-10 w-10 sm:h-12 sm:w-12",
                active ? "text-lime-300" : "text-fg-invert-muted",
              )}
              aria-hidden
            />
            {active && !reduce && (
              <span className="absolute inset-0 rounded-3xl bg-lime-300/20 animate-ping-slow" />
            )}
          </motion.div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
              Current streak
            </p>
            <p className="mt-1 font-display text-5xl font-bold leading-none text-fg-invert sm:text-6xl">
              <Counter to={streak.current} />
              <span className="ml-2 text-2xl font-semibold text-fg-invert-muted sm:text-3xl">
                {streak.current === 1 ? "day" : "days"}
              </span>
            </p>
            <p className="mt-2 text-sm text-fg-invert-muted">
              {active
                ? "You're on fire — keep the chain alive 🔥"
                : "Log a session today to start a new streak."}
            </p>
          </div>
        </div>

        {/* Longest + week dots */}
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-lime-300" aria-hidden />
            <p className="text-sm text-fg-invert-muted">
              Longest streak
              <span className="ml-2 font-display text-lg font-bold text-fg-invert">
                {streak.longest} {streak.longest === 1 ? "day" : "days"}
              </span>
            </p>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-fg-invert-muted">
              This week
            </p>
            <ul className="flex items-center justify-between gap-2" aria-label="Last 7 days">
              {streak.week.map((d, i) => (
                <li key={d.key} className="flex flex-col items-center gap-1.5">
                  <motion.span
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold sm:h-9 sm:w-9",
                      d.done
                        ? "bg-lime-300 text-ink-900"
                        : "border border-white/12 bg-white/[0.03] text-fg-invert-muted",
                      d.isToday && "ring-2 ring-lime-300 ring-offset-2 ring-offset-ink-900",
                    )}
                    aria-label={`${d.dow} ${d.done ? "completed" : "missed"}${d.isToday ? ", today" : ""}`}
                  >
                    {d.done ? "✓" : ""}
                  </motion.span>
                  <span className="text-[10px] text-fg-invert-muted">{d.dow}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
