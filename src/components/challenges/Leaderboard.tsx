"use client";

import Image from "next/image";
import { Crown, Medal, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/data/challenges";

interface Row extends LeaderboardEntry {
  isYou?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  you?: { points: number; streak: number } | null; // present when joined
}

const rankMeta = [
  { icon: Crown, className: "text-lime-500" },
  { icon: Medal, className: "text-amber-500" },
  { icon: Medal, className: "text-orange-400" },
];

export function Leaderboard({ entries, you }: LeaderboardProps) {
  const rows: Row[] = [...entries];
  if (you) {
    rows.push({
      id: "you",
      name: "You",
      avatar: "",
      area: "Your streak",
      points: you.points,
      streak: you.streak,
      isYou: true,
    });
  }
  rows.sort((a, b) => b.points - a.points);

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-900/8 bg-white">
      <div className="flex items-center justify-between border-b border-ink-900/8 px-5 py-4">
        <h3 className="font-display text-base font-bold">City leaderboard</h3>
        <span className="text-xs font-medium text-fg-muted">
          {rows.length} moving together
        </span>
      </div>
      <ol className="divide-y divide-ink-900/6">
        {rows.map((row, i) => {
          const rank = i + 1;
          const meta = rankMeta[i];
          return (
            <li
              key={row.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 sm:px-5",
                row.isYou && "bg-lime-300/15",
              )}
              aria-current={row.isYou ? "true" : undefined}
            >
              <span className="flex w-7 shrink-0 items-center justify-center">
                {meta ? (
                  <meta.icon className={cn("h-5 w-5", meta.className)} aria-hidden />
                ) : (
                  <span className="text-sm font-semibold text-fg-muted tabular-nums">
                    {rank}
                  </span>
                )}
              </span>

              {row.isYou ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-lime-300">
                  You
                </span>
              ) : (
                <Image
                  src={row.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              )}

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-sm font-semibold",
                    row.isYou ? "text-lime-700" : "text-fg",
                  )}
                >
                  {row.name}
                  {row.isYou && (
                    <span className="ml-2 rounded-full bg-lime-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-900">
                      Rank #{rank}
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-fg-muted">{row.area}</p>
              </div>

              <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-fg-muted sm:inline-flex">
                <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden />
                {row.streak}d
              </span>
              <span className="w-16 shrink-0 text-right text-sm font-bold tabular-nums text-fg">
                {row.points.toLocaleString("en-US")}
                <span className="ml-0.5 text-[10px] font-medium text-fg-muted">pts</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
