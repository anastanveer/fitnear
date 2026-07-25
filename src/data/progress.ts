import {
  Activity,
  Award,
  Calendar,
  Dumbbell,
  Flame,
  Medal,
  Scale,
  Target,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   FitNear — Progress Tracker data model, seed & derivations.
   Frontend-only demo. Persona: "Aisha" (Dubai Marina).
   All computations are pure; timestamps come from callers.
   ============================================================ */

export type WorkoutType =
  | "strength"
  | "cardio"
  | "hiit"
  | "yoga"
  | "boxing"
  | "mobility";

export interface WorkoutTypeMeta {
  value: WorkoutType;
  label: string;
  icon: LucideIcon;
  /** Rough kcal burned per minute — used for estimates only. */
  kcalPerMin: number;
  /** Tailwind classes for the type chip. */
  chip: string;
}

export const WORKOUT_TYPES: Record<WorkoutType, WorkoutTypeMeta> = {
  strength: {
    value: "strength",
    label: "Strength",
    icon: Dumbbell,
    kcalPerMin: 8,
    chip: "bg-lime-300/20 text-lime-700",
  },
  cardio: {
    value: "cardio",
    label: "Cardio / Run",
    icon: Activity,
    kcalPerMin: 10,
    chip: "bg-sky-500/12 text-sky-600",
  },
  hiit: {
    value: "hiit",
    label: "HIIT",
    icon: Flame,
    kcalPerMin: 12,
    chip: "bg-rose-500/12 text-rose-600",
  },
  yoga: {
    value: "yoga",
    label: "Yoga & Flow",
    icon: Target,
    kcalPerMin: 4,
    chip: "bg-violet-500/12 text-violet-600",
  },
  boxing: {
    value: "boxing",
    label: "Boxing",
    icon: Award,
    kcalPerMin: 11,
    chip: "bg-amber-500/15 text-amber-600",
  },
  mobility: {
    value: "mobility",
    label: "Mobility",
    icon: TrendingUp,
    kcalPerMin: 3,
    chip: "bg-emerald-500/12 text-emerald-600",
  },
};

export const WORKOUT_TYPE_OPTIONS = (
  Object.values(WORKOUT_TYPES) as WorkoutTypeMeta[]
).map((t) => ({ value: t.value, label: t.label }));

export interface WorkoutEntry {
  id: string;
  type: WorkoutType;
  durationMin: number;
  note?: string;
  /** dataURL (uploaded) or remote URL (seed). */
  photo?: string;
  /** ISO timestamp. */
  date: string;
}

export interface Measurement {
  id: string;
  /** ISO timestamp. */
  date: string;
  weightKg: number;
}

export interface ProgressState {
  workouts: WorkoutEntry[];
  measurements: Measurement[];
}

/* ---------- Empty / default ---------- */
export function emptyProgress(): ProgressState {
  return { workouts: [], measurements: [] };
}

/* ---------- Seed (called client-side when storage is empty) ----------
   `now` is passed in so this stays pure and SSR-safe. */
export function seedProgress(now: number): ProgressState {
  const day = 86_400_000;
  const at = (daysAgo: number, hour: number, min = 0) => {
    const d = new Date(now - daysAgo * day);
    d.setHours(hour, min, 0, 0);
    return d.toISOString();
  };

  const workouts: WorkoutEntry[] = [
    {
      id: "w-seed-1",
      type: "strength",
      durationMin: 60,
      note: "Deadlift PB — 92.5kg × 3. Omar pushed the last set.",
      photo:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      date: at(0, 6, 30),
    },
    {
      id: "w-seed-2",
      type: "cardio",
      durationMin: 35,
      note: "Marina Walk run — sunrise 5k, negative split.",
      date: at(1, 6, 10),
    },
    {
      id: "w-seed-3",
      type: "yoga",
      durationMin: 45,
      note: "Recovery flow with Layla, lots of hip openers.",
      date: at(2, 19, 0),
    },
    {
      id: "w-seed-4",
      type: "hiit",
      durationMin: 30,
      note: "JBR beach circuits — sled pushes in the sand 🥵",
      photo:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      date: at(3, 7, 0),
    },
    {
      id: "w-seed-5",
      type: "strength",
      durationMin: 55,
      note: "Upper body — bench up to 45kg. Feeling stronger.",
      date: at(4, 6, 45),
    },
    {
      id: "w-seed-6",
      type: "boxing",
      durationMin: 50,
      note: "Pad work in Business Bay. Left hook is landing clean now.",
      date: at(5, 18, 30),
    },
    {
      id: "w-seed-7",
      type: "mobility",
      durationMin: 20,
      note: "Evening stretch + foam roll, lower back reset.",
      date: at(6, 21, 15),
    },
    {
      id: "w-seed-8",
      type: "cardio",
      durationMin: 40,
      note: "Cycle along Jumeirah — easy zone-2 spin.",
      date: at(7, 6, 20),
    },
    {
      id: "w-seed-9",
      type: "strength",
      durationMin: 60,
      note: "Leg day. Squats felt heavy but form held.",
      date: at(9, 6, 30),
    },
    {
      id: "w-seed-10",
      type: "yoga",
      durationMin: 40,
      note: "Slow flow at home before work.",
      date: at(11, 7, 0),
    },
  ];

  const measurements: Measurement[] = [
    { id: "m-seed-1", date: at(28, 8), weightKg: 68.4 },
    { id: "m-seed-2", date: at(21, 8), weightKg: 67.8 },
    { id: "m-seed-3", date: at(14, 8), weightKg: 67.1 },
    { id: "m-seed-4", date: at(7, 8), weightKg: 66.5 },
    { id: "m-seed-5", date: at(1, 8), weightKg: 66.2 },
  ];

  return { workouts, measurements };
}

/* ============================================================
   Pure derivations
   ============================================================ */

/** Local YYYY-MM-DD key for a date. */
export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export interface StreakInfo {
  current: number;
  longest: number;
  week: { key: string; dow: string; done: boolean; isToday: boolean }[];
}

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export function computeStreak(
  workouts: WorkoutEntry[],
  now: number,
): StreakInfo {
  const done = new Set(workouts.map((w) => dayKey(new Date(w.date))));
  const day = 86_400_000;
  const today = new Date(now);
  const todayKey = dayKey(today);

  // Current streak: count back from today (grace: if today has no log yet,
  // start from yesterday so an in-progress day doesn't reset the streak).
  let current = 0;
  let cursor = new Date(now);
  if (!done.has(todayKey)) cursor = new Date(now - day);
  while (done.has(dayKey(cursor))) {
    current += 1;
    cursor = new Date(cursor.getTime() - day);
  }

  // Longest streak across all logged days.
  const keys = Array.from(done).sort();
  let longest = 0;
  let run = 0;
  let prev: number | null = null;
  for (const k of keys) {
    const t = new Date(`${k}T00:00:00`).getTime();
    if (prev !== null && Math.round((t - prev) / day) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    prev = t;
    if (run > longest) longest = run;
  }
  longest = Math.max(longest, current);

  // Last 7 days (oldest → newest).
  const week: StreakInfo["week"] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * day);
    const k = dayKey(d);
    week.push({
      key: k,
      dow: DOW[d.getDay()],
      done: done.has(k),
      isToday: k === todayKey,
    });
  }

  return { current, longest, week };
}

export interface ProgressStats {
  totalWorkouts: number;
  totalHours: number;
  totalCalories: number;
  sessionsThisMonth: number;
}

export function computeStats(
  workouts: WorkoutEntry[],
  now: number,
): ProgressStats {
  const totalMinutes = workouts.reduce((s, w) => s + w.durationMin, 0);
  const totalCalories = workouts.reduce(
    (s, w) => s + w.durationMin * WORKOUT_TYPES[w.type].kcalPerMin,
    0,
  );
  const nowD = new Date(now);
  const thisMonth = workouts.filter((w) => {
    const d = new Date(w.date);
    return (
      d.getMonth() === nowD.getMonth() && d.getFullYear() === nowD.getFullYear()
    );
  }).length;

  return {
    totalWorkouts: workouts.length,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    totalCalories,
    sessionsThisMonth: thisMonth,
  };
}

/* ---------- Badges ---------- */
export interface BadgeDef {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  isUnlocked: (s: ProgressState, now: number) => boolean;
}

export const BADGES: BadgeDef[] = [
  {
    id: "first-workout",
    label: "First workout",
    description: "Logged your very first session.",
    icon: Award,
    isUnlocked: (s) => s.workouts.length >= 1,
  },
  {
    id: "week-streak",
    label: "7-day streak",
    description: "Trained 7 days in a row.",
    icon: Flame,
    isUnlocked: (s, now) => computeStreak(s.workouts, now).longest >= 7,
  },
  {
    id: "ten-sessions",
    label: "10 sessions",
    description: "Ten workouts in the books.",
    icon: Medal,
    isUnlocked: (s) => s.workouts.length >= 10,
  },
  {
    id: "early-bird",
    label: "Early bird",
    description: "Trained before 8 AM.",
    icon: Timer,
    isUnlocked: (s) =>
      s.workouts.some((w) => new Date(w.date).getHours() < 8),
  },
  {
    id: "ten-hours",
    label: "10 hours in",
    description: "Clocked 10+ hours of training.",
    icon: Target,
    isUnlocked: (s) =>
      s.workouts.reduce((t, w) => t + w.durationMin, 0) >= 600,
  },
  {
    id: "all-rounder",
    label: "All-rounder",
    description: "Trained 4 different disciplines.",
    icon: TrendingUp,
    isUnlocked: (s) => new Set(s.workouts.map((w) => w.type)).size >= 4,
  },
  {
    id: "monthly-grinder",
    label: "Monthly grinder",
    description: "12 sessions in a single month.",
    icon: Calendar,
    isUnlocked: (s, now) => computeStats(s.workouts, now).sessionsThisMonth >= 12,
  },
  {
    id: "shape-tracker",
    label: "Shape tracker",
    description: "Logged your weight 3 times.",
    icon: Scale,
    isUnlocked: (s) => s.measurements.length >= 3,
  },
];

export function unlockedBadgeIds(s: ProgressState, now: number): string[] {
  return BADGES.filter((b) => b.isUnlocked(s, now)).map((b) => b.id);
}
