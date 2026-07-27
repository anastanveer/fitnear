import { trainers } from "@/data/trainers";

/* ============================================================
   FitNear — Admin control-room mock data
   Static demo data (frontend-only). All amounts in AED.
   Answers the client's question: "Which coach got which client,
   and is the payment done?"
   ============================================================ */

export const adminPersona = {
  firstName: "Huda",
  name: "Huda Al Mansoori",
  role: "Platform administrator",
  org: "FitNear Operations · Dubai",
};

/* ---------- Payment status ---------- */
export type PaymentStatus = "Paid" | "Pending" | "Refunded";

/** Quick lookup of a trainer's avatar by display name. */
const avatarByName: Record<string, string> = Object.fromEntries(
  trainers.map((t) => [t.name, t.avatar]),
);

/* ---------- Bookings — the core record ---------- */
export interface Booking {
  id: string;
  ref: string;
  client: string;
  clientAvatar: string;
  coach: string;
  coachAvatar: string;
  sessionType: string;
  area: string;
  date: string; // e.g. "24 Jul 2026"
  amount: number; // AED
  status: PaymentStatus;
}

const av = (n: number) => `https://i.pravatar.cc/100?img=${n}`;

export const bookings: Booking[] = [
  {
    id: "b-1041",
    ref: "FN-1041",
    client: "Sarah Mansour",
    clientAvatar: av(45),
    coach: "Omar Al Rashid",
    coachAvatar: avatarByName["Omar Al Rashid"],
    sessionType: "Strength & conditioning",
    area: "Dubai Marina",
    date: "26 Jul 2026",
    amount: 220,
    status: "Paid",
  },
  {
    id: "b-1042",
    ref: "FN-1042",
    client: "Yousef Haddad",
    clientAvatar: av(15),
    coach: "Marcus Obi",
    coachAvatar: avatarByName["Marcus Obi"],
    sessionType: "Boxing fitness",
    area: "Business Bay",
    date: "26 Jul 2026",
    amount: 200,
    status: "Pending",
  },
  {
    id: "b-1043",
    ref: "FN-1043",
    client: "Aisha Al Zaabi",
    clientAvatar: av(32),
    coach: "Layla Hassan",
    coachAvatar: avatarByName["Layla Hassan"],
    sessionType: "Yoga & mobility",
    area: "Jumeirah",
    date: "25 Jul 2026",
    amount: 180,
    status: "Paid",
  },
  {
    id: "b-1044",
    ref: "FN-1044",
    client: "Daniel Okonkwo",
    clientAvatar: av(59),
    coach: "Elena Petrova",
    coachAvatar: avatarByName["Elena Petrova"],
    sessionType: "Swimming lesson",
    area: "Dubai Marina",
    date: "25 Jul 2026",
    amount: 190,
    status: "Pending",
  },
  {
    id: "b-1045",
    ref: "FN-1045",
    client: "Noura Al Fahim",
    clientAvatar: av(48),
    coach: "Sofia Rahman",
    coachAvatar: avatarByName["Sofia Rahman"],
    sessionType: "Women's strength",
    area: "JVC",
    date: "25 Jul 2026",
    amount: 175,
    status: "Paid",
  },
  {
    id: "b-1046",
    ref: "FN-1046",
    client: "Khalid Al Marri",
    clientAvatar: av(51),
    coach: "Viktor Ivanov",
    coachAvatar: avatarByName["Viktor Ivanov"],
    sessionType: "Powerlifting technique",
    area: "Al Barsha",
    date: "24 Jul 2026",
    amount: 230,
    status: "Paid",
  },
  {
    id: "b-1047",
    ref: "FN-1047",
    client: "Priya Sharma",
    clientAvatar: av(44),
    coach: "Raj Mehta",
    coachAvatar: avatarByName["Raj Mehta"],
    sessionType: "Running & endurance",
    area: "Jumeirah",
    date: "24 Jul 2026",
    amount: 150,
    status: "Pending",
  },
  {
    id: "b-1048",
    ref: "FN-1048",
    client: "Mariam Hassan",
    clientAvatar: av(27),
    coach: "Amira Khalil",
    coachAvatar: avatarByName["Amira Khalil"],
    sessionType: "Personal training",
    area: "Abu Dhabi",
    date: "24 Jul 2026",
    amount: 185,
    status: "Paid",
  },
  {
    id: "b-1049",
    ref: "FN-1049",
    client: "Tom Bradley",
    clientAvatar: av(13),
    coach: "Carlos Núñez",
    coachAvatar: avatarByName["Carlos Núñez"],
    sessionType: "Tennis coaching",
    area: "Business Bay",
    date: "23 Jul 2026",
    amount: 210,
    status: "Paid",
  },
  {
    id: "b-1050",
    ref: "FN-1050",
    client: "Fatima Nasser",
    clientAvatar: av(25),
    coach: "Yasmin Farouk",
    coachAvatar: avatarByName["Yasmin Farouk"],
    sessionType: "Pilates & rehab",
    area: "Downtown Dubai",
    date: "23 Jul 2026",
    amount: 195,
    status: "Refunded",
  },
  {
    id: "b-1051",
    ref: "FN-1051",
    client: "James Keller",
    clientAvatar: av(12),
    coach: "Omar Al Rashid",
    coachAvatar: avatarByName["Omar Al Rashid"],
    sessionType: "Powerlifting technique",
    area: "Dubai Marina",
    date: "23 Jul 2026",
    amount: 250,
    status: "Paid",
  },
  {
    id: "b-1052",
    ref: "FN-1052",
    client: "Olivia West",
    clientAvatar: av(36),
    coach: "Daniel Costa",
    coachAvatar: avatarByName["Daniel Costa"],
    sessionType: "Football skills",
    area: "Dubai Hills",
    date: "22 Jul 2026",
    amount: 170,
    status: "Pending",
  },
  {
    id: "b-1053",
    ref: "FN-1053",
    client: "Omar Sheikh",
    clientAvatar: av(53),
    coach: "Hassan Tariq",
    coachAvatar: avatarByName["Hassan Tariq"],
    sessionType: "Kids learn-to-swim",
    area: "JVC",
    date: "22 Jul 2026",
    amount: 160,
    status: "Paid",
  },
  {
    id: "b-1054",
    ref: "FN-1054",
    client: "Reem Al Suwaidi",
    clientAvatar: av(20),
    coach: "Layla Hassan",
    coachAvatar: avatarByName["Layla Hassan"],
    sessionType: "Prenatal yoga",
    area: "Al Barsha",
    date: "21 Jul 2026",
    amount: 180,
    status: "Paid",
  },
  {
    id: "b-1055",
    ref: "FN-1055",
    client: "Layla Ahmed",
    clientAvatar: av(30),
    coach: "Sofia Rahman",
    coachAvatar: avatarByName["Sofia Rahman"],
    sessionType: "Postnatal recovery",
    area: "Dubai Hills",
    date: "21 Jul 2026",
    amount: 175,
    status: "Pending",
  },
  {
    id: "b-1056",
    ref: "FN-1056",
    client: "Khalid Al Marri",
    clientAvatar: av(51),
    coach: "Carlos Núñez",
    coachAvatar: avatarByName["Carlos Núñez"],
    sessionType: "Junior tennis",
    area: "Downtown Dubai",
    date: "20 Jul 2026",
    amount: 210,
    status: "Paid",
  },
];

/* ---------- Headline platform stats (all-time) ---------- */
export const platformStats = {
  totalBookings: 1284,
  activeCoaches: 12,
  activeClients: 648,
  monthBookings: 132,
  monthNewClients: 41,
  avgSessionValue: 196,
};

/* ---------- Recent activity feed ---------- */
export interface Activity {
  id: string;
  kind: "booking" | "payment" | "coach" | "client" | "refund";
  text: string;
  time: string;
}

export const activityFeed: Activity[] = [
  {
    id: "a1",
    kind: "payment",
    text: "Payment of AED 250 cleared — James Keller → Omar Al Rashid",
    time: "8 min ago",
  },
  {
    id: "a2",
    kind: "booking",
    text: "New booking — Sarah Mansour booked Strength & conditioning in Dubai Marina",
    time: "22 min ago",
  },
  {
    id: "a3",
    kind: "client",
    text: "New client joined — Layla Ahmed signed up from Dubai Hills",
    time: "1 hour ago",
  },
  {
    id: "a4",
    kind: "coach",
    text: "Coach verification submitted — Hassan Tariq uploaded STA certificate",
    time: "2 hours ago",
  },
  {
    id: "a5",
    kind: "refund",
    text: "Refund processed — Fatima Nasser, Pilates & rehab (AED 195)",
    time: "5 hours ago",
  },
];

/* ---------- Coaches (verification + payout state) ---------- */
export type CoachStatus = "Active" | "Pending verification";

export interface CoachRow {
  id: string;
  name: string;
  avatar: string;
  areas: string[];
  sessionsCompleted: number;
  rating: number;
  reviewCount: number;
  totalEarned: number;
  verified: boolean;
  status: CoachStatus;
}

/** Two coaches shown mid-verification so the admin has something to approve. */
const pendingCoaches = new Set(["hassan-tariq", "carlos-nunez"]);

export const coachRows: CoachRow[] = trainers.map((t) => ({
  id: t.id,
  name: t.name,
  avatar: t.avatar,
  areas: t.serviceAreas,
  sessionsCompleted: t.sessionsCompleted,
  rating: t.rating,
  reviewCount: t.reviewCount,
  // Rough lifetime gross — sessions × hourly rate, trimmed for realism.
  totalEarned: Math.round((t.sessionsCompleted * t.hourlyRate) / 11),
  verified: !pendingCoaches.has(t.slug),
  status: pendingCoaches.has(t.slug) ? "Pending verification" : "Active",
}));

/* ---------- Clients ---------- */
export interface ClientRow {
  id: string;
  name: string;
  avatar: string;
  joined: string;
  bookings: number;
  totalSpent: number;
  lastActive: string;
  city: string;
}

export const clientRows: ClientRow[] = [
  { id: "c1", name: "Sarah Mansour", avatar: av(45), joined: "Jan 2026", bookings: 24, totalSpent: 5280, lastActive: "Today", city: "Dubai Marina" },
  { id: "c2", name: "James Keller", avatar: av(12), joined: "Feb 2026", bookings: 18, totalSpent: 4500, lastActive: "Today", city: "Dubai Marina" },
  { id: "c3", name: "Aisha Al Zaabi", avatar: av(32), joined: "Nov 2025", bookings: 31, totalSpent: 5580, lastActive: "Yesterday", city: "Jumeirah" },
  { id: "c4", name: "Khalid Al Marri", avatar: av(51), joined: "Mar 2026", bookings: 14, totalSpent: 3080, lastActive: "2 days ago", city: "Al Barsha" },
  { id: "c5", name: "Priya Sharma", avatar: av(44), joined: "Dec 2025", bookings: 22, totalSpent: 3300, lastActive: "Today", city: "Jumeirah" },
  { id: "c6", name: "Mariam Hassan", avatar: av(27), joined: "Apr 2026", bookings: 9, totalSpent: 1665, lastActive: "3 days ago", city: "Abu Dhabi" },
  { id: "c7", name: "Tom Bradley", avatar: av(13), joined: "Feb 2026", bookings: 12, totalSpent: 2520, lastActive: "Yesterday", city: "Business Bay" },
  { id: "c8", name: "Noura Al Fahim", avatar: av(48), joined: "May 2026", bookings: 7, totalSpent: 1225, lastActive: "Today", city: "JVC" },
  { id: "c9", name: "Layla Ahmed", avatar: av(30), joined: "Jul 2026", bookings: 2, totalSpent: 350, lastActive: "Today", city: "Dubai Hills" },
  { id: "c10", name: "Yousef Haddad", avatar: av(15), joined: "Jan 2026", bookings: 16, totalSpent: 3200, lastActive: "Yesterday", city: "Business Bay" },
];

/* ---------- Analytics: bookings per week ---------- */
export interface Point {
  label: string;
  value: number;
}

export const bookingsPerWeek: Point[] = [
  { label: "W1", value: 96 },
  { label: "W2", value: 108 },
  { label: "W3", value: 121 },
  { label: "W4", value: 114 },
  { label: "W5", value: 132 },
  { label: "W6", value: 145 },
  { label: "W7", value: 138 },
  { label: "W8", value: 156 },
];

/* ---------- Analytics: revenue trend (AED, per month) ---------- */
export const revenueTrend: Point[] = [
  { label: "Feb", value: 21400 },
  { label: "Mar", value: 24800 },
  { label: "Apr", value: 23100 },
  { label: "May", value: 27600 },
  { label: "Jun", value: 29900 },
  { label: "Jul", value: 33400 },
];

/* ---------- Analytics: payment-status split (donut) ---------- */
export interface Slice {
  label: string;
  value: number;
  color: string;
}
