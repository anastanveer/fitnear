"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Timer, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ClientEmptyState } from "@/components/dashboard/shared/client-ui";
import { WORKOUT_TYPES, type WorkoutEntry } from "@/data/progress";
import { formatDateTime, relativeDay } from "./progress-ui";

export function Timeline({
  workouts,
  now,
  onDelete,
  onFocusLog,
}: {
  workouts: WorkoutEntry[];
  now: number;
  onDelete: (id: string) => void;
  onFocusLog: () => void;
}) {
  const reduce = useReducedMotion();

  const sorted = [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (sorted.length === 0) {
    return (
      <ClientEmptyState
        icon={<Timer className="h-6 w-6" />}
        title="No workouts yet"
        description="Your transformation starts with a single session. Log your first workout to begin the story."
        action={
          <Button variant="primary" onClick={onFocusLog}>
            Log your first workout
          </Button>
        }
      />
    );
  }

  return (
    <ol className="relative space-y-4 border-l border-ink-900/10 pl-6">
      <AnimatePresence initial={false}>
        {sorted.map((w) => {
          const meta = WORKOUT_TYPES[w.type];
          const Icon = meta.icon;
          const kcal = w.durationMin * meta.kcalPerMin;
          return (
            <motion.li
              key={w.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* timeline node */}
              <span
                className="absolute -left-[1.9rem] top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-lime-300 shadow-sm"
                aria-hidden
              />
              <article className="group flex gap-4 rounded-3xl border border-ink-900/8 bg-white p-4 sm:p-5">
                {w.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={w.photo}
                    alt={`${meta.label} session`}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl",
                          meta.chip,
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="font-display text-base font-bold text-fg">
                          {meta.label}
                        </p>
                        <p className="text-xs text-fg-muted">
                          {relativeDay(w.date, now)} · {formatDateTime(w.date)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDelete(w.id)}
                      aria-label={`Delete ${meta.label} workout`}
                      className="shrink-0 rounded-lg p-1.5 text-fg-muted/50 transition-colors hover:bg-rose-500/10 hover:text-rose-600 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {w.note && (
                    <p className="mt-2 text-sm text-fg-muted">{w.note}</p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-fg">
                      <Timer className="h-3.5 w-3.5" aria-hidden />
                      {w.durationMin} min
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-300/20 px-2.5 py-1 text-xs font-semibold text-lime-700">
                      ~{kcal.toLocaleString("en-US")} kcal
                    </span>
                  </div>
                </div>
              </article>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ol>
  );
}
