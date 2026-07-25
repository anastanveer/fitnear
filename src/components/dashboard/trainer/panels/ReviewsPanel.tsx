"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RatingStars } from "@/components/ui/RatingStars";
import { Chip } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import {
  dashboardReviews,
  ratingBreakdown,
} from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";

export function ReviewsPanel() {
  const total = ratingBreakdown.reduce((s, r) => s + r.count, 0);
  const avg =
    ratingBreakdown.reduce((s, r) => s + r.stars * r.count, 0) / total;

  return (
    <div>
      <PanelHeader
        title="Reviews"
        subtitle="What your clients are saying about training with you."
      />

      {/* Summary */}
      <Card className="mb-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="text-center sm:w-40 sm:shrink-0">
            <div className="font-display text-5xl font-bold text-fg">
              {avg.toFixed(1)}
            </div>
            <RatingStars rating={avg} className="mt-2 justify-center" />
            <div className="mt-1 text-sm text-fg-muted">{total} reviews</div>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-sm">
                <span className="w-3 shrink-0 font-medium text-fg-muted">
                  {r.stars}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                  <motion.div
                    className="h-full rounded-full bg-lime-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.count / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-fg-muted">
                  {r.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Review list */}
      <StaggerGroup className="grid gap-4 sm:grid-cols-2">
        {dashboardReviews.map((r) => (
          <StaggerItem key={r.id}>
            <div className="h-full rounded-3xl border border-ink-900/8 bg-white p-5">
              <div className="flex items-center gap-3">
                <Image
                  src={r.avatar}
                  alt={r.author}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-bold text-fg">
                    {r.author}
                  </div>
                  <div className="text-xs text-fg-muted">
                    {new Date(r.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <RatingStars rating={r.rating} className="[&>span:last-child]:hidden" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg">{r.text}</p>
              {r.goal && (
                <Chip className="mt-3 bg-ink-900/[0.04]">{r.goal}</Chip>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
