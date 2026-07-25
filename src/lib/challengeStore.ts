/**
 * Client-side "database" for City Challenges.
 * Persists which challenges the user joined plus per-challenge check-in
 * count / streak / last check-in date to window.localStorage.
 * SSR-safe: every access is guarded and wrapped in try/catch.
 */

const STORAGE_KEY = "fitnear_challenges_v1";

export interface ChallengeProgress {
  joined: boolean;
  checkIns: number;
  streak: number;
  lastCheckIn: string | null; // local date string "YYYY-MM-DD"
}

/** Keyed by challenge slug. */
export type ChallengeState = Record<string, ChallengeProgress>;

export function emptyProgress(): ChallengeProgress {
  return { joined: false, checkIns: 0, streak: 0, lastCheckIn: null };
}

/** Local calendar date as YYYY-MM-DD (avoids UTC off-by-one). */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isYesterday(dateKey: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey === todayKey(yesterday);
}

export function loadChallenges(): ChallengeState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ChallengeState) : {};
  } catch {
    return {};
  }
}

export function saveChallenges(state: ChallengeState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — fail silently */
  }
}

export function resetChallenges(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Immutably toggle joined state for a challenge. */
export function toggleJoined(
  state: ChallengeState,
  slug: string,
): ChallengeState {
  const current = state[slug] ?? emptyProgress();
  return { ...state, [slug]: { ...current, joined: !current.joined } };
}

/** Whether the user can check in for this challenge today. */
export function canCheckIn(progress: ChallengeProgress): boolean {
  return progress.joined && progress.lastCheckIn !== todayKey();
}

/**
 * Record a check-in for today. No-op if already checked in today.
 * Continues the streak if the previous check-in was yesterday, else resets it.
 */
export function checkIn(
  state: ChallengeState,
  slug: string,
): ChallengeState {
  const current = state[slug] ?? emptyProgress();
  const today = todayKey();
  if (!current.joined || current.lastCheckIn === today) return state;

  const streak =
    current.lastCheckIn && isYesterday(current.lastCheckIn)
      ? current.streak + 1
      : 1;

  return {
    ...state,
    [slug]: {
      ...current,
      checkIns: current.checkIns + 1,
      streak,
      lastCheckIn: today,
    },
  };
}

/** Points a user has earned for a challenge (drives leaderboard placement). */
export function userPoints(
  progress: ChallengeProgress,
  pointsPerCheckIn: number,
): number {
  return progress.checkIns * pointsPerCheckIn + progress.streak * 5;
}
