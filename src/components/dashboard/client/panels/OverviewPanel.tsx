"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/shared/Counter";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerifiedBadge } from "@/components/ui/Badge";
import { ClientAvatar } from "@/components/dashboard/shared/client-ui";
import { cn, aed } from "@/lib/utils";
import { trainerBySlug } from "@/data/trainers";
import {
  clientProfile,
  statTiles,
  upcomingSessions,
} from "@/data/clientDashboard";
import type { SectionKey } from "@/components/dashboard/client/sections";

const tileIcons: Record<string, React.ReactNode> = {
  upcoming: <Calendar className="h-5 w-5" />,
  saved: <Heart className="h-5 w-5" />,
  spent: <Wallet className="h-5 w-5" />,
  completed: <TrendingUp className="h-5 w-5" />,
};

export function OverviewPanel({ onNavigate }: { onNavigate: (s: SectionKey) => void }) {
  const next = upcomingSessions.find((s) => s.isNext) ?? upcomingSessions[0];
  const nextTrainer = trainerBySlug[next.trainerSlug];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fg-muted">
            {new Date().toLocaleDateString("en-AE", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-fg sm:text-4xl">
            Welcome back, {clientProfile.firstName}
          </h1>
          <p className="mt-1.5 text-sm text-fg-muted">
            You have {upcomingSessions.length} sessions coming up. Keep the streak going.
          </p>
        </div>
        <ButtonLink href="/search" variant="primary" size="md" className="self-start">
          Find a trainer
          <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statTiles.map((tile, i) => (
          <motion.button
            key={tile.key}
            type="button"
            onClick={() =>
              onNavigate(
                tile.key === "saved"
                  ? "saved"
                  : tile.key === "spent"
                    ? "payments"
                    : tile.key === "completed"
                      ? "history"
                      : "upcoming",
              )
            }
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-2xl border border-ink-900/8 bg-white p-5 text-left transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/20 text-lime-700">
                {tileIcons[tile.key]}
              </span>
              <ArrowUpRight className="h-4 w-4 text-fg-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-4 font-display text-3xl font-bold text-fg">
              <Counter
                to={tile.value}
                prefix={tile.prefix}
                suffix={tile.suffix}
                decimals={tile.decimals}
              />
            </div>
            <p className="mt-0.5 text-sm font-medium text-fg">{tile.label}</p>
            <p className="mt-1 text-xs text-fg-muted">{tile.hint}</p>
          </motion.button>
        ))}
      </div>

      {/* Next session highlight + tips */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Highlight (dark) */}
        <div className="surface-dark grain relative overflow-hidden rounded-3xl p-6 lg:col-span-2 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 glow-lime opacity-40" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
              <Sparkles className="h-3.5 w-3.5" /> Your next session
            </span>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <ClientAvatar
                  src={nextTrainer.avatar}
                  alt={nextTrainer.name}
                  size={64}
                  className="rounded-2xl border-2 border-lime-300/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-fg-invert">
                      {nextTrainer.name}
                    </h2>
                    {nextTrainer.verified && <VerifiedBadge label={false} />}
                  </div>
                  <p className="mt-1 text-sm text-fg-invert-muted">
                    {nextTrainer.headline.split("—")[0].trim()}
                  </p>
                  <div className="mt-2">
                    <RatingStars
                      rating={nextTrainer.rating}
                      count={nextTrainer.reviewCount}
                      dark
                    />
                  </div>
                </div>
              </div>

              <div className="font-display text-2xl font-bold text-lime-300">
                {aed(next.price)}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <DarkFact icon={<Calendar className="h-4 w-4" />} label={next.dateLabel} />
              <DarkFact
                icon={<Clock className="h-4 w-4" />}
                label={`${next.timeLabel} · ${next.durationMin} min`}
              />
              <DarkFact icon={<MapPin className="h-4 w-4" />} label={next.location} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate("messages")}
              >
                <MessageCircle className="h-4 w-4" /> Message {nextTrainer.name.split(" ")[0]}
              </Button>
              <Link
                href={`/trainer/${nextTrainer.slug}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-fg-invert transition-colors hover:bg-white/10"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-3xl border border-ink-900/8 bg-white p-6">
          <h3 className="font-display text-lg font-semibold text-fg">
            Quick actions
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            Jump straight to what matters.
          </p>
          <div className="mt-4 space-y-2.5">
            {(
              [
                { key: "saved", label: "Your saved trainers", icon: <Heart className="h-4 w-4" /> },
                { key: "reviews", label: "Rate recent sessions", icon: <Sparkles className="h-4 w-4" /> },
                { key: "recommended", label: "Recommended for you", icon: <TrendingUp className="h-4 w-4" /> },
                { key: "settings", label: "Profile settings", icon: <MapPin className="h-4 w-4" /> },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key as SectionKey)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border border-ink-900/8 bg-cloud px-4 py-3 text-left text-sm font-medium text-fg transition-colors hover:border-lime-400/50 hover:bg-lime-300/10",
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lime-700">
                  {item.icon}
                </span>
                {item.label}
                <ArrowUpRight className="ml-auto h-4 w-4 text-fg-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkFact({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white/5 px-4 py-3">
      <span className="text-lime-300">{icon}</span>
      <span className="text-sm font-medium text-fg-invert">{label}</span>
    </div>
  );
}
