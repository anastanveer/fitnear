import { seedPosts, type FeedPost } from "@/data/posts";

/**
 * Client-side feed persistence.
 *
 * For this prototype the "database" is the browser's localStorage, so posts,
 * likes and comments survive refreshes with zero backend cost. On real backend
 * integration these functions become API calls (POST /posts, PATCH /posts/:id,
 * etc.) — the component contract stays identical.
 */

const KEY = "fitnear_feed_v2";

export function loadFeed(): FeedPost[] {
  if (typeof window === "undefined") return seedPosts;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seedPosts;
    const parsed = JSON.parse(raw) as FeedPost[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedPosts;
  } catch {
    return seedPosts;
  }
}

export function saveFeed(posts: FeedPost[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(posts));
    return true;
  } catch {
    // Quota exceeded (e.g. large uploaded images) — keep working in-memory.
    return false;
  }
}

export function resetFeed(): FeedPost[] {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  return seedPosts;
}

export function relativeTime(createdAt: number, fallback?: string): string {
  if (fallback) return fallback;
  if (!createdAt) return "Just now";
  const diff = Date.now() - createdAt;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}
