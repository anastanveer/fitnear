"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Users,
  Flame,
  Trophy,
  Check,
  Share2,
  Target,
  ChevronRight,
  MapPin,
  Plus,
  TrendingUp,
} from "lucide-react";
import { trainers } from "@/data/trainers";
import { challengeBySlug } from "@/data/challenges";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { VerifiedBadge, Chip } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import {
  loadChallenges,
  saveChallenges,
  toggleJoined,
  checkIn,
  canCheckIn,
  userPoints,
  emptyProgress,
  todayKey,
  type ChallengeState,
  type ChallengeProgress,
} from "@/lib/challengeStore";
import { ProgressRing } from "./ProgressRing";
import { Leaderboard } from "./Leaderboard";

const trainerBySlug = Object.fromEntries(trainers.map((t) => [t.slug, t]));

export function ChallengeDetail({ slug }: { slug: string }) {
  const toast = useToast();
  const challenge = challengeBySlug[slug];
  const host = challenge ? trainerBySlug[challenge.hostSlug] : undefined;

  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ChallengeState>({});

  useEffect(() => {
    setState(loadChallenges());
    setMounted(true);
  }, []);

  if (!challenge) return null;

  const progress: ChallengeProgress = state[slug] ?? emptyProgress();
  const joined = mounted && progress.joined;
  const checkedInToday = progress.lastCheckIn === todayKey();
  const points = userPoints(progress, challenge.pointsPerCheckIn);

  function handleJoin() {
    setState((prev) => {
      const next = toggleJoined(prev, slug);
      saveChallenges(next);
      toast(
        next[slug].joined
          ? `You joined ${challenge.title} ✓`
          : `You left ${challenge.title}`,
        next[slug].joined ? "success" : "info",
      );
      return next;
    });
  }

  function handleCheckIn() {
    setState((prev) => {
      const next = checkIn(prev, slug);
      saveChallenges(next);
      const p = next[slug];
      toast(`Checked in — ${p.streak}-day streak 🔥`);
      return next;
    });
  }

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://fitnear.ae/challenges/${slug}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: challenge.title, url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      toast("Challenge link copied — invite the group!");
    } catch {
      /* user dismissed share sheet — no-op */
    }
  }

  return (
    <main className="bg-cloud pb-24">
      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-ink-900">
        <Image
          src={challenge.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <Container className="relative pb-10 pt-28">
          <Link
            href="/challenges"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All challenges
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-ink-900">
              {challenge.categoryLabel}
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {challenge.difficulty}
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {challenge.startLabel}
            </span>
          </div>

          <h1 className="display-3 font-display mt-4 max-w-3xl font-bold text-white text-balance">
            {challenge.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80 text-pretty">
            {challenge.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white/85">
            {host && (
              <Link
                href={`/trainer/${host.slug}`}
                className="inline-flex items-center gap-2"
              >
                <Image
                  src={host.avatar}
                  alt={host.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20"
                />
                <span>
                  Hosted by <span className="font-semibold">{host.name}</span>
                </span>
                {host.verified && <VerifiedBadge label={false} />}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden /> {challenge.durationDays} days
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden />{" "}
              {challenge.participants.toLocaleString("en-US")} joined
            </span>
          </div>
        </Container>
      </header>

      <Container className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          {/* Main */}
          <div className="min-w-0 space-y-10">
            <Reveal>
              <section>
                <h2 className="font-display text-xl font-bold">About this challenge</h2>
                <p className="mt-3 leading-relaxed text-fg">{challenge.description}</p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-xl font-bold">How it works</h2>
                <ol className="mt-4 space-y-3">
                  {challenge.rules.map((rule, i) => (
                    <li
                      key={rule.title}
                      className="flex gap-4 rounded-2xl border border-ink-900/8 bg-white p-4"
                    >
                      <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-300/20 text-sm font-bold text-lime-700">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-fg">{rule.title}</p>
                        <p className="mt-0.5 text-sm text-fg-muted">{rule.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            {/* Reward */}
            <Reveal>
              <section className="surface-dark grain glow-lime relative overflow-hidden rounded-3xl p-6 sm:p-7">
                <div className="relative flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-ink-900">
                    <Trophy className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
                      The reward
                    </p>
                    <p className="mt-2 text-lg font-semibold text-fg-invert text-pretty">
                      {challenge.reward}
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Leaderboard */}
            <Reveal>
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-lime-600" aria-hidden />
                  <h2 className="font-display text-xl font-bold">Leaderboard</h2>
                </div>
                <Leaderboard
                  entries={challenge.leaderboard}
                  you={joined ? { points, streak: progress.streak } : null}
                />
                {!joined && (
                  <p className="mt-3 text-sm text-fg-muted">
                    Join the challenge and check in daily to appear on the board and
                    climb the ranks.
                  </p>
                )}
              </section>
            </Reveal>

            {/* Host card */}
            {host && (
              <Reveal>
                <section>
                  <h2 className="font-display mb-4 text-xl font-bold">Your host</h2>
                  <div className="flex flex-col gap-4 rounded-3xl border border-ink-900/8 bg-white p-5 sm:flex-row sm:items-center">
                    <Image
                      src={host.avatar}
                      alt={host.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-display font-semibold text-fg">{host.name}</p>
                        {host.verified && <VerifiedBadge label={false} />}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-sm text-fg-muted">
                        {host.headline}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Chip>
                          <MapPin className="mr-1 h-3 w-3" /> {host.area}
                        </Chip>
                        <Chip>{host.experienceYears} yrs experience</Chip>
                      </div>
                    </div>
                    <ButtonLink
                      href={`/trainer/${host.slug}`}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      View profile <ChevronRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* Sidebar — check-in widget */}
          <aside className="lg:relative">
            <div className="space-y-4 lg:sticky lg:top-24">
              {!mounted ? (
                <div className="skeleton h-80 rounded-3xl" aria-hidden />
              ) : (
                <div className="rounded-3xl border border-ink-900/8 bg-white p-6">
                  {joined ? (
                    <>
                      <div className="flex flex-col items-center text-center">
                        <ProgressRing
                          value={progress.checkIns}
                          total={challenge.durationDays}
                          label="days"
                        />
                        <div className="mt-4 flex items-center gap-4">
                          <div className="text-center">
                            <p className="font-display text-xl font-bold text-fg">
                              {progress.streak}
                            </p>
                            <p className="inline-flex items-center gap-1 text-xs text-fg-muted">
                              <Flame className="h-3 w-3 text-orange-400" /> streak
                            </p>
                          </div>
                          <div className="h-8 w-px bg-line" />
                          <div className="text-center">
                            <p className="font-display text-xl font-bold text-fg">
                              {points.toLocaleString("en-US")}
                            </p>
                            <p className="text-xs text-fg-muted">points</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="mt-6 w-full"
                        onClick={handleCheckIn}
                        disabled={!canCheckIn(progress)}
                      >
                        {checkedInToday ? (
                          <>
                            <Check className="h-5 w-5" /> Checked in today
                          </>
                        ) : (
                          <>
                            <Target className="h-5 w-5" /> {challenge.dailyGoal}
                          </>
                        )}
                      </Button>
                      {checkedInToday && (
                        <p className="mt-2 text-center text-xs text-fg-muted">
                          Come back tomorrow to keep your streak alive.
                        </p>
                      )}

                      <div className="mt-3 flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={handleJoin}
                        >
                          Leave
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={handleShare}
                        >
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-lg font-bold">
                        Ready to move with the city?
                      </p>
                      <p className="mt-1 text-sm text-fg-muted">
                        Join {challenge.participants.toLocaleString("en-US")} residents.
                        Check in daily, build a streak, climb the board.
                      </p>
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="mt-5 w-full"
                        onClick={handleJoin}
                      >
                        <Plus className="h-5 w-5" /> Join challenge
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" /> Share with a friend
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
