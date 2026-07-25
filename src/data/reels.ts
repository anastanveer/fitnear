import type { SportSlug } from "@/lib/types";

/* Fitness Unsplash backgrounds (license-free) served portrait-friendly.
   All IDs are on images.unsplash.com, already whitelisted in next.config. */
const bg = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface ReelComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
}

export interface Reel {
  id: string;
  /** References a real trainer in @/data/trainers by slug. */
  trainerSlug: string;
  /** Full-bleed background image treated as a looping "clip" poster. */
  image: string;
  caption: string;
  hashtags: string[];
  /** A short "audio" label shown on the music ticker. */
  music: string;
  likes: number;
  shares: number;
  comments: ReelComment[];
  /** Reel duration in seconds, drives the progress bar loop. */
  duration: number;
  /** For the For You / Following split. */
  channel: "foryou" | "following";
  sport: SportSlug;
}

const av = (n: number) => `https://i.pravatar.cc/100?img=${n}`;

export const reels: Reel[] = [
  {
    id: "reel-01",
    trainerSlug: "omar-al-rashid",
    image: bg("1534438327276-14e5300c3a48"),
    caption:
      "5am club at Marina. Superset finisher that torches fat without wrecking your knees — save this for leg day.",
    hashtags: ["fatloss", "dubaimarina", "strength", "5amclub"],
    music: "Omar Al Rashid · original workout mix",
    likes: 3120,
    shares: 214,
    duration: 7,
    channel: "foryou",
    sport: "personal-training",
    comments: [
      { id: "c1", author: "Sarah M.", avatar: av(45), text: "Did this today, I'm dead 😮‍💨 in the best way" },
      { id: "c2", author: "James K.", avatar: av(12), text: "The cueing is so clean. Booking a session." },
      { id: "c3", author: "Priya N.", avatar: av(31), text: "Knees thanked me for once 🙏" },
    ],
  },
  {
    id: "reel-02",
    trainerSlug: "layla-hassan",
    image: bg("1518611012118-696072aa579a"),
    caption:
      "Desk all day? This 60-second hip opener resets your lower back before you even leave the office. Breathe with me.",
    hashtags: ["yoga", "mobility", "jumeirah", "deskrelief"],
    music: "Layla Hassan · calm flow · slowed",
    likes: 4780,
    shares: 402,
    duration: 8,
    channel: "foryou",
    sport: "yoga",
    comments: [
      { id: "c1", author: "Nadia R.", avatar: av(32), text: "My hips have never felt this open ✨" },
      { id: "c2", author: "Tom B.", avatar: av(15), text: "Sending this to my whole team." },
    ],
  },
  {
    id: "reel-03",
    trainerSlug: "marcus-obi",
    image: bg("1544367567-0f2fcb009e0b"),
    caption:
      "Jab–cross–hook, but make it clean. Footwork is where the power lives — don't skip the shuffle. Business Bay, let's move.",
    hashtags: ["boxing", "businessbay", "combos", "footwork"],
    music: "Marcus Obi · ringwalk beat",
    likes: 6210,
    shares: 588,
    duration: 6,
    channel: "foryou",
    sport: "boxing",
    comments: [
      { id: "c1", author: "Yousef A.", avatar: av(51), text: "That hook rotation though 🔥" },
      { id: "c2", author: "Dana L.", avatar: av(20), text: "Best hour of my week, every week." },
      { id: "c3", author: "Karim S.", avatar: av(8), text: "Marcus made me actually enjoy cardio." },
    ],
  },
  {
    id: "reel-04",
    trainerSlug: "elena-petrova",
    image: bg("1530549387789-4c1017266635"),
    caption:
      "Bilateral breathing drill for open water. Stay long in the water, roll from the hips, and stop lifting your head.",
    hashtags: ["swimming", "openwater", "technique", "dubaimarina"],
    music: "Elena Petrova · underwater ambience",
    likes: 2890,
    shares: 176,
    duration: 8,
    channel: "foryou",
    sport: "swimming",
    comments: [
      { id: "c1", author: "Marco V.", avatar: av(60), text: "Knocked 4 seconds off my 100m 🏊" },
      { id: "c2", author: "Hana T.", avatar: av(26), text: "Finally understand the hip roll!" },
    ],
  },
  {
    id: "reel-05",
    trainerSlug: "sofia-rahman",
    image: bg("1571019613454-1cb2f99b2d8b"),
    caption:
      "Your first pull-up is closer than you think. Progression #2 of 4 — controlled negatives build the strength fast.",
    hashtags: ["strength", "jvc", "firstpullup", "progress"],
    music: "Sofia Rahman · heavy sets playlist",
    likes: 5340,
    shares: 461,
    duration: 7,
    channel: "following",
    sport: "strength",
    comments: [
      { id: "c1", author: "Leila F.", avatar: av(47), text: "Got my first unassisted rep today!! 😭" },
      { id: "c2", author: "Omar Z.", avatar: av(3), text: "Sofia's programming is unreal." },
    ],
  },
  {
    id: "reel-06",
    trainerSlug: "daniel-costa",
    image: bg("1459865264687-595d652de67e"),
    caption:
      "First-touch under pressure. Kids at Dubai Hills nailing the receive-and-turn — small habits, big Sunday-league gains.",
    hashtags: ["football", "dubaihills", "firsttouch", "coaching"],
    music: "Daniel Costa · matchday energy",
    likes: 3970,
    shares: 305,
    duration: 6,
    channel: "following",
    sport: "football",
    comments: [
      { id: "c1", author: "Rania K.", avatar: av(36), text: "My son looks forward to this all week ⚽" },
      { id: "c2", author: "Sami H.", avatar: av(14), text: "Real coaching, not just drills. Respect." },
    ],
  },
  {
    id: "reel-07",
    trainerSlug: "raj-mehta",
    image: bg("1476480862126-209bfaa8edc8"),
    caption:
      "Cadence over stride. Quick, light steps along Jumeirah beach save your shins and your race pace. Run with us Friday.",
    hashtags: ["running", "jumeirah", "cadence", "sunrise"],
    music: "Raj Mehta · morning tempo run",
    likes: 2440,
    shares: 158,
    duration: 8,
    channel: "foryou",
    sport: "running",
    comments: [
      { id: "c1", author: "Ellie W.", avatar: av(29), text: "Shin splints gone since I upped cadence 🙌" },
      { id: "c2", author: "Bilal R.", avatar: av(52), text: "That sunrise is unreal. See you Friday." },
    ],
  },
  {
    id: "reel-08",
    trainerSlug: "carlos-nunez",
    image: bg("1595152772835-219674b2a8a6"),
    caption:
      "Topspin forehand in slow-mo. Low-to-high brush, finish over the shoulder. Business Bay courts, book your slot.",
    hashtags: ["tennis", "businessbay", "topspin", "technique"],
    music: "Carlos Núñez · court-side groove",
    likes: 3110,
    shares: 233,
    duration: 7,
    channel: "following",
    sport: "tennis",
    comments: [
      { id: "c1", author: "Vera M.", avatar: av(41), text: "My forehand finally has bite 🎾" },
      { id: "c2", author: "Faisal A.", avatar: av(11), text: "Carlos breaks it down so simply." },
    ],
  },
];
