"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Check } from "lucide-react";
import { trainers } from "@/data/trainers";
import type { SportSlug, TrainingFormat, Gender } from "@/lib/types";
import { aed } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerifiedBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

type Step = {
  key: string;
  question: string;
  options: { label: string; value: string }[];
};

const steps: Step[] = [
  {
    key: "goal",
    question: "What's your main goal?",
    options: [
      { label: "Lose weight", value: "personal-training" },
      { label: "Build muscle", value: "strength" },
      { label: "Learn swimming", value: "swimming" },
      { label: "Boxing fitness", value: "boxing" },
      { label: "Yoga & mobility", value: "yoga" },
      { label: "Football coaching", value: "football" },
    ],
  },
  {
    key: "format",
    question: "Where do you want to train?",
    options: [
      { label: "At home", value: "home" },
      { label: "At a gym", value: "gym" },
      { label: "Outdoors", value: "outdoor" },
      { label: "Online", value: "online" },
    ],
  },
  {
    key: "budget",
    question: "What's your budget per hour?",
    options: [
      { label: "Up to 170 AED", value: "170" },
      { label: "170 – 210 AED", value: "210" },
      { label: "Premium (210+)", value: "999" },
    ],
  },
  {
    key: "gender",
    question: "Any trainer preference?",
    options: [
      { label: "No preference", value: "any" },
      { label: "Female trainer", value: "female" },
      { label: "Male trainer", value: "male" },
    ],
  },
];

function scoreTrainers(answers: Record<string, string>) {
  return trainers
    .map((t) => {
      let score = 0;
      if (t.sports.includes(answers.goal as SportSlug)) score += 5;
      if (t.primarySport === answers.goal) score += 3;
      if (t.formats.includes(answers.format as TrainingFormat)) score += 3;
      if (answers.budget && t.hourlyRate <= Number(answers.budget)) score += 2;
      if (answers.gender === "any" || t.gender === (answers.gender as Gender))
        score += 2;
      score += t.rating - 4; // small tiebreaker
      if (t.verified) score += 0.5;
      return { t, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function SmartMatch() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const choose = (value: string) => {
    const key = steps[current].key;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setDone(false);
  };

  const ranked = done ? scoreTrainers(answers) : [];
  const best = ranked[0]?.t;
  const runnersUp = ranked.slice(1, 3).map((r) => r.t);
  const progress = done ? 100 : (current / steps.length) * 100;

  return (
    <section id="smart-match" className="py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-[2.5rem] border border-ink-900/8 bg-gradient-to-br from-ink-900 to-ink-800 text-fg-invert grain">
          <div className="grid lg:grid-cols-2">
            {/* Left copy */}
            <div className="relative p-8 sm:p-12">
              <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 glow-lime opacity-30" />
              <div className="relative">
                <Eyebrow dark>
                  <Sparkles className="h-3.5 w-3.5" /> Smart Trainer Match
                </Eyebrow>
                <h2 className="display-2 font-display mt-3 font-bold text-balance">
                  Answer four questions. Meet your match.
                </h2>
                <p className="mt-4 max-w-md text-fg-invert-muted">
                  Our matching logic weighs your goal, location, budget and
                  preferences against every trainer&apos;s profile — then surfaces
                  the coach most likely to get you results.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-fg-invert-muted">
                  {["Goal-aware ranking", "Budget-fit filtering", "Preference matching"].map(
                    (f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-lime-300" /> {f}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Right interactive */}
            <div className="relative border-t border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:border-l lg:border-t-0">
              {/* progress */}
              <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-lime-300"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-lime-300">
                      Step {current + 1} of {steps.length}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold">
                      {steps[current].question}
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {steps[current].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => choose(opt.value)}
                          className="group flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-4 py-3.5 text-left text-sm font-medium transition-all hover:border-lime-300/60 hover:bg-lime-300/10"
                        >
                          {opt.label}
                          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  best && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lime-300">
                        <Sparkles className="h-3.5 w-3.5" /> Your top match
                      </p>
                      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/12 bg-white/5 p-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                          <Image
                            src={best.avatar}
                            alt={best.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-display text-lg font-semibold">
                              {best.name}
                            </p>
                            {best.verified && <VerifiedBadge label={false} />}
                          </div>
                          <p className="truncate text-sm text-fg-invert-muted">
                            {best.headline}
                          </p>
                          <div className="mt-1.5 flex items-center gap-3">
                            <RatingStars rating={best.rating} dark size={13} />
                            <span className="text-sm font-semibold text-lime-300">
                              {aed(best.hourlyRate)}/hr
                            </span>
                          </div>
                        </div>
                      </div>

                      {runnersUp.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-fg-invert-muted">
                            Also great for you
                          </p>
                          <div className="mt-2 flex gap-2">
                            {runnersUp.map((t) => (
                              <Link
                                key={t.id}
                                href={`/trainer/${t.slug}`}
                                className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:border-lime-300/40"
                              >
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                                  <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    fill
                                    sizes="32px"
                                    className="object-cover"
                                  />
                                </div>
                                <span className="truncate text-xs font-medium">
                                  {t.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-3">
                        <ButtonLink
                          href={`/trainer/${best.slug}`}
                          variant="primary"
                          size="md"
                        >
                          View profile
                        </ButtonLink>
                        <button
                          onClick={reset}
                          className="inline-flex items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-fg-invert-muted hover:text-white"
                        >
                          <RotateCcw className="h-4 w-4" /> Start over
                        </button>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
