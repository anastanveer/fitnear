"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Send,
  RotateCcw,
  Star,
  MapPin,
  Check,
  ArrowRight,
} from "lucide-react";
import type { SportSlug, TrainingFormat, Gender } from "@/lib/types";
import { matchTrainers, starterPlan, type MatchAnswers } from "@/lib/match";
import { aed, cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { VerifiedBadge } from "@/components/ui/Badge";

type Chip = { label: string; value: string };
type Step = { key: keyof MatchAnswers; q: string; chips: Chip[] };

const areas = [
  "Dubai Marina",
  "JVC",
  "Business Bay",
  "Downtown Dubai",
  "Al Barsha",
  "Dubai Hills",
  "Jumeirah",
  "Abu Dhabi",
];

const steps: Step[] = [
  {
    key: "goal",
    q: "What's your main fitness goal right now?",
    chips: [
      { label: "Lose weight", value: "personal-training" },
      { label: "Build muscle", value: "strength" },
      { label: "Learn swimming", value: "swimming" },
      { label: "Boxing fitness", value: "boxing" },
      { label: "Yoga & mobility", value: "yoga" },
      { label: "Football", value: "football" },
      { label: "Running", value: "running" },
      { label: "Tennis", value: "tennis" },
    ],
  },
  {
    key: "area",
    q: "Great choice. Which area are you in?",
    chips: areas.map((a) => ({ label: a, value: a })),
  },
  {
    key: "budget",
    q: "What's your budget per session?",
    chips: [
      { label: "Up to AED 170", value: "170" },
      { label: "AED 170–210", value: "210" },
      { label: "Premium (210+)", value: "999" },
    ],
  },
  {
    key: "gender",
    q: "Do you have a trainer preference?",
    chips: [
      { label: "No preference", value: "any" },
      { label: "Female trainer", value: "female" },
      { label: "Male trainer", value: "male" },
    ],
  },
  {
    key: "format",
    q: "Where would you like to train?",
    chips: [
      { label: "At home", value: "home" },
      { label: "At a gym", value: "gym" },
      { label: "Outdoors", value: "outdoor" },
      { label: "Online", value: "online" },
    ],
  },
  {
    key: "availability",
    q: "And when do you want to start?",
    chips: [
      { label: "Today!", value: "today" },
      { label: "This week", value: "week" },
      { label: "I'm flexible", value: "flexible" },
    ],
  },
];

interface Msg {
  id: number;
  role: "ai" | "user";
  text: string;
}

let uid = 1;

export function AiCoach() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<MatchAnswers>({});
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // greeting
  useEffect(() => {
    setMessages([
      {
        id: uid++,
        role: "ai",
        text: "Hi! I'm your FitNear AI coach 👋 Answer a few quick questions and I'll match you with the ideal trainer near you — plus a starter plan.",
      },
      { id: uid++, role: "ai", text: steps[0].q },
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, done]);

  const answer = (value: string, label: string) => {
    if (done) return;
    const current = steps[step];
    setMessages((m) => [...m, { id: uid++, role: "user", text: label }]);
    const nextAnswers: MatchAnswers = { ...answers };
    if (current.key === "budget") nextAnswers.budget = Number(value);
    else if (current.key === "goal") nextAnswers.goal = value as SportSlug;
    else if (current.key === "format")
      nextAnswers.format = value as TrainingFormat;
    else if (current.key === "gender")
      nextAnswers.gender = value as Gender | "any";
    else if (current.key === "availability")
      nextAnswers.availability = value as MatchAnswers["availability"];
    else if (current.key === "area") nextAnswers.area = value;
    setAnswers(nextAnswers);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      if (step + 1 < steps.length) {
        setMessages((m) => [
          ...m,
          { id: uid++, role: "ai", text: steps[step + 1].q },
        ]);
        setStep(step + 1);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: uid++,
            role: "ai",
            text: "Analysing 850+ trainers near you… here's who I'd pick for you 👇",
          },
        ]);
        setDone(true);
      }
    }, 750);
  };

  const reset = () => {
    uid = 1;
    setAnswers({});
    setStep(0);
    setDone(false);
    setTyping(false);
    setInput("");
    setMessages([
      {
        id: uid++,
        role: "ai",
        text: "Fresh start! Let's find your perfect match.",
      },
      { id: uid++, role: "ai", text: steps[0].q },
    ]);
  };

  const results = done ? matchTrainers(answers) : [];
  const best = results[0]?.trainer;
  const alts = results.slice(1, 3).map((r) => r.trainer);
  const reasons = results[0]?.reasons ?? [];
  const plan = starterPlan(answers.goal);

  return (
    <div className="surface-dark grain relative flex h-[min(72vh,680px)] flex-col overflow-hidden rounded-[2rem] shadow-2xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 glow-lime opacity-30" />

      {/* header */}
      <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-300 text-ink-900">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="font-display font-semibold text-fg-invert">
            FitNear AI Coach
          </p>
          <p className="flex items-center gap-1.5 text-xs text-fg-invert-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Online ·
            replies instantly
          </p>
        </div>
        {(done || step > 0) && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-fg-invert-muted hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart
          </button>
        )}
      </div>

      {/* conversation */}
      <div
        ref={scrollRef}
        className="relative flex-1 space-y-3 overflow-y-auto px-5 py-5 no-scrollbar"
      >
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-br-md bg-lime-300 font-medium text-ink-900"
                  : "rounded-bl-md bg-white/8 text-fg-invert",
              )}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/8 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-fg-invert-muted"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* result panel */}
        {done && best && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="rounded-2xl border border-lime-300/25 bg-white/[0.04] p-4">
              <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lime-300">
                <Star className="h-3.5 w-3.5 fill-lime-300" /> Your top match
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={best.avatar} alt={best.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-display font-semibold text-fg-invert">
                      {best.name}
                    </p>
                    {best.verified && <VerifiedBadge label={false} />}
                  </div>
                  <p className="flex items-center gap-2 text-xs text-fg-invert-muted">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-lime-300 text-lime-300" />
                      {best.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {best.area}
                    </span>
                    <span className="font-semibold text-lime-300">
                      {aed(best.hourlyRate)}/hr
                    </span>
                  </p>
                </div>
              </div>
              {reasons.length > 0 && (
                <p className="mt-3 text-xs text-fg-invert-muted">
                  Chosen because {best.name.split(" ")[0]}{" "}
                  {reasons.slice(0, 3).join(", ")}.
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <ButtonLink href={`/trainer/${best.slug}`} variant="primary" size="sm">
                  View profile
                </ButtonLink>
                <ButtonLink
                  href={`/booking?trainer=${best.slug}`}
                  variant="dark"
                  size="sm"
                  className="border border-white/15 bg-white/10 hover:bg-white/15"
                >
                  Book a session
                </ButtonLink>
              </div>
            </div>

            {/* starter plan */}
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="mb-2 text-sm font-semibold text-fg-invert">
                Your starter plan
              </p>
              <ul className="space-y-1.5">
                {plan.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-fg-invert-muted">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* alternatives */}
            {alts.length > 0 && (
              <div>
                <p className="mb-2 text-xs text-fg-invert-muted">
                  Also great for you
                </p>
                <div className="flex gap-2">
                  {alts.map((t) => (
                    <Link
                      key={t.id}
                      href={`/trainer/${t.slug}`}
                      className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:border-lime-300/40"
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                        <Image src={t.avatar} alt={t.name} fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="truncate text-xs font-medium text-fg-invert">
                        {t.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* chips + input */}
      <div className="relative border-t border-white/10 px-5 py-4">
        <AnimatePresence mode="wait">
          {!done && !typing && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 flex flex-wrap gap-2"
            >
              {steps[step].chips.map((c) => (
                <button
                  key={c.value}
                  onClick={() => answer(c.value, c.label)}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-fg-invert transition-colors hover:border-lime-300/60 hover:bg-lime-300/10"
                >
                  {c.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {done ? (
          <ButtonLink href="/search" variant="primary" size="md" className="w-full">
            Browse all trainers <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) answer(input.trim(), input.trim());
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer, or tap an option…"
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-lime-300/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-ink-900 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
