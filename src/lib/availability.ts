/** Deterministic mock weekly availability derived from a trainer id (no RNG). */

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const SLOTS = ["06:00", "08:00", "10:00", "16:00", "18:00", "20:00"] as const;

export type Day = (typeof DAYS)[number];
export type Slot = (typeof SLOTS)[number];

function hashSeed(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Returns a set of "Day-Slot" keys that are available for this trainer. */
export function availabilityFor(id: string): Set<string> {
  const seed = hashSeed(id);
  const set = new Set<string>();
  DAYS.forEach((day, di) => {
    SLOTS.forEach((slot, si) => {
      // pseudo-random but stable pattern
      const v = (seed >> ((di * 6 + si) % 30)) & 1;
      const alt = (di * 7 + si * 13 + (seed % 5)) % 3;
      if (v === 1 && alt !== 0) set.add(`${day}-${slot}`);
    });
  });
  // guarantee at least a few open slots
  if (set.size < 5) {
    set.add("Mon-08:00");
    set.add("Wed-18:00");
    set.add("Sat-10:00");
    set.add("Sun-16:00");
  }
  return set;
}
