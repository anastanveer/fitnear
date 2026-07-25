export type ChallengeCategory =
  | "running"
  | "strength"
  | "yoga"
  | "steps"
  | "mixed";

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  area: string;
  points: number;
  streak: number;
}

export interface ChallengeRule {
  title: string;
  detail: string;
}

export interface Challenge {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  category: ChallengeCategory;
  categoryLabel: string;
  hostSlug: string; // maps to a trainer in @/data/trainers
  durationDays: number;
  startLabel: string;
  participants: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  reward: string;
  description: string;
  dailyGoal: string; // check-in label, e.g. "Log today's workout"
  pointsPerCheckIn: number;
  rules: ChallengeRule[];
  leaderboard: LeaderboardEntry[];
}

/* Unsplash cover helper — same source the rest of the app uses. */
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const av = (n: number) => `https://i.pravatar.cc/100?img=${n}`;

const mk = (
  id: string,
  name: string,
  n: number,
  area: string,
  points: number,
  streak: number,
): LeaderboardEntry => ({ id, name, avatar: av(n), area, points, streak });

export const categoryLabels: Record<ChallengeCategory, string> = {
  running: "Running",
  strength: "Strength",
  yoga: "Yoga",
  steps: "Steps",
  mixed: "Mixed",
};

export const challenges: Challenge[] = [
  {
    slug: "dubai-30-day-shred",
    title: "Dubai 30-Day Shred",
    tagline: "Four weeks of progressive strength & conditioning to lean out before summer.",
    cover: img("1534438327276-14e5300c3a48"),
    category: "strength",
    categoryLabel: "Strength",
    hostSlug: "omar-al-rashid",
    durationDays: 30,
    startLabel: "Rolling start · join any day",
    participants: 1284,
    difficulty: "Intermediate",
    reward: "Top 3 win a free month of coaching with Omar + FitNear merch drop",
    description:
      "A structured 30-day cut built for busy professionals across Dubai. Each day pairs a short strength circuit with a metabolic finisher you can do at a gym in Marina, Business Bay or from home. Check in daily to keep your streak alive and climb the city leaderboard.",
    dailyGoal: "Log today's strength session",
    pointsPerCheckIn: 50,
    rules: [
      { title: "Move every day", detail: "Complete the day's circuit or an equivalent 30-minute session, then check in before midnight." },
      { title: "Build your streak", detail: "Consecutive days stack a streak bonus. Miss a day and the streak resets — but your points stay." },
      { title: "Climb the board", detail: "Every check-in earns 50 points plus a streak bonus. The city leaderboard updates instantly." },
      { title: "Finish strong", detail: "Hit 25 of 30 check-ins to earn the finisher badge on your FitNear profile." },
    ],
    leaderboard: [
      mk("s1", "Omar F.", 12, "Business Bay", 1340, 27),
      mk("s2", "Priya S.", 44, "Dubai Marina", 1210, 24),
      mk("s3", "Khalid A.", 59, "Downtown Dubai", 1085, 21),
      mk("s4", "Elena V.", 32, "JBR", 960, 19),
      mk("s5", "James K.", 13, "Business Bay", 845, 17),
      mk("s6", "Aisha M.", 48, "Al Barsha", 720, 14),
      mk("s7", "Daniel P.", 15, "Dubai Hills", 610, 12),
      mk("s8", "Hana M.", 27, "JVC", 500, 10),
    ],
  },
  {
    slug: "ramadan-reset",
    title: "Ramadan Reset",
    tagline: "Gentle movement, mobility and mindful habits that fit around fasting hours.",
    cover: img("1540496905036-5937c10647cc"),
    category: "mixed",
    categoryLabel: "Mixed",
    hostSlug: "amira-khalil",
    durationDays: 21,
    startLabel: "21-day programme · Abu Dhabi & Dubai",
    participants: 942,
    difficulty: "Beginner",
    reward: "Everyone who finishes gets a 20% credit toward a session with Amira",
    description:
      "A calmer challenge designed for the holy month. Short pre-iftar mobility flows, evening walks and simple hydration habits keep you consistent without burning out. Perfect if you want to hold your fitness while honouring the fast.",
    dailyGoal: "Log today's movement or walk",
    pointsPerCheckIn: 40,
    rules: [
      { title: "Keep it gentle", detail: "A 15-minute mobility flow, a post-iftar walk or a light session all count." },
      { title: "Hydrate & rest", detail: "Check in once you've moved and hit your water goal between iftar and suhoor." },
      { title: "Stay consistent", detail: "Consistency beats intensity here — a small daily habit keeps your streak and points growing." },
    ],
    leaderboard: [
      mk("r1", "Mariam H.", 27, "Al Reem Island", 760, 19),
      mk("r2", "Yousef A.", 53, "Corniche", 680, 17),
      mk("r3", "Layla N.", 45, "Khalifa City", 600, 15),
      mk("r4", "Ahmed F.", 59, "Jumeirah", 520, 13),
      mk("r5", "Sara T.", 36, "Downtown Dubai", 440, 11),
      mk("r6", "Bilal R.", 51, "Al Barsha", 360, 9),
      mk("r7", "Noor K.", 30, "JVC", 280, 7),
    ],
  },
  {
    slug: "10k-steps-streak",
    title: "10k Steps Streak",
    tagline: "One simple rule: hit 10,000 steps a day. Keep the streak alive.",
    cover: img("1486218119243-13883505764c"),
    category: "steps",
    categoryLabel: "Steps",
    hostSlug: "sofia-rahman",
    durationDays: 30,
    startLabel: "Rolling start · anywhere in the UAE",
    participants: 2107,
    difficulty: "Beginner",
    reward: "Longest streak of the month wins AED 500 of Nike vouchers",
    description:
      "The most joinable challenge on FitNear. Walk the Marina promenade, loop Kite Beach or pace the office — as long as you hit 10k steps, you check in. Habit coach Sofia keeps the group accountable with weekly nudges.",
    dailyGoal: "Confirm 10,000 steps today",
    pointsPerCheckIn: 30,
    rules: [
      { title: "Hit 10,000 steps", detail: "Any walking counts. Check in once your tracker crosses 10k before midnight." },
      { title: "Protect the streak", detail: "Consecutive days build a bonus. The longest streak of the month takes the prize." },
      { title: "Bring a friend", detail: "Steps are better shared — invite someone from your building and climb together." },
    ],
    leaderboard: [
      mk("t1", "Rebecca T.", 30, "Dubai Marina", 900, 30),
      mk("t2", "Fatima A.", 25, "JVC", 810, 27),
      mk("t3", "Tom B.", 15, "Downtown Dubai", 720, 24),
      mk("t4", "Nadia R.", 32, "Jumeirah", 630, 21),
      mk("t5", "Claire D.", 41, "Al Barsha", 540, 18),
      mk("t6", "Raj M.", 68, "Dubai Hills", 450, 15),
      mk("t7", "Olivia W.", 36, "Business Bay", 360, 12),
      mk("t8", "Sam H.", 33, "JBR", 270, 9),
    ],
  },
  {
    slug: "marina-sunrise-runs",
    title: "Marina Sunrise Runs",
    tagline: "5am club. Log a sunrise run along the water, three times a week minimum.",
    cover: img("1476480862126-209bfaa8edc8"),
    category: "running",
    categoryLabel: "Running",
    hostSlug: "raj-mehta",
    durationDays: 28,
    startLabel: "4-week block · Dubai Marina & JBR",
    participants: 686,
    difficulty: "Intermediate",
    reward: "Podium finishers join Raj's private sub-4 marathon prep group",
    description:
      "For runners who love the quiet golden hour before the city wakes. Coach Raj sets a weekly distance target and you log every sunrise run along the Marina and JBR. Beat the heat, bank the miles, own the leaderboard.",
    dailyGoal: "Log today's run",
    pointsPerCheckIn: 60,
    rules: [
      { title: "Run at least 3x a week", detail: "Any distance counts, but aim for the weekly target Raj posts each Sunday." },
      { title: "Beat the heat", detail: "Sunrise runs earn full points. Log your run once you're done — GPS optional." },
      { title: "Race the board", detail: "Each run is 60 points plus a streak bonus. Consistency wins the season." },
    ],
    leaderboard: [
      mk("m1", "Claire D.", 41, "Dubai Marina", 1080, 18),
      mk("m2", "Ahmed F.", 59, "JBR", 960, 16),
      mk("m3", "Sofia L.", 47, "Jumeirah", 840, 14),
      mk("m4", "Marcus O.", 60, "Business Bay", 720, 12),
      mk("m5", "Nadia R.", 32, "Downtown Dubai", 600, 10),
      mk("m6", "Yousef A.", 53, "Dubai Marina", 480, 8),
      mk("m7", "Emma S.", 20, "JBR", 360, 6),
    ],
  },
  {
    slug: "yoga-21-day-flow",
    title: "Yoga 21-Day Flow",
    tagline: "A short daily flow to unwind desk tension and rebuild mobility.",
    cover: img("1518611012118-696072aa579a"),
    category: "yoga",
    categoryLabel: "Yoga",
    hostSlug: "layla-hassan",
    durationDays: 21,
    startLabel: "21 daily flows · home or studio",
    participants: 1173,
    difficulty: "Beginner",
    reward: "Finishers unlock Layla's recorded recovery library, free for a year",
    description:
      "Twenty-one guided flows from Layla, each 12–20 minutes, designed for tight hips, stiff shoulders and stressed minds. No experience needed — a mat and a corner of your living room is enough. Roll it out, breathe, check in.",
    dailyGoal: "Complete today's flow",
    pointsPerCheckIn: 35,
    rules: [
      { title: "Flow daily", detail: "Follow the day's sequence or any 12-minute practice, then check in when you're done." },
      { title: "Breathe with it", detail: "Every session includes breathwork — that's part of the check-in, not an extra." },
      { title: "Keep the thread", detail: "Daily practice builds a streak bonus. Twenty-one days rewires the habit." },
    ],
    leaderboard: [
      mk("y1", "Olivia W.", 36, "Downtown Dubai", 700, 20),
      mk("y2", "Nadia R.", 32, "Jumeirah", 630, 18),
      mk("y3", "Hana M.", 48, "JVC", 560, 16),
      mk("y4", "Sara T.", 45, "Business Bay", 490, 14),
      mk("y5", "Amir Z.", 51, "Al Barsha", 420, 12),
      mk("y6", "Leila F.", 30, "Dubai Hills", 350, 10),
      mk("y7", "Mona K.", 44, "Jumeirah", 280, 8),
    ],
  },
  {
    slug: "beginner-bootcamp-bingo",
    title: "Beginner Bootcamp Bingo",
    tagline: "Tick off a fresh movement each day and complete your bootcamp bingo card.",
    cover: img("1571019613454-1cb2f99b2d8b"),
    category: "mixed",
    categoryLabel: "Mixed",
    hostSlug: "marcus-obi",
    durationDays: 14,
    startLabel: "2-week starter · perfect for first-timers",
    participants: 758,
    difficulty: "Beginner",
    reward: "Complete the card and get a free intro session with Marcus",
    description:
      "New to training? This two-week bingo card is your gentle on-ramp. Each day unlocks one simple challenge — a plank hold, a brisk walk, ten squats, two minutes of shadow boxing. Tick them off, fill the card, build the habit that sticks.",
    dailyGoal: "Tick off today's bingo square",
    pointsPerCheckIn: 45,
    rules: [
      { title: "One square a day", detail: "Complete the day's movement — no experience or equipment required." },
      { title: "No pressure", detail: "Every square is beginner-friendly and takes under 15 minutes." },
      { title: "Fill the card", detail: "Check in daily to fill your bingo card and unlock the finisher reward." },
    ],
    leaderboard: [
      mk("b1", "Sam H.", 33, "Al Barsha", 585, 13),
      mk("b2", "Priya S.", 44, "JVC", 495, 11),
      mk("b3", "Bilal R.", 51, "Business Bay", 405, 9),
      mk("b4", "Emma S.", 20, "Downtown Dubai", 360, 8),
      mk("b5", "Kareem N.", 59, "Dubai Hills", 270, 6),
      mk("b6", "Zoya A.", 30, "Jumeirah", 225, 5),
      mk("b7", "Leo M.", 13, "JBR", 180, 4),
    ],
  },
];

export const challengeBySlug = Object.fromEntries(
  challenges.map((c) => [c.slug, c]),
) as Record<string, Challenge>;

export const challengeFilters: { key: "all" | ChallengeCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "running", label: "Running" },
  { key: "strength", label: "Strength" },
  { key: "yoga", label: "Yoga" },
  { key: "steps", label: "Steps" },
  { key: "mixed", label: "Mixed" },
];
