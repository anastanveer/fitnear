import type { SportSlug } from "@/lib/types";

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
}

export interface FeedPost {
  id: string;
  trainerSlug: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  verified: boolean;
  sport: SportSlug;
  createdAt: number; // epoch ms (seed uses fixed values)
  timeLabel?: string; // pre-computed label for seed posts
  text: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  liked?: boolean;
  saved?: boolean;
}

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const av = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;

/** Seed posts — shown until the user creates their own (persisted to localStorage). */
export const seedPosts: FeedPost[] = [
  {
    id: "p-1",
    trainerSlug: "omar-al-rashid",
    authorName: "Omar Al Rashid",
    authorAvatar: av("1567013127542-490d757e51fc"),
    authorRole: "Strength & fat-loss coach · Dubai Marina",
    verified: true,
    sport: "strength",
    createdAt: 0,
    timeLabel: "2h ago",
    text: "Client win of the week 💪 Down 9kg in 4 months and just hit a 150kg deadlift — from someone who'd never touched a barbell. Consistency beats intensity every single time. Who's ready to start? Two morning slots open this week in the Marina.",
    image: img("1534438327276-14e5300c3a48"),
    tags: ["fatloss", "strength", "dubaimarina"],
    likes: 214,
    comments: [
      {
        id: "c1",
        author: "Sarah M.",
        avatar: "https://i.pravatar.cc/100?img=45",
        text: "This is so inspiring! DMing you now 🙌",
      },
      {
        id: "c2",
        author: "James K.",
        avatar: "https://i.pravatar.cc/100?img=12",
        text: "Best coach in Dubai, can confirm.",
      },
    ],
  },
  {
    id: "p-2",
    trainerSlug: "layla-hassan",
    authorName: "Layla Hassan",
    authorAvatar: av("1594381898411-846e7d193883"),
    authorRole: "Yoga & mobility specialist · Jumeirah",
    verified: true,
    sport: "yoga",
    createdAt: 0,
    timeLabel: "5h ago",
    text: "Sunrise flow at Kite Beach this morning 🌅 There's something about breathwork by the sea that resets everything. Running a free community session this Saturday 7:30am — bring a mat and a friend. All levels welcome.",
    image: img("1506126613408-eca07ce68773"),
    tags: ["yoga", "mobility", "community"],
    likes: 178,
    comments: [
      {
        id: "c1",
        author: "Nadia R.",
        avatar: "https://i.pravatar.cc/100?img=32",
        text: "I'll be there! Been waiting for this 🧘‍♀️",
      },
    ],
  },
  {
    id: "p-3",
    trainerSlug: "marcus-obi",
    authorName: "Marcus Obi",
    authorAvatar: av("1583468982228-19f19164aee2"),
    authorRole: "Boxing & conditioning coach · Business Bay",
    verified: true,
    sport: "boxing",
    createdAt: 0,
    timeLabel: "1d ago",
    text: "New white-collar boxing group starting next month 🥊 6 weeks, twice a week, ending with a friendly exhibition night. No experience needed — just show up ready to learn. 5 spots left. This is how you build real confidence.",
    image: img("1549719386-74dfcbf7dbed"),
    tags: ["boxing", "fitness", "businessbay"],
    likes: 143,
    comments: [
      {
        id: "c1",
        author: "Priya S.",
        avatar: "https://i.pravatar.cc/100?img=44",
        text: "Signed up last round — 10/10 experience.",
      },
    ],
  },
  {
    id: "p-4",
    trainerSlug: "elena-petrova",
    authorName: "Elena Petrova",
    authorAvatar: av("1548690312-e3b507d8c110"),
    authorRole: "Swimming coach · Dubai Marina",
    verified: true,
    sport: "swimming",
    createdAt: 0,
    timeLabel: "2d ago",
    text: "From scared of deep water to a 750m open-water swim in 8 weeks 🏊 Adult beginners — it is never too late. Technique first, confidence second, distance takes care of itself. Proud of this crew.",
    image: img("1530549387789-4c1017266635"),
    tags: ["swimming", "openwater", "beginners"],
    likes: 96,
    comments: [],
  },
];
