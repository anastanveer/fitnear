import {
  emptyProgress,
  seedProgress,
  type ProgressState,
  type WorkoutEntry,
  type Measurement,
} from "@/data/progress";

/* ============================================================
   localStorage-backed "database" for the Progress Tracker.
   SSR-safe: returns defaults when window is unavailable and
   swallows quota / parse errors so the UI never crashes.
   ============================================================ */

const KEY = "fitnear_progress_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Basic runtime validation so a corrupt blob can't break the app. */
function sanitize(raw: unknown): ProgressState | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Partial<ProgressState>;
  if (!Array.isArray(obj.workouts) || !Array.isArray(obj.measurements)) {
    return null;
  }
  const workouts = obj.workouts.filter(
    (w): w is WorkoutEntry =>
      !!w &&
      typeof w.id === "string" &&
      typeof w.type === "string" &&
      typeof w.durationMin === "number" &&
      typeof w.date === "string",
  );
  const measurements = obj.measurements.filter(
    (m): m is Measurement =>
      !!m &&
      typeof m.id === "string" &&
      typeof m.date === "string" &&
      typeof m.weightKg === "number",
  );
  return { workouts, measurements };
}

/**
 * Load persisted progress. On first ever visit (no stored blob), seeds
 * realistic demo data and persists it. SSR returns empty defaults.
 */
export function loadProgress(): ProgressState {
  if (!isBrowser()) return emptyProgress();
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored) {
      const parsed = sanitize(JSON.parse(stored));
      if (parsed) return parsed;
    }
  } catch {
    /* ignore parse / access errors, fall through to seed */
  }
  const seeded = seedProgress(Date.now());
  saveProgress(seeded);
  return seeded;
}

/** Persist the full state. No-op on the server; safe on quota errors. */
export function saveProgress(state: ProgressState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full / disabled — keep working from in-memory state */
  }
}

/** Clear stored data and return a fresh seeded state. */
export function resetProgress(): ProgressState {
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  const seeded = seedProgress(Date.now());
  saveProgress(seeded);
  return seeded;
}
