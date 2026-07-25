import type { Trainer } from "./types";

/** Approximate real coordinates for the UAE areas used across FitNear. */
export const AREA_GEO: Record<string, [number, number]> = {
  "Dubai Marina": [25.0805, 55.1403],
  JBR: [25.0785, 55.133],
  "Business Bay": [25.1857, 55.262],
  "Downtown Dubai": [25.195, 55.274],
  "Al Barsha": [25.113, 55.196],
  "Dubai Hills": [25.103, 55.247],
  Jumeirah: [25.211, 55.256],
  JVC: [25.056, 55.208],
  "Abu Dhabi": [24.4539, 54.3773],
};

/** Central point used as the viewer's "you are here" reference (Dubai). */
export const YOU_HERE: [number, number] = [25.13, 55.21];

function hash(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic real lat/lng for a trainer, jittered so markers don't overlap. */
export function trainerLatLng(trainer: Trainer): [number, number] {
  const base = AREA_GEO[trainer.area] ?? YOU_HERE;
  const seed = hash(trainer.id);
  const jLat = (((seed & 0xffff) / 0xffff) - 0.5) * 0.012;
  const jLng = ((((seed >> 16) & 0xffff) / 0xffff) - 0.5) * 0.012;
  return [base[0] + jLat, base[1] + jLng];
}

/** Deep link that opens the location in Google Maps (web or native app). */
export function googleMapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

/** Nearest known FitNear area to a real coordinate (used by "use my location"). */
export function nearestArea(lat: number, lng: number): string {
  let best = "Dubai Marina";
  let min = Infinity;
  for (const [name, [aLat, aLng]] of Object.entries(AREA_GEO)) {
    const d = (aLat - lat) ** 2 + (aLng - lng) ** 2;
    if (d < min) {
      min = d;
      best = name;
    }
  }
  return best;
}
