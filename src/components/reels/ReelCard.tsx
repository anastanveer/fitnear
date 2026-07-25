"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Music2,
  Plus,
} from "lucide-react";
import type { Trainer } from "@/lib/types";
import type { Reel } from "@/data/reels";
import { ButtonLink } from "@/components/ui/Button";
import { VerifiedBadge } from "@/components/ui/Badge";
import { cn, aed } from "@/lib/utils";

const sportLabels: Record<string, string> = {
  "personal-training": "Personal Training",
  swimming: "Swimming",
  boxing: "Boxing",
  yoga: "Yoga & Mobility",
  football: "Football",
  tennis: "Tennis",
  running: "Running",
  strength: "Strength",
};

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}

interface ReelCardProps {
  reel: Reel;
  trainer: Trainer;
  active: boolean;
  playing: boolean;
  muted: boolean;
  liked: boolean;
  saved: boolean;
  likeCount: number;
  commentCount: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onComplete: () => void;
  onLike: () => void;
  onSave: () => void;
  onShare: () => void;
  onOpenComments: () => void;
  onFollow: () => void;
}

export function ReelCard({
  reel,
  trainer,
  active,
  playing,
  muted,
  liked,
  saved,
  likeCount,
  commentCount,
  onTogglePlay,
  onToggleMute,
  onComplete,
  onLike,
  onSave,
  onShare,
  onOpenComments,
  onFollow,
}: ReelCardProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [following, setFollowing] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  // Progress loop — only runs for the active + playing reel.
  useEffect(() => {
    const durationMs = reel.duration * 1000;

    if (!active) {
      // Reset when the reel leaves the viewport.
      elapsedRef.current = 0;
      startRef.current = null;
      setProgress(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t - elapsedRef.current;
      const elapsed = t - startRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min(elapsed / durationMs, 1);
      setProgress(pct);
      if (pct >= 1) {
        elapsedRef.current = 0;
        startRef.current = null;
        setProgress(0);
        onComplete();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, playing, reel.duration, onComplete]);

  // Ken-Burns — subtle scale + pan, disabled for reduced motion.
  const kenBurns: Variants = {
    still: { scale: 1.06, x: 0, y: 0 },
    move: {
      scale: [1.06, 1.16, 1.06],
      x: ["0%", "-2.5%", "0%"],
      y: ["0%", "2%", "0%"],
      transition: { duration: 16, ease: "easeInOut", repeat: Infinity },
    },
  };

  const handleDoubleLike = () => {
    if (!liked) onLike();
    setBurst(true);
    setTimeout(() => setBurst(false), 650);
  };

  const railBtn =
    "group flex flex-col items-center gap-1 text-white transition active:scale-90";
  const railIcon =
    "grid h-11 w-11 place-items-center rounded-full bg-white/12 backdrop-blur transition group-hover:bg-white/20";

  return (
    <article className="relative h-full w-full overflow-hidden bg-ink-950">
      {/* Ken-Burns background "clip" */}
      <motion.div
        className="absolute inset-0"
        variants={kenBurns}
        initial="still"
        animate={active && playing && !reduce ? "move" : "still"}
      >
        <Image
          src={reel.image}
          alt={`${trainer.name} — ${sportLabels[reel.sport]} session in ${trainer.area}`}
          fill
          priority={active}
          sizes="(min-width: 480px) 420px, 100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Readability gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Progress bar (sits under the tabs pill / navbar zone) */}
      <div className="absolute inset-x-3 top-12 z-10 h-[3px] overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-lime-300"
          style={{ width: `${progress * 100}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Reel progress"
        />
      </div>

      {/* Tap-to-pause layer + centre play affordance */}
      <button
        type="button"
        onClick={onTogglePlay}
        onDoubleClick={handleDoubleLike}
        aria-label={playing ? "Pause reel" : "Play reel"}
        aria-pressed={!playing}
        className="absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none"
      >
        {active && !playing && (
          <span className="grid h-20 w-20 place-items-center rounded-full bg-black/40 backdrop-blur-sm">
            <Play className="h-9 w-9 translate-x-0.5 fill-white text-white" />
          </span>
        )}
      </button>

      {/* Double-tap like burst */}
      {burst && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          aria-hidden
        >
          <Heart className="h-28 w-28 fill-lime-300 text-lime-300 drop-shadow-2xl" />
        </motion.div>
      )}

      {/* Top-right: play/pause + mute mini controls */}
      <div className="absolute right-3 top-[3.5rem] z-20 flex gap-2">
        <button
          onClick={onTogglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
        >
          {playing ? (
            <Pause className="h-4 w-4 fill-white" />
          ) : (
            <Play className="h-4 w-4 translate-x-0.5 fill-white" />
          )}
        </button>
        <button
          onClick={onToggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/20"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Right action rail */}
      <div className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-5 sm:bottom-24">
        {/* trainer avatar + follow */}
        <div className="relative mb-1">
          <Link
            href={`/trainer/${trainer.slug}`}
            aria-label={`View ${trainer.name}'s profile`}
            className="block h-12 w-12 overflow-hidden rounded-full border-2 border-white"
          >
            <Image
              src={trainer.avatar}
              alt={trainer.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </Link>
          <button
            onClick={() => {
              setFollowing((f) => !f);
              onFollow();
            }}
            aria-label={following ? `Unfollow ${trainer.name}` : `Follow ${trainer.name}`}
            className={cn(
              "absolute -bottom-2 left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full transition",
              following ? "bg-white text-ink-900" : "bg-lime-300 text-ink-900",
            )}
          >
            <Plus
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                following && "rotate-45",
              )}
            />
          </button>
        </div>

        <button
          onClick={onLike}
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
          className={railBtn}
        >
          <span className={railIcon}>
            <motion.span
              key={liked ? "on" : "off"}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Heart
                className={cn(
                  "h-6 w-6",
                  liked ? "fill-rose-500 text-rose-500" : "text-white",
                )}
              />
            </motion.span>
          </span>
          <span className="text-xs font-semibold tabular-nums">
            {formatCount(likeCount)}
          </span>
        </button>

        <button
          onClick={onOpenComments}
          aria-label="View comments"
          className={railBtn}
        >
          <span className={railIcon}>
            <MessageCircle className="h-6 w-6 text-white" />
          </span>
          <span className="text-xs font-semibold tabular-nums">
            {formatCount(commentCount)}
          </span>
        </button>

        <button onClick={onSave} aria-label={saved ? "Remove bookmark" : "Save reel"} aria-pressed={saved} className={railBtn}>
          <span className={railIcon}>
            <Bookmark
              className={cn(
                "h-6 w-6",
                saved ? "fill-lime-300 text-lime-300" : "text-white",
              )}
            />
          </span>
          <span className="text-xs font-semibold">Save</span>
        </button>

        <button onClick={onShare} aria-label="Share reel" className={railBtn}>
          <span className={railIcon}>
            <Share2 className="h-6 w-6 text-white" />
          </span>
          <span className="text-xs font-semibold tabular-nums">
            {formatCount(reel.shares)}
          </span>
        </button>
      </div>

      {/* Bottom-left: trainer meta + caption */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 pr-20 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={`/trainer/${trainer.slug}`}
            className="font-display text-base font-bold text-white hover:underline"
          >
            {trainer.name}
          </Link>
          {trainer.verified && (
            <VerifiedBadge className="bg-white/15 text-lime-300" />
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-medium text-white/80">
          <span className="text-lime-300">{sportLabels[reel.sport]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {trainer.area}
          </span>
          <span>·</span>
          <span>{aed(trainer.hourlyRate)}/hr</span>
        </div>

        <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/95">
          {reel.caption}
        </p>

        <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-semibold text-lime-300">
          {reel.hashtags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        {/* music ticker */}
        <div className="mt-3 flex max-w-[16rem] items-center gap-2 overflow-hidden text-xs text-white/85">
          <Music2 className="h-3.5 w-3.5 shrink-0 text-lime-300" aria-hidden />
          <div className="no-scrollbar overflow-hidden whitespace-nowrap">
            <span className={cn(!reduce && "inline-block animate-marquee")}>
              {reel.music}&nbsp;&nbsp;·&nbsp;&nbsp;{reel.music}&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2">
          <ButtonLink
            href={`/trainer/${trainer.slug}`}
            variant="primary"
            size="sm"
            className="shadow-[0_8px_30px_-8px_rgba(204,250,60,0.6)]"
          >
            Book {trainer.name.split(" ")[0]}
          </ButtonLink>
          <ButtonLink
            href={`/trainer/${trainer.slug}`}
            variant="dark"
            size="sm"
            className="border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            View profile
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
