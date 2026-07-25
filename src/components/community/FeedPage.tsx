"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, RotateCcw, Sparkles } from "lucide-react";
import type { FeedPost } from "@/data/posts";
import type { SportSlug } from "@/lib/types";
import { loadFeed, saveFeed, resetFeed } from "@/lib/feed";
import { featuredTrainers } from "@/data/trainers";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/Container";
import { VerifiedBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Composer } from "./Composer";
import { PostCard } from "./PostCard";

const YOU_AVATAR = "https://i.pravatar.cc/100?img=68";

const filterTabs = [
  { value: "all", label: "All" },
  ...categories.map((c) => ({ value: c.slug, label: c.name })),
];

const trendingTags = [
  "fatloss",
  "yoga",
  "boxing",
  "openwater",
  "community",
  "mobility",
  "strength",
  "beginners",
];

export function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [filter, setFilter] = useState<SportSlug | "all">("all");
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setPosts(loadFeed());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveFeed(posts);
  }, [posts, mounted]);

  const addPost = (post: FeedPost) => {
    setPosts((p) => [post, ...p]);
    toast("Shared to the community feed ✓");
  };

  const toggleLike = (id: string) =>
    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    );

  const toggleSave = (id: string) => {
    const wasSaved = posts.find((p) => p.id === id)?.saved;
    setPosts((p) =>
      p.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post,
      ),
    );
    toast(wasSaved ? "Removed from saved" : "Saved to your bookmarks", "info");
  };

  const addComment = (id: string, text: string) =>
    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: "c" + post.comments.length + Date.now(),
                  author: "You",
                  avatar: YOU_AVATAR,
                  text,
                },
              ],
            }
          : post,
      ),
    );

  const visible = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.sport === filter)),
    [posts, filter],
  );

  const suggested = featuredTrainers.slice(0, 4);

  return (
    <div className="pb-20">
      {/* header band */}
      <section className="surface-dark grain relative overflow-hidden pt-32 pb-14 text-fg-invert sm:pt-36">
        <div className="pointer-events-none absolute -top-16 left-1/3 h-72 w-72 glow-lime opacity-40" />
        <Container className="relative">
          <Eyebrow dark>
            <Users className="h-3.5 w-3.5" /> Community
          </Eyebrow>
          <h1 className="display-2 font-display mt-4 max-w-2xl font-bold text-balance">
            Where the UAE&apos;s coaches and clients connect.
          </h1>
          <p className="mt-4 max-w-xl text-fg-invert-muted">
            Wins, classes, tips and open slots — posted by the trainers near you.
            Share an update, follow your favourites, and never miss a session.
          </p>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          {/* main feed */}
          <div className="min-w-0">
            <Composer onPost={addPost} />

            {/* filter tabs */}
            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
              {filterTabs.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setFilter(t.value as SportSlug | "all")}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    filter === t.value
                      ? "border-ink-900 bg-ink-900 text-fg-invert"
                      : "border-ink-900/10 text-fg-muted hover:border-ink-900/25",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* posts */}
            <div className="mt-6 space-y-5">
              {!mounted ? (
                <div className="space-y-5">
                  {[0, 1].map((i) => (
                    <div key={i} className="rounded-3xl border border-ink-900/8 bg-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="skeleton h-11 w-11 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="skeleton h-3 w-32 rounded" />
                          <div className="skeleton h-2.5 w-48 rounded" />
                        </div>
                      </div>
                      <div className="skeleton mt-4 h-40 w-full rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : visible.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-ink-900/15 bg-white py-16 text-center">
                  <p className="font-display text-lg font-semibold">
                    No posts here yet
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">
                    Be the first to share something in this category.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {visible.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <PostCard
                        post={post}
                        onLike={() => toggleLike(post.id)}
                        onSave={() => toggleSave(post.id)}
                        onComment={(t) => addComment(post.id, t)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {mounted && (
              <button
                onClick={() => setPosts(resetFeed())}
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted hover:text-fg"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset demo feed
              </button>
            )}
          </div>

          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-3xl border border-ink-900/8 bg-white p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4 text-lime-600" /> Trainers to follow
                </h3>
                <ul className="mt-4 space-y-3">
                  {suggested.map((t) => (
                    <li key={t.id} className="flex items-center gap-3">
                      <Link
                        href={`/trainer/${t.slug}`}
                        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
                      >
                        <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/trainer/${t.slug}`}
                            className="truncate text-sm font-semibold hover:underline"
                          >
                            {t.name}
                          </Link>
                          {t.verified && <VerifiedBadge label={false} />}
                        </div>
                        <p className="truncate text-xs text-fg-muted">{t.area}</p>
                      </div>
                      <button className="rounded-full bg-ink-900 px-3 py-1.5 text-xs font-semibold text-fg-invert">
                        Follow
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-900/8 bg-white p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-4 w-4 text-lime-600" /> Trending
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-fg-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="surface-dark grain relative overflow-hidden rounded-3xl p-5">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 glow-lime opacity-40" />
                <div className="relative">
                  <p className="font-display text-base font-semibold text-fg-invert">
                    Are you a coach?
                  </p>
                  <p className="mt-1 text-xs text-fg-invert-muted">
                    Join free, post your wins and get discovered by clients near
                    you.
                  </p>
                  <Link
                    href="/join"
                    className="mt-3 inline-flex rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-ink-900"
                  >
                    Join FitNear
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
