"use client";

import { useEffect, useMemo, useState } from "react";
import { Trophy, Users, Flame } from "lucide-react";
import { trainers } from "@/data/trainers";
import {
  challenges,
  challengeFilters,
  type ChallengeCategory,
} from "@/data/challenges";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import {
  loadChallenges,
  saveChallenges,
  toggleJoined,
  emptyProgress,
  type ChallengeState,
} from "@/lib/challengeStore";
import { ChallengeCard } from "./ChallengeCard";

const trainerBySlug = Object.fromEntries(trainers.map((t) => [t.slug, t]));

type FilterKey = "all" | ChallengeCategory;

export function ChallengesPage() {
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ChallengeState>({});
  const [filter, setFilter] = useState<FilterKey>("all");

  useEffect(() => {
    setState(loadChallenges());
    setMounted(true);
  }, []);

  function handleToggle(slug: string, title: string) {
    setState((prev) => {
      const next = toggleJoined(prev, slug);
      saveChallenges(next);
      toast(
        next[slug].joined
          ? `You joined ${title} ✓`
          : `You left ${title}`,
        next[slug].joined ? "success" : "info",
      );
      return next;
    });
  }

  const visible = useMemo(
    () =>
      filter === "all"
        ? challenges
        : challenges.filter((c) => c.category === filter),
    [filter],
  );

  const joinedCount = mounted
    ? Object.values(state).filter((p) => p.joined).length
    : 0;
  const totalParticipants = challenges.reduce(
    (sum, c) => sum + c.participants,
    0,
  );

  return (
    <main className="min-h-screen bg-cloud pb-24 pt-28">
      <Container>
        {/* Hero */}
        <Reveal>
          <Eyebrow>City Challenges</Eyebrow>
          <h1 className="display-2 font-display mt-3 max-w-3xl font-bold text-balance">
            Join a challenge. Move with the city.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted text-pretty">
            Streak-based community challenges hosted by verified FitNear coaches
            across Dubai and Abu Dhabi. Check in daily, climb the leaderboard and
            win real rewards.
          </p>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={0.08}>
          <dl className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
            <Stat
              icon={<Trophy className="h-4 w-4 text-lime-600" />}
              value={challenges.length}
              label="Live challenges"
            />
            <Stat
              icon={<Users className="h-4 w-4 text-lime-600" />}
              value={totalParticipants}
              label="Residents moving"
            />
            <Stat
              icon={<Flame className="h-4 w-4 text-lime-600" />}
              value={joinedCount}
              label="You've joined"
              suppressHydrationWarning
            />
          </dl>
        </Reveal>

        {/* Filters */}
        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
          {challengeFilters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-ink-900 bg-ink-900 text-fg-invert"
                    : "border-ink-900/12 bg-white text-fg hover:border-ink-900/30",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {mounted ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((c) => (
              <ChallengeCard
                key={c.slug}
                challenge={c}
                host={trainerBySlug[c.hostSlug]}
                progress={state[c.slug] ?? emptyProgress()}
                mounted={mounted}
                onToggleJoin={() => handleToggle(c.slug, c.title)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c) => (
              <div
                key={c.slug}
                className="skeleton h-[26rem] rounded-3xl"
                aria-hidden
              />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <p className="mt-16 text-center text-fg-muted">
            No challenges in this category yet — check back soon.
          </p>
        )}
      </Container>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
  suppressHydrationWarning,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  suppressHydrationWarning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-ink-900/8 bg-white px-4 py-3">
      <div className="flex items-center gap-1.5">{icon}</div>
      <dd
        className="font-display mt-1 text-2xl font-bold text-fg"
        suppressHydrationWarning={suppressHydrationWarning}
      >
        <Counter to={value} />
      </dd>
      <dt className="text-xs font-medium text-fg-muted">{label}</dt>
    </div>
  );
}
