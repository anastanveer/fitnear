"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { goals } from "@/data/categories";
import type { SportSlug } from "@/lib/types";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

/** Maps a discovery goal to the sport used by the search page. */
const goalToSport: Record<string, SportSlug> = {
  "lose-weight": "personal-training",
  "build-muscle": "strength",
  "learn-swimming": "swimming",
  "boxing-fitness": "boxing",
  "yoga-mobility": "yoga",
  "football-coaching": "football",
  rehab: "yoga",
  endurance: "running",
};

export function GoalDiscovery() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Start with your goal</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              What do you want to achieve?
            </h2>
            <p className="mt-4 text-fg-muted">
              Tell us your goal and we&apos;ll point you to the trainers who
              specialise in getting you there.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {goals.map((g, i) => {
            const Icon =
              (Icons[g.icon as keyof typeof Icons] as Icons.LucideIcon) ??
              Icons.Target;
            const sport = goalToSport[g.slug] ?? "personal-training";
            return (
              <motion.div
                key={g.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 4) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/search?sport=${sport}`}
                  className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-5 transition-all hover:-translate-y-1 hover:border-lime-400/50 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:h-40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-lime-300 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold leading-tight sm:text-lg">
                      {g.label}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-lime-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Find trainers
                      <Icons.ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-lime-300 opacity-0 blur-2xl transition-opacity group-hover:opacity-40" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
