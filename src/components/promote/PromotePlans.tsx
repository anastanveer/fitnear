"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Zap,
  Crown,
  Sparkles,
  X,
  Lock,
  CreditCard,
  PartyPopper,
  TrendingUp,
  Search,
  BadgeCheck,
  BarChart3,
} from "lucide-react";
import { aed, cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

type Plan = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  icon: typeof Zap;
  highlight?: boolean;
  visibility: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    tagline: "Everything you need to get discovered.",
    icon: Search,
    visibility: "Standard placement",
    features: [
      "Full trainer profile",
      "Appear in local search",
      "WhatsApp & booking enquiries",
      "Reviews & ratings",
      "Client dashboard access",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    price: 99,
    tagline: "Rise above the crowd in your area.",
    icon: Zap,
    highlight: true,
    visibility: "Priority placement · ~3× visibility",
    features: [
      "Everything in Starter",
      "Priority placement — above standard results",
      "“Featured” badge on your card",
      "Highlighted profile styling",
      "Featured in category pages",
      "Basic performance analytics",
    ],
  },
  {
    id: "spotlight",
    name: "Spotlight",
    price: 249,
    tagline: "Be the first trainer clients see.",
    icon: Crown,
    visibility: "Top of search · homepage spotlight",
    features: [
      "Everything in Featured",
      "Top-of-search placement",
      "Homepage “Trainers near you” spotlight",
      "Promoted profile across the app",
      "Advanced analytics & insights",
      "Verified badge fast-track",
      "Priority support",
    ],
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Priority placement",
    text: "Paid trainers are pinned to the top of search results, above standard listings in the same area.",
  },
  {
    icon: BadgeCheck,
    title: "Trust signals",
    text: "A Featured badge and verified fast-track help clients choose you with confidence.",
  },
  {
    icon: Sparkles,
    title: "Promoted everywhere",
    text: "Get surfaced on the homepage, category pages and Smart Match results — not just search.",
  },
  {
    icon: BarChart3,
    title: "Know what works",
    text: "See profile views, enquiry sources and conversion so you can invest where it pays off.",
  },
];

export function PromotePlans() {
  const [checkout, setCheckout] = useState<Plan | null>(null);

  return (
    <>
      {/* How it works / benefits */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-3xl border border-ink-900/8 bg-white p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
              <b.icon className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-4 text-base font-semibold">
              {b.title}
            </h3>
            <p className="mt-1.5 text-sm text-fg-muted">{b.text}</p>
          </div>
        ))}
      </div>

      {/* Pricing tiers */}
      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-[2rem] p-7 transition-transform",
              plan.highlight
                ? "surface-dark grain overflow-hidden lg:-translate-y-3 lg:scale-[1.02]"
                : "border border-ink-900/8 bg-white",
            )}
          >
            {plan.highlight && (
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 glow-lime opacity-40" />
            )}
            <div className="relative">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    plan.highlight
                      ? "bg-lime-300 text-ink-900"
                      : "bg-ink-900 text-lime-300",
                  )}
                >
                  <plan.icon className="h-5 w-5" />
                </span>
                {plan.highlight && (
                  <span className="rounded-full bg-lime-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-900">
                    Most popular
                  </span>
                )}
              </div>

              <h3 className="font-display mt-5 text-2xl font-bold">
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  plan.highlight ? "text-fg-invert-muted" : "text-fg-muted",
                )}
              >
                {plan.tagline}
              </p>

              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">
                  {plan.price === 0 ? "Free" : aed(plan.price)}
                </span>
                {plan.price > 0 && (
                  <span
                    className={cn(
                      "mb-1 text-sm",
                      plan.highlight ? "text-fg-invert-muted" : "text-fg-muted",
                    )}
                  >
                    /month
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                  plan.highlight
                    ? "bg-lime-300/15 text-lime-300"
                    : "bg-lime-300/20 text-lime-700",
                )}
              >
                <Zap className="h-3.5 w-3.5" /> {plan.visibility}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.highlight ? "text-lime-300" : "text-lime-600",
                      )}
                    />
                    <span
                      className={
                        plan.highlight ? "text-fg-invert" : "text-fg"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 pt-2">
              {plan.price === 0 ? (
                <ButtonLink
                  href="/join"
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Join for free
                </ButtonLink>
              ) : (
                <Button
                  size="lg"
                  variant={plan.highlight ? "primary" : "dark"}
                  className="w-full"
                  onClick={() => setCheckout(plan)}
                >
                  Get {plan.name}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-fg-muted">
        Cancel anytime · No long-term contract · Prices in AED, billed monthly ·
        Demo pricing for this prototype
      </p>

      {/* Checkout modal */}
      <AnimatePresence>
        {checkout && (
          <CheckoutModal plan={checkout} onClose={() => setCheckout(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function CheckoutModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-cloud p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-fg-muted hover:bg-ink-900/5"
        >
          <X className="h-5 w-5" />
        </button>

        {!done ? (
          <>
            <h2 className="font-display text-xl font-bold">
              Upgrade to {plan.name}
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              {aed(plan.price)}/month · {plan.visibility}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-mist px-4 py-2.5 text-xs text-fg-muted">
              <Lock className="h-3.5 w-3.5" /> Demo checkout — no real card is
              charged.
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-fg-muted">
                  Card number
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                  <CreditCard className="h-5 w-5 text-fg-muted" />
                  <input
                    defaultValue="4242 4242 4242 4242"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  defaultValue="12 / 28"
                  aria-label="Expiry"
                  className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm focus:outline-none"
                />
                <input
                  defaultValue="123"
                  aria-label="CVC"
                  className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
              <span className="text-sm text-fg-muted">Billed today</span>
              <span className="font-display text-xl font-bold">
                {aed(plan.price)}
              </span>
            </div>

            <Button
              size="lg"
              className="mt-4 w-full"
              onClick={pay}
              disabled={processing}
            >
              {processing ? "Processing…" : `Pay ${aed(plan.price)} & activate`}
            </Button>
          </>
        ) : (
          <div className="py-4 text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-300 text-ink-900"
            >
              <PartyPopper className="h-8 w-8" />
            </motion.span>
            <h2 className="font-display mt-5 text-2xl font-bold">
              You&apos;re now {plan.name}!
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              Your profile now gets{" "}
              <strong className="text-fg">{plan.visibility.toLowerCase()}</strong>
              . You&apos;ll start appearing above standard listings in your area
              right away.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <ButtonLink href="/search" variant="primary" size="lg">
                See your placement in search
              </ButtonLink>
              <ButtonLink href="/dashboard/trainer" variant="ghost" size="md">
                Go to trainer dashboard
              </ButtonLink>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
