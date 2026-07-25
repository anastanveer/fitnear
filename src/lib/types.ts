export type SportSlug =
  | "personal-training"
  | "swimming"
  | "boxing"
  | "yoga"
  | "football"
  | "tennis"
  | "running"
  | "strength";

export type TrainingFormat = "home" | "gym" | "outdoor" | "online";

export type Gender = "male" | "female";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string; // ISO
  text: string;
  goal?: string;
}

export interface Trainer {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  avatar: string;
  cover: string;
  gallery: string[];
  videoIntro?: string;
  headline: string;
  bio: string;
  sports: SportSlug[];
  primarySport: SportSlug;
  specializations: string[];
  certifications: string[];
  languages: string[];
  experienceYears: number;
  area: string; // primary UAE area
  serviceAreas: string[];
  city: "Dubai" | "Abu Dhabi";
  coords: { x: number; y: number }; // normalized 0..1 on stylized map
  distanceKm: number;
  hourlyRate: number; // AED
  rating: number;
  reviewCount: number;
  formats: TrainingFormat[];
  verified: boolean;
  featured: boolean;
  availableToday: boolean;
  responseTime: string;
  sessionsCompleted: number;
  reviews: Review[];
}

export interface SportCategory {
  slug: SportSlug;
  name: string;
  tagline: string;
  icon: string; // lucide name
  trainerCount: number;
  accent: string;
  image: string;
}
