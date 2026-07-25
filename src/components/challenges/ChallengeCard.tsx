"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Check, Plus, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VerifiedBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Challenge } from "@/data/challenges";
import type { Trainer } from "@/lib/types";
import type { ChallengeProgress } from "@/lib/challengeStore";

const difficultyStyle: Record<Challenge["difficulty"], string> = {
  Beginner: "bg-emerald-500/15 text-emerald-700",
  Intermediate: "bg-amber-500/15 text-amber-700",
  Advanced: "bg-rose-500/15 text-rose-700",
};

export function ChallengeCard({
  challenge,
  host,
  progress,
  mounted,
  onToggleJoin,
}: {
  challenge: Challenge;
  host?: Trainer;
  progress: ChallengeProgress;
  mounted: boolean;
  onToggleJoin: () => void;
}) {
  const joined = mounted && progress.joined;
  const pct = Math.min(
    100,
    Math.round((progress.checkIns / challenge.durationDays) * 100),
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]">
      {/* Cover */}
      <Link
        href={`/challenges/${challenge.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-900"
      >
        <Image
          src={challenge.cover}
          alt={challenge.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"
          className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            {challenge.categoryLabel}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md",
              difficultyStyle[challenge.difficulty],
            )}
          >
            {challenge.difficulty}
          </span>
        </div>
        <h3 className="font-display absolute inset-x-0 bottom-0 p-4 text-lg font-bold leading-tight text-white">
          {challenge.title}
        </h3>
        {joined && (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-lime-300 px-2.5 py-1 text-[11px] font-bold text-ink-900">
            <Check className="h-3 w-3" /> Joined
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 text-sm text-fg-muted">{challenge.tagline}</p>

        {/* Host */}
        {host && (
          <Link
            href={`/trainer/${host.slug}`}
            className="mt-3 inline-flex items-center gap-2 self-start text-sm"
          >
            <Image
              src={host.avatar}
              alt={host.name}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="font-semibold text-fg hover:text-lime-600">
              {host.name}
            </span>
            {host.verified && <VerifiedBadge label={false} />}
          </Link>
        )}

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-fg-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden /> {challenge.durationDays} days
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden />{" "}
            {challenge.participants.toLocaleString("en-US")} joined
          </span>
        </div>

        {/* Reward */}
        <p className="mt-3 flex items-start gap-2 rounded-2xl bg-mist px-3 py-2 text-xs font-medium text-fg">
          <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-600" aria-hidden />
          <span className="line-clamp-2">{challenge.reward}</span>
        </p>

        {/* Progress (joined) */}
        {joined && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-fg-muted">
                <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden />
                {progress.streak}-day streak
              </span>
              <span className="text-lime-700">{pct}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${challenge.title} progress`}
            >
              <div
                className="h-full rounded-full bg-lime-300 transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant={joined ? "outline" : "primary"}
            size="sm"
            className="flex-1"
            onClick={onToggleJoin}
            aria-pressed={joined}
            disabled={!mounted}
          >
            {joined ? (
              <>
                <Check className="h-4 w-4" /> Joined
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Join
              </>
            )}
          </Button>
          <Link
            href={`/challenges/${challenge.slug}`}
            className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold text-fg hover:bg-ink-900/[0.05]"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
