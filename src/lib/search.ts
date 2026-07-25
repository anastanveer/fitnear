import type { Trainer, SportSlug, TrainingFormat, Gender } from "./types";

export type SortKey = "distance" | "rating" | "price-low" | "price-high";

export interface Filters {
  area: string;
  sport: SportSlug | "all";
  gender: Gender | "any";
  maxPrice: number;
  maxDistance: number;
  minRating: number;
  formats: TrainingFormat[];
  verifiedOnly: boolean;
  availableToday: boolean;
  sort: SortKey;
}

export const PRICE_MAX = 250;
export const DISTANCE_MAX = 15;

export const defaultFilters: Filters = {
  area: "",
  sport: "all",
  gender: "any",
  maxPrice: PRICE_MAX,
  maxDistance: DISTANCE_MAX,
  minRating: 0,
  formats: [],
  verifiedOnly: false,
  availableToday: false,
  sort: "distance",
};

export function applyFilters(trainers: Trainer[], f: Filters): Trainer[] {
  const result = trainers.filter((t) => {
    if (f.sport !== "all" && !t.sports.includes(f.sport)) return false;
    if (f.gender !== "any" && t.gender !== f.gender) return false;
    if (t.hourlyRate > f.maxPrice) return false;
    if (t.distanceKm > f.maxDistance) return false;
    if (t.rating < f.minRating) return false;
    if (f.verifiedOnly && !t.verified) return false;
    if (f.availableToday && !t.availableToday) return false;
    if (f.formats.length && !f.formats.some((fmt) => t.formats.includes(fmt)))
      return false;
    if (f.area) {
      const q = f.area.toLowerCase();
      const inArea =
        t.area.toLowerCase().includes(q) ||
        t.serviceAreas.some((a) => a.toLowerCase().includes(q)) ||
        t.city.toLowerCase().includes(q);
      if (!inArea) return false;
    }
    return true;
  });

  const bySort = (a: Trainer, b: Trainer) => {
    switch (f.sort) {
      case "rating":
        return b.rating - a.rating || a.distanceKm - b.distanceKm;
      case "price-low":
        return a.hourlyRate - b.hourlyRate;
      case "price-high":
        return b.hourlyRate - a.hourlyRate;
      default:
        return a.distanceKm - b.distanceKm;
    }
  };

  // Featured (paid) trainers always get priority placement at the top,
  // then everyone else is ordered by the chosen sort.
  return [...result].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || bySort(a, b),
  );
}

export function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.sport !== "all") n++;
  if (f.gender !== "any") n++;
  if (f.maxPrice < PRICE_MAX) n++;
  if (f.maxDistance < DISTANCE_MAX) n++;
  if (f.minRating > 0) n++;
  if (f.formats.length) n++;
  if (f.verifiedOnly) n++;
  if (f.availableToday) n++;
  return n;
}
