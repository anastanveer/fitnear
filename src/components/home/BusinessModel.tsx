"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Percent,
  Sparkles,
  ArrowUpRight,
  Star,
  Search,
  BadgeCheck,
  Megaphone,
  LineChart,
  Building2,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { aed } from "@/lib/utils";

const futureProducts = [
  { icon: Star, label: "Featured listings" },
  { icon: Search, label: "Priority search placement" },
  { icon: BadgeCheck, label: "Verified badge" },
  { icon: Megaphone, label: "Promoted profiles" },
  { icon: LineChart, label: "Trainer analytics" },
  { icon: Building2, label: "Corporate fitness packages" },
];

function CommissionBar() {
  const fee = 220;
  const commission = Math.round(fee * 0.12);
  const payout = fee - commission;
  return (
    <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-fg-muted">Example: one 1-hour session</span>
        <span className="font-display text-lg font-bold">{aed(fee)}</span>
      </div>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-mist">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "88%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-l-full bg-ink-900"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "12%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-lime-400"
        />
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900" /> Trainer keeps{" "}
          <strong>{aed(payout)}</strong>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-lime-400" /> FitNear{" "}
          <strong>{aed(commission)}</strong>
        </span>
      </div>
    </div>
  );
}

export function BusinessModel() {
  return (
    <section id="business" className="py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Business model</Eyebrow>
            <h2 className="display-2 font-display mx-auto mt-3 max-w-2xl font-bold text-balance">
              We only earn when trainers earn
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">
              A simple, aligned model. Free to join, no monthly fees, and a small
              commission taken only on completed paid bookings.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-ink-900/8 bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
                <Gift className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold">
                Free to join
              </h3>
              <p className="mt-2 text-sm text-fg-muted">
                Trainers create a full profile, set availability and receive
                enquiries at no cost. No monthly fee in the initial version.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-ink-900/8 bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
                <Percent className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold">
                10–15% commission
              </h3>
              <p className="mt-2 text-sm text-fg-muted">
                A modest commission applies only when a trainer is paid for a
                completed booking. If they don&apos;t earn, neither do we.
              </p>
              <div className="mt-5">
                <CommissionBar />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="surface-dark grain relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 glow-lime opacity-30" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/15 text-lime-300">
                <Sparkles className="h-6 w-6" />
              </span>
              <h3 className="font-display relative mt-5 text-xl font-semibold">
                Future premium products
              </h3>
              <p className="relative mt-2 text-sm text-fg-invert-muted">
                Optional ways for trainers to grow — layered in later, never
                required to succeed.
              </p>
              <ul className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {futureProducts.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-fg-invert"
                  >
                    <p.icon className="h-4 w-4 shrink-0 text-lime-300" />
                    {p.label}
                  </li>
                ))}
              </ul>
              <p className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-lime-300">
                Roadmap <ArrowUpRight className="h-3.5 w-3.5" />
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
