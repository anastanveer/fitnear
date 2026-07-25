import type { SportSlug } from "@/lib/types";

/* ============================================================
   Mock data for the FitNear Client Dashboard (demo, UAE).
   Static frontend-only fixtures — no backend.
   Trainer references use slugs from `@/data/trainers`.
   ============================================================ */

export interface ClientProfile {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  area: string;
  avatar: string;
  memberSince: string;
}

export const clientProfile: ClientProfile = {
  name: "Anas Tanveer",
  firstName: "Anas",
  email: "demo@gmail.com",
  phone: "+971 50 214 8890",
  area: "Dubai Marina",
  avatar: "https://i.pravatar.cc/160?img=68",
  memberSince: "March 2025",
};

export interface StatTile {
  key: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hint: string;
}

export const statTiles: StatTile[] = [
  {
    key: "upcoming",
    label: "Upcoming sessions",
    value: 3,
    hint: "Next one in 2 days",
  },
  {
    key: "saved",
    label: "Saved trainers",
    value: 6,
    hint: "Across 4 UAE areas",
  },
  {
    key: "spent",
    label: "Total spent",
    value: 7420,
    prefix: "AED ",
    hint: "Since March 2025",
  },
  {
    key: "completed",
    label: "Sessions completed",
    value: 34,
    hint: "26 hours of coaching",
  },
];

/* --- Next session highlight --- */
export interface UpcomingSession {
  id: string;
  trainerSlug: string;
  dateLabel: string;
  timeLabel: string;
  durationMin: number;
  location: string;
  format: "home" | "gym" | "outdoor" | "online";
  price: number;
  isNext?: boolean;
}

export const upcomingSessions: UpcomingSession[] = [
  {
    id: "s-01",
    trainerSlug: "omar-al-rashid",
    dateLabel: "Sat, 26 Jul",
    timeLabel: "6:30 AM",
    durationMin: 60,
    location: "FitNear Gym, Dubai Marina",
    format: "gym",
    price: 220,
    isNext: true,
  },
  {
    id: "s-02",
    trainerSlug: "layla-hassan",
    dateLabel: "Mon, 28 Jul",
    timeLabel: "7:00 PM",
    durationMin: 75,
    location: "Home session, Jumeirah",
    format: "home",
    price: 180,
  },
  {
    id: "s-03",
    trainerSlug: "elena-petrova",
    dateLabel: "Thu, 31 Jul",
    timeLabel: "6:00 AM",
    durationMin: 45,
    location: "Marina Beach, JBR",
    format: "outdoor",
    price: 200,
  },
];

/* --- Recent searches --- */
export interface RecentSearch {
  id: string;
  area: string;
  sport: SportSlug | "all";
  sportLabel: string;
  whenLabel: string;
  resultCount: number;
}

export const recentSearches: RecentSearch[] = [
  {
    id: "q-01",
    area: "Dubai Marina",
    sport: "personal-training",
    sportLabel: "Personal Training",
    whenLabel: "Today",
    resultCount: 42,
  },
  {
    id: "q-02",
    area: "Jumeirah",
    sport: "yoga",
    sportLabel: "Yoga & Mobility",
    whenLabel: "Yesterday",
    resultCount: 18,
  },
  {
    id: "q-03",
    area: "Business Bay",
    sport: "boxing",
    sportLabel: "Boxing",
    whenLabel: "3 days ago",
    resultCount: 11,
  },
  {
    id: "q-04",
    area: "Downtown Dubai",
    sport: "all",
    sportLabel: "All sports",
    whenLabel: "Last week",
    resultCount: 67,
  },
  {
    id: "q-05",
    area: "Al Barsha",
    sport: "strength",
    sportLabel: "Strength",
    whenLabel: "Last week",
    resultCount: 9,
  },
];

/* --- Booking history --- */
export type BookingStatus = "completed" | "cancelled";

export interface BookingRecord {
  id: string;
  trainerSlug: string;
  dateLabel: string;
  sportLabel: string;
  location: string;
  price: number;
  status: BookingStatus;
}

export const bookingHistory: BookingRecord[] = [
  {
    id: "b-01",
    trainerSlug: "omar-al-rashid",
    dateLabel: "19 Jul 2026",
    sportLabel: "Personal Training",
    location: "FitNear Gym, Dubai Marina",
    price: 220,
    status: "completed",
  },
  {
    id: "b-02",
    trainerSlug: "elena-petrova",
    dateLabel: "15 Jul 2026",
    sportLabel: "Strength",
    location: "Marina Beach, JBR",
    price: 200,
    status: "completed",
  },
  {
    id: "b-03",
    trainerSlug: "layla-hassan",
    dateLabel: "12 Jul 2026",
    sportLabel: "Yoga & Mobility",
    location: "Home session, Jumeirah",
    price: 180,
    status: "completed",
  },
  {
    id: "b-04",
    trainerSlug: "marcus-obi",
    dateLabel: "08 Jul 2026",
    sportLabel: "Boxing",
    location: "Business Bay Studio",
    price: 210,
    status: "cancelled",
  },
  {
    id: "b-05",
    trainerSlug: "omar-al-rashid",
    dateLabel: "05 Jul 2026",
    sportLabel: "Personal Training",
    location: "FitNear Gym, Dubai Marina",
    price: 220,
    status: "completed",
  },
  {
    id: "b-06",
    trainerSlug: "daniel-costa",
    dateLabel: "28 Jun 2026",
    sportLabel: "Football",
    location: "Dubai Hills Pitch",
    price: 190,
    status: "completed",
  },
];

/* --- Reviews to submit --- */
export interface ReviewPrompt {
  id: string;
  trainerSlug: string;
  dateLabel: string;
  sportLabel: string;
}

export const reviewsToSubmit: ReviewPrompt[] = [
  {
    id: "rp-01",
    trainerSlug: "omar-al-rashid",
    dateLabel: "19 Jul 2026",
    sportLabel: "Personal Training",
  },
  {
    id: "rp-02",
    trainerSlug: "elena-petrova",
    dateLabel: "15 Jul 2026",
    sportLabel: "Strength",
  },
  {
    id: "rp-03",
    trainerSlug: "daniel-costa",
    dateLabel: "28 Jun 2026",
    sportLabel: "Football",
  },
];

/* --- Payment history --- */
export type PaymentStatus = "paid" | "refunded";

export interface PaymentRecord {
  id: string;
  invoice: string;
  trainerSlug: string;
  dateLabel: string;
  amount: number;
  method: string;
  status: PaymentStatus;
}

export const paymentHistory: PaymentRecord[] = [
  {
    id: "p-01",
    invoice: "FN-20726",
    trainerSlug: "omar-al-rashid",
    dateLabel: "19 Jul 2026",
    amount: 220,
    method: "Visa •••• 4242",
    status: "paid",
  },
  {
    id: "p-02",
    invoice: "FN-20698",
    trainerSlug: "elena-petrova",
    dateLabel: "15 Jul 2026",
    amount: 200,
    method: "Visa •••• 4242",
    status: "paid",
  },
  {
    id: "p-03",
    invoice: "FN-20655",
    trainerSlug: "layla-hassan",
    dateLabel: "12 Jul 2026",
    amount: 180,
    method: "Apple Pay",
    status: "paid",
  },
  {
    id: "p-04",
    invoice: "FN-20610",
    trainerSlug: "marcus-obi",
    dateLabel: "08 Jul 2026",
    amount: 210,
    method: "Visa •••• 4242",
    status: "refunded",
  },
  {
    id: "p-05",
    invoice: "FN-20588",
    trainerSlug: "omar-al-rashid",
    dateLabel: "05 Jul 2026",
    amount: 220,
    method: "Mastercard •••• 8817",
    status: "paid",
  },
];

/* --- Saved & recommended trainers (slugs) --- */
export const savedTrainerSlugs = [
  "omar-al-rashid",
  "layla-hassan",
  "elena-petrova",
  "marcus-obi",
  "sofia-rahman",
  "yasmin-farouk",
];

export const recommendedTrainerSlugs = [
  "daniel-costa",
  "raj-mehta",
  "carlos-nunez",
  "amira-khalil",
  "viktor-ivanov",
  "hassan-tariq",
];

/* --- Messages (2-pane, static) --- */
export interface Conversation {
  id: string;
  trainerSlug: string;
  preview: string;
  timeLabel: string;
  unread: number;
}

export const conversations: Conversation[] = [
  {
    id: "c-01",
    trainerSlug: "omar-al-rashid",
    preview: "Perfect — see you Saturday at 6:30. Bring your lifting shoes.",
    timeLabel: "9:14 AM",
    unread: 1,
  },
  {
    id: "c-02",
    trainerSlug: "layla-hassan",
    preview: "I've adjusted Monday's flow to focus on your lower back.",
    timeLabel: "Yesterday",
    unread: 0,
  },
  {
    id: "c-03",
    trainerSlug: "elena-petrova",
    preview: "Great work this morning! Your split times are improving.",
    timeLabel: "Tue",
    unread: 0,
  },
  {
    id: "c-04",
    trainerSlug: "marcus-obi",
    preview: "No worries about the cancellation — refund is on its way.",
    timeLabel: "8 Jul",
    unread: 0,
  },
];

export interface ChatMessage {
  id: string;
  from: "client" | "trainer";
  text: string;
  timeLabel: string;
}

/** Keyed by conversation id. */
export const chatThreads: Record<string, ChatMessage[]> = {
  "c-01": [
    {
      id: "m1",
      from: "trainer",
      text: "Morning Aisha! Ready for Saturday's session? We're building on last week's deadlift progression.",
      timeLabel: "8:52 AM",
    },
    {
      id: "m2",
      from: "client",
      text: "Yes! My legs finally recovered 😅 Should I eat before or come fasted?",
      timeLabel: "9:03 AM",
    },
    {
      id: "m3",
      from: "trainer",
      text: "A light breakfast an hour before is ideal — a banana and some coffee works great.",
      timeLabel: "9:08 AM",
    },
    {
      id: "m4",
      from: "client",
      text: "Got it. See you at the Marina gym at 6:30.",
      timeLabel: "9:12 AM",
    },
    {
      id: "m5",
      from: "trainer",
      text: "Perfect — see you Saturday at 6:30. Bring your lifting shoes.",
      timeLabel: "9:14 AM",
    },
  ],
  "c-02": [
    {
      id: "m1",
      from: "client",
      text: "Hi Layla, my lower back has been tight after long work days.",
      timeLabel: "6:40 PM",
    },
    {
      id: "m2",
      from: "trainer",
      text: "I've adjusted Monday's flow to focus on your lower back.",
      timeLabel: "6:58 PM",
    },
  ],
  "c-03": [
    {
      id: "m1",
      from: "trainer",
      text: "Great work this morning! Your split times are improving.",
      timeLabel: "Tue 7:20 AM",
    },
  ],
  "c-04": [
    {
      id: "m1",
      from: "client",
      text: "So sorry Marcus, something came up and I had to cancel.",
      timeLabel: "8 Jul",
    },
    {
      id: "m2",
      from: "trainer",
      text: "No worries about the cancellation — refund is on its way.",
      timeLabel: "8 Jul",
    },
  ],
};

/* --- Profile preference toggles --- */
export interface PreferenceToggle {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const preferenceToggles: PreferenceToggle[] = [
  {
    key: "session-reminders",
    label: "Session reminders",
    description: "Get a WhatsApp nudge 2 hours before each session.",
    enabled: true,
  },
  {
    key: "new-trainers",
    label: "New trainers near me",
    description: "Alerts when top-rated trainers join in your area.",
    enabled: true,
  },
  {
    key: "promotions",
    label: "Offers & promotions",
    description: "Occasional package deals and seasonal discounts.",
    enabled: false,
  },
  {
    key: "female-only",
    label: "Female trainers only",
    description: "Prioritise female trainers in your search results.",
    enabled: false,
  },
];
