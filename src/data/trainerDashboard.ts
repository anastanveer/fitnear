import type { Review } from "@/lib/types";

/* ============================================================
   FitNear — Trainer dashboard mock data
   Persona: Omar Al Rashid · Strength coach · Dubai Marina
   Static demo data (frontend-only). All amounts in AED.
   ============================================================ */

export const trainerPersona = {
  slug: "omar-al-rashid",
  firstName: "Omar",
  name: "Omar Al Rashid",
  avatar:
    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80",
  role: "Strength & fat-loss coach",
  area: "Dubai Marina",
  memberSince: "2023",
};

/* ---------- Overview KPIs ---------- */
export interface Kpi {
  key: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number; // % vs last month
  icon: "eye" | "message" | "calendar" | "wallet";
}

export const kpis: Kpi[] = [
  { key: "views", label: "Profile views", value: 3248, delta: 18, icon: "eye" },
  { key: "enquiries", label: "Client enquiries", value: 47, delta: 9, icon: "message" },
  { key: "sessions", label: "Upcoming sessions", value: 12, delta: 4, icon: "calendar" },
  {
    key: "earnings",
    label: "Earnings this month",
    value: 18640,
    prefix: "AED ",
    delta: 23,
    icon: "wallet",
  },
];

/* ---------- Profile strength ---------- */
export const profileStrength = 85;

export interface ChecklistItem {
  label: string;
  done: boolean;
}

export const profileChecklist: ChecklistItem[] = [
  { label: "Add profile photo & cover", done: true },
  { label: "Verify identity & certifications", done: true },
  { label: "List specializations & languages", done: true },
  { label: "Upload a 60-second intro video", done: false },
  { label: "Add 3+ gallery photos", done: true },
  { label: "Set weekly availability", done: false },
];

/* ---------- Analytics: profile views (last 8 weeks) ---------- */
export interface Point {
  label: string;
  value: number;
}

export const viewsSeries: Point[] = [
  { label: "W1", value: 312 },
  { label: "W2", value: 388 },
  { label: "W3", value: 356 },
  { label: "W4", value: 470 },
  { label: "W5", value: 512 },
  { label: "W6", value: 604 },
  { label: "W7", value: 578 },
  { label: "W8", value: 712 },
];

/* ---------- Analytics: earnings per month (AED) ---------- */
export const earningsSeries: Point[] = [
  { label: "Jan", value: 11200 },
  { label: "Feb", value: 12850 },
  { label: "Mar", value: 13900 },
  { label: "Apr", value: 12400 },
  { label: "May", value: 15600 },
  { label: "Jun", value: 16750 },
  { label: "Jul", value: 18640 },
];

/* ---------- Analytics: enquiry sources (donut) ---------- */
export interface Slice {
  label: string;
  value: number;
  color: string;
}

export const enquirySources: Slice[] = [
  { label: "Search results", value: 46, color: "#ccfa3c" },
  { label: "Featured placement", value: 24, color: "#0b0d0b" },
  { label: "Profile share link", value: 18, color: "#a9dd12" },
  { label: "Category pages", value: 12, color: "#c9d1c4" },
];

/* ---------- Upcoming sessions ---------- */
export interface Session {
  id: string;
  client: string;
  avatar: string;
  date: string; // e.g. "Thu, 24 Jul"
  time: string; // e.g. "06:30 AM"
  type: string;
  format: "Gym" | "Home" | "Outdoor" | "Online";
  location: string;
  fee: number;
}

export const upcomingSessions: Session[] = [
  {
    id: "s1",
    client: "Sarah Mansour",
    avatar: "https://i.pravatar.cc/100?img=45",
    date: "Thu, 24 Jul",
    time: "06:30 AM",
    type: "Strength & conditioning",
    format: "Gym",
    location: "FitZone, Dubai Marina",
    fee: 220,
  },
  {
    id: "s2",
    client: "James Keller",
    avatar: "https://i.pravatar.cc/100?img=12",
    date: "Thu, 24 Jul",
    time: "07:00 PM",
    type: "Powerlifting technique",
    format: "Gym",
    location: "Warehouse Gym, JBR",
    fee: 250,
  },
  {
    id: "s3",
    client: "Aisha Al Zaabi",
    avatar: "https://i.pravatar.cc/100?img=32",
    date: "Fri, 25 Jul",
    time: "08:00 AM",
    type: "Fat-loss circuit",
    format: "Home",
    location: "Marina Gate 2 — client residence",
    fee: 240,
  },
  {
    id: "s4",
    client: "Daniel Okonkwo",
    avatar: "https://i.pravatar.cc/100?img=59",
    date: "Sat, 26 Jul",
    time: "05:30 PM",
    type: "Body recomposition",
    format: "Online",
    location: "Video call",
    fee: 180,
  },
  {
    id: "s5",
    client: "Noura Al Fahim",
    avatar: "https://i.pravatar.cc/100?img=48",
    date: "Sun, 27 Jul",
    time: "06:00 AM",
    type: "Strength foundations",
    format: "Outdoor",
    location: "JBR Beach track",
    fee: 200,
  },
];

/* ---------- Client enquiries ---------- */
export interface Enquiry {
  id: string;
  client: string;
  avatar: string;
  goal: string;
  area: string;
  time: string; // relative
  message: string;
  status: "new" | "replied";
}

export const enquiries: Enquiry[] = [
  {
    id: "e1",
    client: "Reem Al Suwaidi",
    avatar: "https://i.pravatar.cc/100?img=20",
    goal: "Fat loss",
    area: "Business Bay",
    time: "12 min ago",
    message:
      "Hi Omar, I'm looking to lose around 8kg before September and train 3 mornings a week. Do you have early slots near Business Bay?",
    status: "new",
  },
  {
    id: "e2",
    client: "Yousef Haddad",
    avatar: "https://i.pravatar.cc/100?img=15",
    goal: "Build muscle",
    area: "JBR",
    time: "1 hour ago",
    message:
      "Interested in a 12-week strength block. I've trained before but plateaued on my bench. What's your package pricing?",
    status: "new",
  },
  {
    id: "e3",
    client: "Fatima Nasser",
    avatar: "https://i.pravatar.cc/100?img=25",
    goal: "Post-natal recovery",
    area: "Dubai Marina",
    time: "3 hours ago",
    message:
      "Looking for a gentle strength programme to rebuild core stability. Can you do home sessions in Marina Gate?",
    status: "replied",
  },
  {
    id: "e4",
    client: "Marcus Lindberg",
    avatar: "https://i.pravatar.cc/100?img=53",
    goal: "Athletic performance",
    area: "Downtown Dubai",
    time: "Yesterday",
    message:
      "Semi-pro footballer here — need off-season strength and power work. Are you free on weekends?",
    status: "replied",
  },
];

/* ---------- Earnings & payouts ---------- */
export interface Payout {
  id: string;
  period: string;
  sessions: number;
  gross: number;
  status: "Paid" | "Processing";
  date: string;
}

export const payouts: Payout[] = [
  { id: "p1", period: "Jul 2026 (to date)", sessions: 74, gross: 18640, status: "Processing", date: "01 Aug 2026" },
  { id: "p2", period: "Jun 2026", sessions: 68, gross: 16750, status: "Paid", date: "01 Jul 2026" },
  { id: "p3", period: "May 2026", sessions: 63, gross: 15600, status: "Paid", date: "01 Jun 2026" },
  { id: "p4", period: "Apr 2026", sessions: 51, gross: 12400, status: "Paid", date: "01 May 2026" },
  { id: "p5", period: "Mar 2026", sessions: 57, gross: 13900, status: "Paid", date: "01 Apr 2026" },
];

/* ---------- Reviews ---------- */
export const dashboardReviews: Review[] = [
  {
    id: "dr1",
    author: "Sarah Mansour",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    date: "2026-07-18",
    text: "Down 9kg in four months and I've never felt stronger. Omar adjusts every session to how I'm recovering and actually explains the why behind each exercise.",
    goal: "Lose weight",
  },
  {
    id: "dr2",
    author: "James Keller",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "2026-07-02",
    text: "Professional, punctual and genuinely knowledgeable. My deadlift went from 90kg to 150kg in a year without a single injury.",
    goal: "Build muscle",
  },
  {
    id: "dr3",
    author: "Aisha Al Zaabi",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    date: "2026-06-24",
    text: "The home sessions fit perfectly around my work. Programming is smart and progressive — I finally understand how to train properly.",
    goal: "Fat loss",
  },
  {
    id: "dr4",
    author: "Daniel Okonkwo",
    avatar: "https://i.pravatar.cc/100?img=59",
    rating: 4,
    date: "2026-06-10",
    text: "Great online coaching and quick to reply on WhatsApp. Would love slightly longer check-in calls, but results speak for themselves.",
    goal: "Body recomposition",
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 108 },
  { stars: 4, count: 15 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

/* ---------- Availability grid ---------- */
export const availabilityDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const availabilitySlots = [
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "16:00",
  "18:00",
  "20:00",
];

/** Default available cells as "day-slot" keys. */
export const defaultAvailability: string[] = [
  "Mon-06:00", "Mon-08:00", "Mon-18:00", "Mon-20:00",
  "Tue-06:00", "Tue-18:00", "Tue-20:00",
  "Wed-06:00", "Wed-08:00", "Wed-16:00", "Wed-18:00",
  "Thu-06:00", "Thu-18:00", "Thu-20:00",
  "Fri-08:00", "Fri-10:00",
  "Sat-06:00", "Sat-08:00", "Sat-10:00", "Sat-16:00",
  "Sun-16:00", "Sun-18:00",
];

/* ---------- Service areas ---------- */
export const defaultServiceAreas = ["Dubai Marina", "JBR", "Business Bay"];

export const allUaeAreas = [
  "Dubai Marina",
  "JBR",
  "Business Bay",
  "Downtown Dubai",
  "Jumeirah",
  "Al Barsha",
  "Dubai Hills",
  "JVC",
  "Palm Jumeirah",
  "DIFC",
  "Deira",
  "Abu Dhabi — Corniche",
  "Al Reem Island",
  "Yas Island",
];
