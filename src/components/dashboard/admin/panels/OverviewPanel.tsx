"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Wallet,
  DollarSign,
  UserCheck,
  Users,
  Clock,
  CreditCard,
  CalendarPlus,
  RotateCcw,
  UserPlus,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { aed, feeBreakdown, cn } from "@/lib/utils";
import {
  adminPersona,
  platformStats,
  activityFeed,
  type Booking,
  type Activity,
} from "@/data/adminDashboard";
import { Card, PanelHeader } from "./_shared";

const ACTIVITY_ICON: Record<Activity["kind"], LucideIcon> = {
  booking: CalendarPlus,
  payment: CreditCard,
  coach: ShieldCheck,
  client: UserPlus,
  refund: RotateCcw,
};

const ACTIVITY_TINT: Record<Activity["kind"], string> = {
  booking: "bg-lime-300/25 text-lime-700",
  payment: "bg-emerald-500/12 text-emerald-700",
  coach: "bg-ink-900/8 text-fg",
  client: "bg-lime-300/25 text-lime-700",
  refund: "bg-amber-500/15 text-amber-700",
};

export function OverviewPanel({ bookings }: { bookings: Booking[] }) {
  const paid = bookings.filter((b) => b.status === "Paid");
  const revenue = paid.reduce((s, b) => s + b.amount, 0);
  const commission = feeBreakdown(revenue).commission;
  const pending = bookings.filter((b) => b.status === "Pending");
  const pendingValue = pending.reduce((s, b) => s + b.amount, 0);

  const kpis: {
    key: string;
    label: string;
    value: number;
    prefix?: string;
    icon: LucideIcon;
    highlight?: boolean;
    tone?: "amber";
  }[] = [
    { key: "bookings", label: "Total bookings", value: platformStats.totalBookings, icon: CalendarCheck },
    { key: "revenue", label: "Revenue (AED)", value: revenue, prefix: "AED ", icon: Wallet, highlight: true },
    { key: "commission", label: "Platform commission", value: commission, prefix: "AED ", icon: DollarSign },
    { key: "coaches", label: "Active coaches", value: platformStats.activeCoaches, icon: UserCheck },
    { key: "clients", label: "Active clients", value: platformStats.activeClients, icon: Users },
    { key: "pending", label: "Pending payments", value: pending.length, icon: Clock, tone: "amber" },
  ];

  return (
    <div>
      <PanelHeader
        title="Admin control room"
        subtitle={`Salaam, ${adminPersona.firstName}. Every booking, coach payout and payment status across FitNear — live in one place.`}
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "rounded-3xl border p-5",
                k.highlight
                  ? "surface-dark grain relative overflow-hidden border-transparent"
                  : "border-ink-900/8 bg-white",
              )}
            >
              {k.highlight && (
                <div className="glow-lime pointer-events-none absolute -right-8 -top-10 h-40 w-40 opacity-40" />
              )}
              <div className="relative flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-2xl",
                    k.highlight
                      ? "bg-lime-300 text-ink-900"
                      : k.tone === "amber"
                        ? "bg-amber-500/15 text-amber-700"
                        : "bg-lime-300/20 text-lime-700",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                {k.key === "pending" && pending.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-700">
                    {aed(pendingValue)} unsettled
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "relative mt-4 font-display text-3xl font-bold",
                  k.highlight ? "text-lime-300" : "text-fg",
                )}
              >
                <Counter to={k.value} prefix={k.prefix} />
              </div>
              <div
                className={cn(
                  "relative mt-1 text-sm",
                  k.highlight ? "text-fg-invert-muted" : "text-fg-muted",
                )}
              >
                {k.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* This month summary */}
        <Card>
          <h3 className="font-display text-base font-bold text-fg">This month</h3>
          <p className="mt-1 text-sm text-fg-muted">
            July 2026 at a glance across the platform.
          </p>
          <dl className="mt-5 space-y-3">
            {[
              { label: "Bookings created", value: `${platformStats.monthBookings}` },
              { label: "New clients onboarded", value: `+${platformStats.monthNewClients}` },
              { label: "Avg. session value", value: aed(platformStats.avgSessionValue) },
              { label: "Payments awaiting settlement", value: `${pending.length} · ${aed(pendingValue)}` },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-ink-900/5 pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-fg-muted">{row.label}</dt>
                <dd className="text-sm font-semibold text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Recent activity */}
        <Card className="p-0">
          <div className="border-b border-ink-900/8 px-6 py-4 sm:px-7">
            <h3 className="font-display text-base font-bold text-fg">
              Recent activity
            </h3>
          </div>
          <ul className="divide-y divide-ink-900/5">
            {activityFeed.map((a) => {
              const Icon = ACTIVITY_ICON[a.kind];
              return (
                <li key={a.id} className="flex items-start gap-3 px-6 py-3.5 sm:px-7">
                  <span
                    className={cn(
                      "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl",
                      ACTIVITY_TINT[a.kind],
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-fg">{a.text}</p>
                    <p className="mt-0.5 text-xs text-fg-muted">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
