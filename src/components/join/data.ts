import type { SportSlug } from "@/lib/types";

/** Specialization chips offered per sport during onboarding. */
export const specializationsBySport: Record<SportSlug, string[]> = {
  "personal-training": [
    "Fat loss",
    "Body recomposition",
    "Strength foundations",
    "Nutrition coaching",
    "HIIT & conditioning",
    "Functional training",
    "Post-injury return",
    "Habit coaching",
  ],
  swimming: [
    "Learn to swim",
    "Stroke correction",
    "Open water",
    "Triathlon prep",
    "Kids' swimming",
    "Competitive squad",
    "Adult beginners",
    "Water confidence",
  ],
  boxing: [
    "Fitness boxing",
    "Technical sparring",
    "Footwork",
    "HIIT conditioning",
    "Pad work",
    "White-collar prep",
    "Defence & guard",
    "Kids' boxing",
  ],
  yoga: [
    "Vinyasa flow",
    "Mobility",
    "Breathwork",
    "Prenatal yoga",
    "Hatha",
    "Restorative & recovery",
    "Desk-body release",
    "Meditation",
  ],
  football: [
    "Youth development",
    "Technical skills",
    "Finishing",
    "Agility & speed",
    "Goalkeeping",
    "Small-sided games",
    "First touch",
    "Game intelligence",
  ],
  tennis: [
    "Groundstrokes",
    "Serve mechanics",
    "Match strategy",
    "Junior development",
    "Cardio tennis",
    "Doubles play",
    "Footwork & movement",
    "Adult beginners",
  ],
  running: [
    "Endurance",
    "Running form",
    "Race prep",
    "Injury prevention",
    "Sprint mechanics",
    "Trail running",
    "Couch to 5k",
    "Marathon coaching",
  ],
  strength: [
    "Powerlifting",
    "Programming",
    "Competition prep",
    "Hypertrophy",
    "Olympic lifting",
    "Technique refinement",
    "Strength for sport",
    "Women's strength",
  ],
};

export interface AreaGroup {
  city: "Dubai" | "Abu Dhabi";
  areas: string[];
}

/** UAE service areas grouped by emirate. */
export const areaGroups: AreaGroup[] = [
  {
    city: "Dubai",
    areas: [
      "Dubai Marina",
      "JBR",
      "Palm Jumeirah",
      "Jumeirah",
      "Downtown Dubai",
      "Business Bay",
      "DIFC",
      "Al Barsha",
      "Dubai Hills",
      "JVC",
      "Al Quoz",
      "Deira",
    ],
  },
  {
    city: "Abu Dhabi",
    areas: [
      "Al Reem Island",
      "Khalifa City",
      "Yas Island",
      "Saadiyat Island",
      "Al Raha",
      "Corniche",
      "Al Bateen",
      "Mohammed Bin Zayed City",
    ],
  },
];

/** Flat list of every selectable service area. */
export const allAreas: string[] = areaGroups.flatMap((g) => g.areas);

export const cityOptions = [
  { value: "Dubai", label: "Dubai" },
  { value: "Abu Dhabi", label: "Abu Dhabi" },
];

export const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

/** Common accreditations recognised in the UAE fitness market. */
export const certificationOptions = [
  "REPs UAE Level 2",
  "REPs UAE Level 3",
  "NASM Certified Personal Trainer",
  "ACE Certified",
  "ISSA Certified",
  "Precision Nutrition L1",
  "CrossFit Level 1",
  "First Aid & CPR",
  "ASCA Swim Coach",
  "UEFA Coaching Licence",
  "PTR Tennis Certified",
  "Pre/Postnatal Certified",
];

export interface WeekDay {
  key: string;
  short: string;
  full: string;
}

export const weekDays: WeekDay[] = [
  { key: "mon", short: "Mon", full: "Monday" },
  { key: "tue", short: "Tue", full: "Tuesday" },
  { key: "wed", short: "Wed", full: "Wednesday" },
  { key: "thu", short: "Thu", full: "Thursday" },
  { key: "fri", short: "Fri", full: "Friday" },
  { key: "sat", short: "Sat", full: "Saturday" },
  { key: "sun", short: "Sun", full: "Sunday" },
];

export const timePreferenceOptions = [
  { value: "early", label: "Early morning · 5–8 AM" },
  { value: "morning", label: "Morning · 8 AM–12 PM" },
  { value: "afternoon", label: "Afternoon · 12–4 PM" },
  { value: "evening", label: "Evening · 4–8 PM" },
  { value: "late", label: "Late evening · 8–11 PM" },
  { value: "flexible", label: "Flexible — I fit the client" },
];

export const timePreferenceLabel = (value: string) =>
  timePreferenceOptions.find((t) => t.value === value)?.label ?? "";
