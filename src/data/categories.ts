import type { SportCategory } from "@/lib/types";

const ci = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: SportCategory[] = [
  {
    slug: "personal-training",
    name: "Personal Training",
    tagline: "1-on-1 coaching built around your goals",
    icon: "Dumbbell",
    trainerCount: 214,
    accent: "#ccfa3c",
    image: ci("1534438327276-14e5300c3a48"),
  },
  {
    slug: "swimming",
    name: "Swimming",
    tagline: "Learn, refine technique or train competitively",
    icon: "Waves",
    trainerCount: 86,
    accent: "#38bdf8",
    image: ci("1530549387789-4c1017266635"),
  },
  {
    slug: "boxing",
    name: "Boxing",
    tagline: "Fitness boxing, sparring and footwork",
    icon: "Sword",
    trainerCount: 74,
    accent: "#fb7185",
    image: ci("1549719386-74dfcbf7dbed"),
  },
  {
    slug: "yoga",
    name: "Yoga & Mobility",
    tagline: "Flexibility, breathwork and recovery",
    icon: "Flower2",
    trainerCount: 132,
    accent: "#a78bfa",
    image: ci("1518611012118-696072aa579a"),
  },
  {
    slug: "football",
    name: "Football",
    tagline: "Skills, agility and youth coaching",
    icon: "Goal",
    trainerCount: 58,
    accent: "#34d399",
    image: ci("1551958219-acbc608c6377"),
  },
  {
    slug: "tennis",
    name: "Tennis",
    tagline: "Groundstrokes, serve and match play",
    icon: "Trophy",
    trainerCount: 41,
    accent: "#fbbf24",
    image: ci("1622163642998-1ea32b0bbc67"),
  },
  {
    slug: "running",
    name: "Running",
    tagline: "Endurance, form and race prep",
    icon: "Footprints",
    trainerCount: 63,
    accent: "#f97316",
    image: ci("1461896836934-ffe607ba8211"),
  },
  {
    slug: "strength",
    name: "Strength",
    tagline: "Powerlifting, hypertrophy and conditioning",
    icon: "Flame",
    trainerCount: 97,
    accent: "#e879f9",
    image: ci("1517836357463-d25dfeac3438"),
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<string, SportCategory>;

export const goals = [
  { slug: "lose-weight", label: "Lose weight", icon: "TrendingDown" },
  { slug: "build-muscle", label: "Build muscle", icon: "Dumbbell" },
  { slug: "learn-swimming", label: "Learn swimming", icon: "Waves" },
  { slug: "boxing-fitness", label: "Boxing fitness", icon: "Sword" },
  { slug: "yoga-mobility", label: "Yoga & mobility", icon: "Flower2" },
  { slug: "football-coaching", label: "Football coaching", icon: "Goal" },
  { slug: "rehab", label: "Rehabilitation", icon: "HeartPulse" },
  { slug: "endurance", label: "Endurance & running", icon: "Footprints" },
];
