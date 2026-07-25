"use client";

import { motion } from "framer-motion";
import { Wallet, Receipt, TrendingUp } from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { aed, feeBreakdown, COMMISSION_RATE, cn } from "@/lib/utils";
import { payouts } from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";

export function EarningsPanel() {
  const gross = payouts.reduce((s, p) => s + p.gross, 0);
  const { commission, trainerPayout: net } = feeBreakdown(gross);
  const commissionPct = Math.round(COMMISSION_RATE * 100);
  const netPct = 100 - commissionPct;

  const stats = [
    {
      label: "Gross earnings",
      value: gross,
      icon: TrendingUp,
      note: "Across all completed sessions",
    },
    {
      label: `FitNear commission (${commissionPct}%)`,
      value: commission,
      icon: Receipt,
      note: "Platform, payments & insurance",
    },
    {
      label: "Net payout",
      value: net,
      icon: Wallet,
      note: "Paid to your bank account",
      highlight: true,
    },
  ];

  return (
    <div>
      <PanelHeader
        title="Earnings & commission"
        subtitle="A transparent breakdown of your gross earnings, FitNear's commission and your net payout."
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
                  ? "surface-dark grain border-transparent"
                  : "border-ink-900/8 bg-white",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-2xl",
                  s.highlight
                    ? "bg-lime-300 text-ink-900"
                    : "bg-lime-300/20 text-lime-700",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div
                className={cn(
                  "mt-4 font-display text-2xl font-bold",
                  s.highlight ? "text-fg-invert" : "text-fg",
                )}
              >
                <Counter to={s.value} prefix="AED " />
              </div>
              <div
                className={cn(
                  "mt-0.5 text-sm font-medium",
                  s.highlight ? "text-lime-300" : "text-fg",
                )}
              >
                {s.label}
              </div>
              <div
                className={cn(
                  "mt-1 text-xs",
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
          <span className="font-semibold text-fg">Payout split</span>
          <span className="text-fg-muted">
            You keep {netPct}% of every session
          </span>
        </div>
        <div className="flex h-5 w-full overflow-hidden rounded-full bg-mist">
          <motion.div
            className="flex items-center justify-start bg-lime-300 pl-3"
            initial={{ width: 0 }}
            animate={{ width: `${netPct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-bold text-ink-900">{netPct}% you</span>
          </motion.div>
          <motion.div
            className="flex items-center justify-end bg-ink-900 pr-3"
            initial={{ width: 0 }}
            animate={{ width: `${commissionPct}%` }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-bold text-lime-300">
              {commissionPct}%
            </span>
          </motion.div>
        </div>
      </Card>

      {/* Payout history */}
      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b border-ink-900/8 px-6 py-4">
          <h3 className="font-display text-base font-bold text-fg">
            Recent payouts
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-fg-muted">
                <th className="px-6 py-3 font-semibold">Period</th>
                <th className="px-6 py-3 font-semibold">Sessions</th>
                <th className="px-6 py-3 font-semibold">Gross</th>
                <th className="px-6 py-3 font-semibold">Commission</th>
                <th className="px-6 py-3 font-semibold">Net payout</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => {
                const b = feeBreakdown(p.gross);
                return (
                  <tr
                    key={p.id}
                    className="border-b border-ink-900/5 last:border-0 hover:bg-mist/40"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-fg">{p.period}</div>
                      <div className="text-xs text-fg-muted">Paid {p.date}</div>
                    </td>
                    <td className="px-6 py-4 text-fg-muted">{p.sessions}</td>
                    <td className="px-6 py-4 font-medium text-fg">{aed(p.gross)}</td>
                    <td className="px-6 py-4 text-fg-muted">
                      −{aed(b.commission)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-fg">
                      {aed(b.trainerPayout)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          p.status === "Paid"
                            ? "bg-emerald-500/12 text-emerald-600"
                            : "bg-amber-500/14 text-amber-700",
                        )}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
