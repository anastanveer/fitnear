import { trainers } from "@/data/trainers";
import type { Trainer, SportSlug, TrainingFormat, Gender } from "./types";

export interface MatchAnswers {
  goal?: SportSlug;
  area?: string;
  budget?: number; // max hourly
  gender?: Gender | "any";
  format?: TrainingFormat;
  availability?: "today" | "week" | "flexible";
}

export interface MatchResult {
  trainer: Trainer;
  score: number;
  reasons: string[];
}

/** Ranks trainers against the concierge's collected answers, with reasons. */
export function matchTrainers(answers: MatchAnswers): MatchResult[] {
  return trainers
    .map((t) => {
      let score = 0;
      const reasons: string[] = [];

      if (answers.goal) {
        if (t.primarySport === answers.goal) {
          score += 6;
          reasons.push(`specialises in your goal`);
        } else if (t.sports.includes(answers.goal)) {
          score += 3;
          reasons.push(`covers your goal`);
        }
      }
      if (answers.area) {
        const q = answers.area.toLowerCase();
        if (
          t.area.toLowerCase().includes(q) ||
          t.serviceAreas.some((a) => a.toLowerCase().includes(q))
        ) {
          score += 4;
          reasons.push(`works in ${answers.area}`);
        }
      }
      if (answers.format && t.formats.includes(answers.format)) {
        score += 3;
        reasons.push(`offers ${answers.format} sessions`);
      }
      if (answers.budget && t.hourlyRate <= answers.budget) {
        score += 2;
        reasons.push(`fits your budget`);
      }
      if (
        answers.gender &&
        answers.gender !== "any" &&
        t.gender === answers.gender
      ) {
        score += 2;
      }
      if (answers.availability === "today" && t.availableToday) {
        score += 3;
        reasons.push(`available today`);
      }
      score += (t.rating - 4) * 1.5;
      if (t.verified) score += 0.5;
      if (t.featured) score += 0.5;

      return { trainer: t, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

/** A simple 3-step starter plan tailored to the chosen goal. */
export function starterPlan(goal?: SportSlug): string[] {
  const plans: Partial<Record<SportSlug, string[]>> = {
    "personal-training": [
      "3 sessions/week — full-body strength + short conditioning finishers",
      "Simple nutrition: protein at every meal, a 300–400 kcal daily deficit",
      "Track weight weekly and one progress photo — adjust every 2 weeks",
    ],
    strength: [
      "4 sessions/week — upper/lower split, focus on squat, hinge, press, pull",
      "Progressive overload: add reps or a little weight each week",
      "Eat at maintenance or a slight surplus with 1.6–2g protein/kg",
    ],
    swimming: [
      "2 sessions/week — technique first (breathing, body position), then distance",
      "Land drills for shoulder mobility on off days",
      "Build to a continuous 400m over 6 weeks",
    ],
    boxing: [
      "2–3 sessions/week — footwork, guard, and the jab-cross before combos",
      "Add 2 conditioning rounds (skipping / bag intervals) each session",
      "Film one round weekly to check your form",
    ],
    yoga: [
      "3 sessions/week — mobility flow + breathwork, 20–40 minutes",
      "Daily 5-minute morning stretch for hips and spine",
      "Progress toward one target pose over the month",
    ],
    football: [
      "2 sessions/week — first touch, dribbling and finishing drills",
      "1 agility/conditioning session for match fitness",
      "Small-sided games to apply skills under pressure",
    ],
    running: [
      "3 runs/week — easy pace, one interval session, one longer run",
      "Strength + mobility twice a week to prevent injury",
      "Increase weekly distance by no more than 10%",
    ],
    tennis: [
      "2 sessions/week — groundstroke consistency, then serve mechanics",
      "Footwork ladder drills for court movement",
      "One practice match weekly to apply it",
    ],
  };
  return (
    plans[goal ?? "personal-training"] ?? plans["personal-training"]!
  );
}
