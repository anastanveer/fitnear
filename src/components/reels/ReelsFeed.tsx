"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, Sparkles } from "lucide-react";
import { reels as allReels, type ReelComment } from "@/data/reels";
import { trainers } from "@/data/trainers";
import type { Trainer } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { ReelCard } from "./ReelCard";
import { CommentsSheet } from "./CommentsSheet";

const STORAGE_KEY = "fitnear_reels_v1";
const YOU_AVATAR = "https://i.pravatar.cc/100?img=68";

type Channel = "foryou" | "following";

interface PersistedState {
  liked: Record<string, boolean>;
  saved: Record<string, boolean>;
}

const trainerBySlug: Record<string, Trainer> = Object.fromEntries(
  trainers.map((t) => [t.slug, t]),
);

function loadPersisted(): PersistedState {
  if (typeof window === "undefined") return { liked: {}, saved: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { liked: {}, saved: {} };
    const parsed = JSON.parse(raw) as PersistedState;
    return { liked: parsed.liked ?? {}, saved: parsed.saved ?? {} };
  } catch {
    return { liked: {}, saved: {} };
  }
}

export function ReelsFeed() {
  const toast = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [channel, setChannel] = useState<Channel>("foryou");
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [extraLikes, setExtraLikes] = useState<Record<string, number>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, ReelComment[]>>(
    () => Object.fromEntries(allReels.map((r) => [r.id, r.comments])),
  );
  const [sheetReelId, setSheetReelId] = useState<string | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Hydrate persisted likes/saves (SSR-safe).
  useEffect(() => {
    const p = loadPersisted();
    setLiked(p.liked);
    setSaved(p.saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ liked, saved }),
      );
    } catch {
      /* storage unavailable — ignore */
    }
  }, [liked, saved, mounted]);

  const visibleReels = useMemo(
    () =>
      channel === "foryou"
        ? allReels
        : allReels.filter((r) => r.channel === "following"),
    [channel],
  );

  // Track which reel is centred using IntersectionObserver.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActiveIndex(idx);
          }
        });
      },
      { root, threshold: [0.6] },
    );
    reelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [visibleReels]);

  // Reset to top when switching channel.
  useEffect(() => {
    setActiveIndex(0);
    setPlaying(true);
    containerRef.current?.scrollTo({ top: 0 });
  }, [channel]);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, visibleReels.length - 1));
      reelRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
    },
    [visibleReels.length],
  );

  const goNext = useCallback(
    () => scrollToIndex(activeIndex + 1),
    [activeIndex, scrollToIndex],
  );
  const goPrev = useCallback(
    () => scrollToIndex(activeIndex - 1),
    [activeIndex, scrollToIndex],
  );

  // Keyboard navigation (desktop).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (commentsOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, commentsOpen]);

  const toggleLike = (reelId: string) => {
    setLiked((prev) => {
      const next = { ...prev, [reelId]: !prev[reelId] };
      return next;
    });
    setExtraLikes((prev) => ({
      ...prev,
      [reelId]: (prev[reelId] ?? 0) + (liked[reelId] ? -1 : 1),
    }));
  };

  const toggleSave = (reelId: string) => {
    const wasSaved = saved[reelId];
    setSaved((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
    toast(wasSaved ? "Removed from saved" : "Saved to your reels ✓", "info");
  };

  const share = () => {
    toast("Link copied — share this reel ✓");
  };

  const follow = (name: string) => {
    toast(`Following ${name} ✓`);
  };

  const addComment = (reelId: string, text: string) => {
    setCommentsMap((prev) => ({
      ...prev,
      [reelId]: [
        ...(prev[reelId] ?? []),
        {
          id: `you-${Date.now()}`,
          author: "You",
          avatar: YOU_AVATAR,
          text,
        },
      ],
    }));
  };

  const commentSheetReel = sheetReelId
    ? allReels.find((r) => r.id === sheetReelId)
    : null;
  const commentSheetTrainer = commentSheetReel
    ? trainerBySlug[commentSheetReel.trainerSlug]
    : null;

  const activeImage = visibleReels[activeIndex]?.image ?? visibleReels[0]?.image;

  return (
    <div className="relative min-h-[100dvh] bg-ink-950">
      {/* Ambient blurred backdrop — fills the desktop void with the live reel */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {activeImage && (
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover blur-[80px] brightness-[0.4] saturate-150"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(194,242,42,0.08),transparent_70%)]" />
      </div>

      {/* Floating exit / brand (no site navbar on this immersive page) */}
      <Link
        href="/"
        aria-label="Back to FitNear"
        className="glass fixed left-4 top-4 z-40 inline-flex items-center gap-2 rounded-full py-2 pl-2.5 pr-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-lime-300">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink-900" fill="none">
            <path d="M4 12h3l1.5-3.5L11 15l2-6 1.5 3H20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>

      {/* Following / For You tabs — a clean header above the reel */}
      <div className="pointer-events-none fixed inset-x-0 top-5 z-40 flex justify-center">
        <div
          role="tablist"
          aria-label="Reel feed"
          className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1 text-sm font-semibold"
        >
          {(
            [
              { id: "following", label: "Following" },
              { id: "foryou", label: "For You" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={channel === t.id}
              onClick={() => setChannel(t.id)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                channel === t.id
                  ? "bg-white text-ink-900"
                  : "text-white/70 hover:text-white",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop up/down navigation */}
      <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous reel"
          className="glass pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          disabled={activeIndex >= visibleReels.length - 1}
          aria-label="Next reel"
          className="glass pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* Centering stage — full-bleed on mobile, floating 9:16 phone on desktop */}
      <div className="relative z-10 flex min-h-[100dvh] items-stretch justify-center sm:items-center sm:py-4">
      {/* Phone frame (fixed 9:16 on desktop) */}
      <div className="relative h-[100dvh] w-full sm:h-[80dvh] sm:max-h-[800px] sm:w-[45dvh] sm:max-w-[450px] sm:overflow-hidden sm:rounded-[2rem] sm:shadow-[0_40px_120px_-24px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-white/12">
      <div
        ref={containerRef}
        className="no-scrollbar absolute inset-0 snap-y snap-mandatory overflow-y-scroll overscroll-y-contain"
      >
        {visibleReels.length === 0 ? (
          <div className="flex h-full snap-start flex-col items-center justify-center px-8 text-center">
            <Sparkles className="h-10 w-10 text-lime-300" aria-hidden />
            <p className="font-display mt-4 text-lg font-semibold text-fg-invert">
              You&apos;re all caught up
            </p>
            <p className="mt-1 max-w-xs text-sm text-fg-invert-muted">
              Follow trainers from the For You feed and their reels will land
              here.
            </p>
            <button
              onClick={() => setChannel("foryou")}
              className="mt-5 rounded-full bg-lime-300 px-5 py-2 text-sm font-semibold text-ink-900"
            >
              Explore For You
            </button>
          </div>
        ) : (
          visibleReels.map((reel, i) => {
            const trainer = trainerBySlug[reel.trainerSlug];
            if (!trainer) return null;
            const isActive = i === activeIndex;
            const comments = commentsMap[reel.id] ?? reel.comments;
            return (
              <div
                key={reel.id}
                data-index={i}
                ref={(el) => {
                  reelRefs.current[i] = el;
                }}
                className="h-full w-full snap-start snap-always"
              >
                <ReelCard
                  reel={reel}
                  trainer={trainer}
                  active={isActive}
                  playing={isActive && playing}
                  muted={muted}
                  liked={!!liked[reel.id]}
                  saved={!!saved[reel.id]}
                  likeCount={reel.likes + (extraLikes[reel.id] ?? 0)}
                  commentCount={comments.length}
                  onTogglePlay={() => setPlaying((p) => !p)}
                  onToggleMute={() => setMuted((m) => !m)}
                  onComplete={goNext}
                  onLike={() => toggleLike(reel.id)}
                  onSave={() => toggleSave(reel.id)}
                  onShare={share}
                  onOpenComments={() => {
                    setPlaying(false);
                    setSheetReelId(reel.id);
                    setCommentsOpen(true);
                  }}
                  onFollow={() => follow(trainer.name)}
                />
              </div>
            );
          })
        )}
      </div>
      </div>
      </div>

      {/* Reel counter */}
      {visibleReels.length > 0 && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur sm:hidden">
          {activeIndex + 1} / {visibleReels.length}
        </div>
      )}

      {/* Comments bottom sheet — stays mounted so its exit animation plays */}
      {commentSheetReel && commentSheetTrainer && (
        <div className="fixed inset-0 z-40" style={{ pointerEvents: commentsOpen ? "auto" : "none" }}>
          <CommentsSheet
            open={commentsOpen}
            onClose={() => setCommentsOpen(false)}
            trainerName={commentSheetTrainer.name}
            comments={commentsMap[commentSheetReel.id] ?? commentSheetReel.comments}
            onAddComment={(text) => addComment(commentSheetReel.id, text)}
          />
        </div>
      )}
    </div>
  );
}
