"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  Trophy,
  Flame,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const features = [
  {
    href: "/ai-coach",
    icon: Sparkles,
    title: "AI Coach",
    text: "Chat to an AI concierge that reads every trainer and hands you the perfect match + a starter plan.",
    badge: "New",
    featured: true,
  },
  {
    href: "/reels",
    icon: Play,
    title: "Trainer Reels",
    text: "Swipe short clips from real coaches. Discover, follow and book — the way you actually browse.",
  },
  {
    href: "/challenges",
    icon: Trophy,
    title: "City Challenges",
    text: "Join city-wide challenges, climb the leaderboard, and move with thousands across the UAE.",
  },
  {
    href: "/progress",
    icon: Flame,
    title: "Progress & Streaks",
    text: "Log workouts, track measurements and keep your streak alive with badges and milestones.",
  },
  {
    href: "/community",
    icon: Users,
    title: "Community Feed",
    text: "Wins, tips and open slots posted by trainers near you. Like, comment and never miss a session.",
  },
];

export function ExploreFeatures() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Beyond a directory</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              More ways to move with FitNear
            </h2>
            <p className="mt-4 text-fg-muted">
              A full fitness ecosystem — not just search. Discover, get matched,
              stay motivated and grow together.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={f.featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
            >
              <Link
                href={f.href}
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1",
                  f.featured
                    ? "surface-dark grain lg:min-h-full"
                    : "border border-ink-900/8 bg-white hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)]",
                )}
              >
                {f.featured && (
                  <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 glow-lime opacity-40" />
                )}
                <div className="relative flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
                      f.featured
                        ? "bg-lime-300 text-ink-900"
                        : "bg-ink-900 text-lime-300",
                    )}
                  >
                    <f.icon className="h-6 w-6" />
                  </span>
                  {f.badge ? (
                    <span className="rounded-full bg-lime-300 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-900">
                      {f.badge}
                    </span>
                  ) : (
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        "text-fg-muted",
                      )}
                    />
                  )}
                </div>

                <div className="relative mt-8">
                  <h3
                    className={cn(
                      "font-display text-xl font-semibold",
                      f.featured && "text-fg-invert",
                    )}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      f.featured ? "text-fg-invert-muted" : "text-fg-muted",
                    )}
                  >
                    {f.text}
                  </p>
                  <span
                    className={cn(
                      "mt-4 inline-flex items-center gap-1 text-sm font-semibold",
                      f.featured ? "text-lime-300" : "text-lime-600",
                    )}
                  >
                    Explore
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
