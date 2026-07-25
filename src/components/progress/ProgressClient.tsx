"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Award,
  Dumbbell,
  Flame,
  RotateCcw,
  Timer,
  Trophy,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { useToast } from "@/components/ui/Toast";
import {
  loadProgress,
  saveProgress,
  resetProgress,
} from "@/lib/progressStore";
import {
  BADGES,
  computeStats,
  computeStreak,
  emptyProgress,
  unlockedBadgeIds,
  WORKOUT_TYPES,
  type ProgressState,
  type WorkoutEntry,
} from "@/data/progress";
import { StreakCard } from "./StreakCard";
import { LogWorkoutCard, type NewWorkout } from "./LogWorkoutCard";
import { MeasurementsCard } from "./MeasurementsCard";
import { BadgesGrid } from "./BadgesGrid";
import { Timeline } from "./Timeline";
import { SectionHeading, StatTile } from "./progress-ui";

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ProgressClient() {
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ProgressState>(emptyProgress);
  const [now, setNow] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    setState(loadProgress());
    setNow(Date.now());
    setMounted(true);
  }, []);

  // `now` is 0 until hydrated; derivations only render after `mounted`.
  const streak = useMemo(
    () => computeStreak(state.workouts, now),
    [state.workouts, now],
  );
  const stats = useMemo(
    () => computeStats(state.workouts, now),
    [state.workouts, now],
  );
  const unlocked = useMemo(
    () => unlockedBadgeIds(state, now),
    [state, now],
  );

  /** Persist + detect freshly unlocked badges and celebrate them. */
  const commit = (next: ProgressState) => {
    const nowTs = Date.now();
    const before = new Set(unlockedBadgeIds(state, nowTs));
    setState(next);
    setNow(nowTs);
    saveProgress(next);
    const after = unlockedBadgeIds(next, nowTs);
    after
      .filter((id) => !before.has(id))
      .forEach((id) => {
        const badge = BADGES.find((b) => b.id === id);
        if (badge) toast(`Badge unlocked: ${badge.label} 🏆`, "success");
      });
  };

  const handleLog = (w: NewWorkout) => {
    const entry: WorkoutEntry = {
      id: uid(),
      type: w.type,
      durationMin: w.durationMin,
      note: w.note,
      photo: w.photo,
      date: new Date().toISOString(),
    };
    commit({ ...state, workouts: [...state.workouts, entry] });
    toast(`${WORKOUT_TYPES[w.type].label} logged ✓`, "success");
  };

  const handleAddMeasurement = (weightKg: number) => {
    commit({
      ...state,
      measurements: [
        ...state.measurements,
        { id: uid(), date: new Date().toISOString(), weightKg },
      ],
    });
    toast("Weigh-in saved ✓", "success");
  };

  const handleDelete = (id: string) => {
    commit({
      ...state,
      workouts: state.workouts.filter((w) => w.id !== id),
    });
    toast("Workout removed", "info");
  };

  const handleReset = () => {
    const fresh = resetProgress();
    setState(fresh);
    setNow(Date.now());
    toast("Demo data reset", "info");
  };

  const focusLog = () => {
    logRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <header className="bg-cloud pt-28 pb-10 sm:pt-32 sm:pb-14">
        <Container>
          <Reveal>
            <Eyebrow>Progress tracker</Eyebrow>
            <h1 className="mt-4 font-display display-2 font-bold text-fg text-balance">
              Your progress, Aisha
            </h1>
            <p className="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">
              Every session, every rep, every sunrise run on Marina Walk — logged
              in one place. Build the streak, unlock the badges, and watch the
              transformation stack up.
            </p>
          </Reveal>
        </Container>
      </header>

      <Container className="pb-24">
        {!mounted ? (
          <ProgressSkeleton />
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {/* Streak */}
            <Reveal>
              <StreakCard streak={streak} />
            </Reveal>

            {/* Stat tiles */}
            <section aria-label="Your totals">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatTile
                  icon={<Dumbbell className="h-5 w-5" />}
                  label="Total workouts"
                  value={stats.totalWorkouts}
                  hint="Sessions logged all-time"
                />
                <StatTile
                  icon={<Timer className="h-5 w-5" />}
                  label="Total hours"
                  value={stats.totalHours}
                  decimals={1}
                  suffix=" h"
                  hint="Time under tension"
                />
                <StatTile
                  icon={<Flame className="h-5 w-5" />}
                  label="Calories (est.)"
                  value={stats.totalCalories}
                  hint="Rough burn estimate"
                />
                <StatTile
                  icon={<Activity className="h-5 w-5" />}
                  label="This month"
                  value={stats.sessionsThisMonth}
                  hint="Sessions this month"
                />
              </div>
            </section>

            {/* Log + Measurements */}
            <section className="grid gap-6 lg:grid-cols-2">
              <div ref={logRef} className="scroll-mt-28">
                <LogWorkoutCard onLog={handleLog} />
              </div>
              <MeasurementsCard
                measurements={state.measurements}
                onAdd={handleAddMeasurement}
              />
            </section>

            {/* Badges */}
            <section aria-label="Achievements">
              <SectionHeading
                icon={<Award className="h-5 w-5" />}
                title="Badges & achievements"
                description="Milestones unlock automatically as you train. How many can you collect?"
              />
              <div className="mt-6">
                <BadgesGrid unlocked={unlocked} />
              </div>
            </section>

            {/* Timeline */}
            <section aria-label="Workout timeline">
              <SectionHeading
                icon={<Trophy className="h-5 w-5" />}
                title="Your transformation"
                description="A running log of every session — newest first."
              />
              <div className="mt-6">
                <Timeline
                  workouts={state.workouts}
                  now={now}
                  onDelete={handleDelete}
                  onFocusLog={focusLog}
                />
              </div>
            </section>

            {/* Reset */}
            <div className="border-t border-ink-900/8 pt-8 text-center">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Reset demo data
              </button>
              <p className="mx-auto mt-2 max-w-md text-xs text-fg-muted/70">
                This is a frontend demo — your progress is saved only in this
                browser (localStorage).
              </p>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

/* ---------- Skeleton (pre-hydration, CLS-safe) ---------- */
function ProgressSkeleton() {
  return (
    <div className="space-y-12" aria-hidden>
      <div className="skeleton h-56 rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-36 rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="skeleton h-96 rounded-3xl" />
        <div className="skeleton h-96 rounded-3xl" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
