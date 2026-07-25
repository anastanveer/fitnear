"use client";

import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  BadgeCheck,
  Eye,
  Star,
  ArrowUp,
  Check,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Container";
import { aed } from "@/lib/utils";
import { PanelHeader } from "./_shared";

const benefits = [
  {
    icon: ArrowUp,
    title: "Priority placement",
    text: "Appear at the top of search results in your areas, above standard listings.",
  },
  {
    icon: BadgeCheck,
    title: "Featured badge",
    text: "A distinctive lime badge that signals quality and builds instant trust.",
  },
  {
    icon: Eye,
    title: "3× more profile views",
    text: "Featured trainers average three times the visibility of standard profiles.",
  },
  {
    icon: Star,
    title: "Homepage & category spotlights",
    text: "Rotate into the featured carousel across the FitNear homepage.",
  },
];

export function UpgradePanel() {
  return (
    <div>
      <PanelHeader
        title="Upgrade to Featured"
        subtitle="Stand out, get discovered first and win more clients across the UAE."
      />

      {/* Hero upsell */}
      <div className="relative overflow-hidden rounded-3xl surface-dark grain p-7 sm:p-10">
        <div className="glow-lime pointer-events-none absolute -right-24 -top-24 h-96 w-96" aria-hidden />
        <div className="relative">
          <Eyebrow dark>FitNear Featured</Eyebrow>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold text-fg-invert sm:text-4xl">
            Get seen first by clients searching near you
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-invert-muted">
            Featured trainers are placed ahead of the queue, carry a verified
            spotlight badge and consistently book more sessions. Cancel anytime.
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="font-display text-4xl font-bold text-lime-300">
              {aed(299)}
            </span>
            <span className="pb-1 text-sm text-fg-invert-muted">/ month</span>
            <span className="mb-1 ml-2 rounded-full bg-lime-300/15 px-2.5 py-1 text-xs font-semibold text-lime-300">
              First month 50% off
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/promote" size="lg">
              <Zap className="h-4 w-4 fill-ink-900" aria-hidden />
              Upgrade now
            </ButtonLink>
            <ButtonLink
              href="/promote#plans"
              variant="ghost"
              size="lg"
              className="text-fg-invert hover:bg-white/10"
            >
              Compare plans
            </ButtonLink>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-invert-muted">
            {["No lock-in contract", "Cancel anytime", "Instant activation"].map(
              (f) => (
                <li key={f} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-lime-300" aria-hidden />
                  {f}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Benefit grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-ink-900/8 bg-white p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink-900 text-lime-300">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-fg">
                {b.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{b.text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Projected impact strip */}
      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-3xl border border-lime-500/25 bg-lime-300/10 p-5">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-ink-900">
          <TrendingUp className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold text-fg">
            Projected impact for your profile
          </p>
          <p className="text-sm text-fg-muted">
            Based on Dubai Marina strength coaches, Featured could add an estimated{" "}
            <span className="font-semibold text-fg">+18 enquiries</span> and{" "}
            <span className="font-semibold text-fg">{aed(6200)}</span> in monthly
            earnings.
          </p>
        </div>
      </div>
    </div>
  );
}
