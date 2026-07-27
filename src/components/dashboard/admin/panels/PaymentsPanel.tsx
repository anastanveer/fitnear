"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Receipt, Wallet } from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { aed, feeBreakdown, COMMISSION_RATE, cn } from "@/lib/utils";
import type { Booking } from "@/data/adminDashboard";
import { Card, PanelHeader } from "./_shared";

interface PayoutRow {
  coach: string;
  avatar: string;
  sessions: number;
  gross: number;
  commission: number;
  payout: number;
  status: "Paid out" | "Scheduled";
}

export function PaymentsPanel({ bookings }: { bookings: Booking[] }) {
  const commissionPct = Math.round(COMMISSION_RATE * 100);
  const netPct = 100 - commissionPct;

  const { grossRevenue, commissionTotal, payoutTotal, payouts } = useMemo(() => {
    const paid = bookings.filter((b) => b.status === "Paid");
    const grossRevenue = paid.reduce((s, b) => s + b.amount, 0);
    const { commission: commissionTotal, trainerPayout: payoutTotal } =
      feeBreakdown(grossRevenue);

    const byCoach = new Map<string, PayoutRow>();
    for (const b of paid) {
      const cur =
        byCoach.get(b.coach) ??
        ({
          coach: b.coach,
          avatar: b.coachAvatar,
          sessions: 0,
          gross: 0,
          commission: 0,
          payout: 0,
          status: "Paid out",
        } as PayoutRow);
      cur.sessions += 1;
      cur.gross += b.amount;
      byCoach.set(b.coach, cur);
    }
    // Coaches still holding a pending payment are scheduled, not settled.
    const coachesWithPending = new Set(
      bookings.filter((b) => b.status === "Pending").map((b) => b.coach),
    );
    const payouts = [...byCoach.values()]
      .map((r) => {
        const b = feeBreakdown(r.gross);
        return {
          ...r,
          commission: b.commission,
          payout: b.trainerPayout,
          status: coachesWithPending.has(r.coach)
            ? ("Scheduled" as const)
            : ("Paid out" as const),
        };
      })
      .sort((a, b) => b.gross - a.gross);

    return { grossRevenue, commissionTotal, payoutTotal, payouts };
  }, [bookings]);

  const stats = [
    {
      label: "Gross revenue",
      value: grossRevenue,
      icon: TrendingUp,
      note: "All settled bookings",
    },
    {
      label: `Platform commission (${commissionPct}%)`,
      value: commissionTotal,
      icon: Receipt,
      note: "FitNear earnings",
      highlight: true,
    },
    {
      label: "Coach payouts",
      value: payoutTotal,
      icon: Wallet,
      note: "Owed to coaches",
    },
  ];

  return (
    <div>
      <PanelHeader
        title="Payments & payouts"
        subtitle="How gross revenue splits into FitNear's 12% commission and what each coach is paid."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={cn(
                "rounded-3xl border p-5",
                s.highlight
                  ? "surface-dark grain relative overflow-hidden border-transparent"
                  : "border-ink-900/8 bg-white",
              )}
            >
              {s.highlight && (
                <div className="glow-lime pointer-events-none absolute -right-8 -top-10 h-40 w-40 opacity-40" />
              )}
              <span
                className={cn(
                  "relative grid h-10 w-10 place-items-center rounded-2xl",
                  s.highlight
                    ? "bg-lime-300 text-ink-900"
                    : "bg-lime-300/20 text-lime-700",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div
                className={cn(
                  "relative mt-4 font-display text-2xl font-bold",
                  s.highlight ? "text-lime-300" : "text-fg",
                )}
              >
                <Counter to={s.value} prefix="AED " />
              </div>
              <div
                className={cn(
                  "relative mt-0.5 text-sm font-medium",
                  s.highlight ? "text-fg-invert" : "text-fg",
                )}
              >
                {s.label}
              </div>
              <div
                className={cn(
                  "relative mt-1 text-xs",
                  s.highlight ? "text-fg-invert-muted" : "text-fg-muted",
                )}
              >
                {s.note}
              </div>
            </div>
          );
        })}
      </div>

      {/* Split bar */}
      <Card className="mt-6">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-fg">Revenue split</span>
          <span className="text-fg-muted">
            FitNear keeps {commissionPct}% of every session
          </span>
        </div>
        <div className="flex h-5 w-full overflow-hidden rounded-full bg-mist">
          <motion.div
            className="flex items-center justify-start bg-ink-900 pl-3"
            initial={{ width: 0 }}
            animate={{ width: `${commissionPct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-bold text-lime-300">
              {commissionPct}%
            </span>
          </motion.div>
          <motion.div
            className="flex items-center justify-end bg-lime-300 pr-3"
            initial={{ width: 0 }}
            animate={{ width: `${netPct}%` }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-bold text-ink-900">
              {netPct}% coaches
            </span>
          </motion.div>
        </div>
      </Card>

      {/* Payouts table */}
      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b border-ink-900/8 px-6 py-4">
          <h3 className="font-display text-base font-bold text-fg">
            Payouts to coaches
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-fg-muted">
                <th scope="col" className="px-6 py-3 font-semibold">Coach</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Sessions</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Gross</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Commission</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Payout</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr
                  key={p.coach}
                  className="border-b border-ink-900/5 last:border-0 hover:bg-mist/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={p.avatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <span className="font-medium text-fg">{p.coach}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-fg-muted">{p.sessions}</td>
                  <td className="px-6 py-4 text-right font-medium text-fg">
                    {aed(p.gross)}
                  </td>
                  <td className="px-6 py-4 text-right text-fg-muted">
                    −{aed(p.commission)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-fg">
                    {aed(p.payout)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        p.status === "Paid out"
                          ? "bg-emerald-500/12 text-emerald-700"
                          : "bg-amber-500/15 text-amber-700",
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-ink-900/10 bg-mist/40 font-semibold text-fg">
                <td className="px-6 py-4">Totals</td>
                <td className="px-6 py-4 text-right">
                  {payouts.reduce((s, p) => s + p.sessions, 0)}
                </td>
                <td className="px-6 py-4 text-right">{aed(grossRevenue)}</td>
                <td className="px-6 py-4 text-right text-lime-700">
                  −{aed(commissionTotal)}
                </td>
                <td className="px-6 py-4 text-right">{aed(payoutTotal)}</td>
                <td className="px-6 py-4" />
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
