"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Wallet } from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import {
  ClientPanelHeader,
  ClientStatusBadge,
  ClientAvatar,
} from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import { paymentHistory } from "@/data/clientDashboard";
import { aed } from "@/lib/utils";

export function PaymentsPanel() {
  const totalPaid = paymentHistory
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const refunded = paymentHistory
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Payment history"
        description="Receipts for every session. All payments are processed securely in AED."
      />

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface-dark grain relative overflow-hidden rounded-2xl p-5">
          <div className="pointer-events-none absolute -right-8 -top-6 h-32 w-32 glow-lime opacity-40" />
          <div className="relative">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lime-300">
              <Wallet className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-lime-300">
              <Counter to={totalPaid} prefix="AED " />
            </p>
            <p className="text-xs text-fg-invert-muted">Total paid</p>
          </div>
        </div>
        <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist text-fg-muted">
            <CreditCard className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-display text-2xl font-bold text-fg">
            {aed(refunded)}
          </p>
          <p className="text-xs text-fg-muted">Refunded</p>
        </div>
        <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist text-fg-muted">
            <CreditCard className="h-4.5 w-4.5" />
          </span>
          <p className="mt-3 font-display text-base font-semibold text-fg">
            Visa •••• 4242
          </p>
          <p className="text-xs text-fg-muted">Default payment method</p>
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-3xl border border-ink-900/8 bg-white">
        {paymentHistory.map((p, i) => {
          const trainer = trainerBySlug[p.trainerSlug];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col gap-3 border-b border-ink-900/5 p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-3">
                <ClientAvatar src={trainer.avatar} alt={trainer.name} size={40} />
                <div>
                  <p className="font-semibold text-fg">{trainer.name}</p>
                  <p className="text-xs text-fg-muted">
                    {p.dateLabel} · {p.method} · #{p.invoice}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="font-display text-lg font-bold text-fg">
                  {aed(p.amount)}
                </span>
                <ClientStatusBadge
                  tone={p.status === "paid" ? "success" : "warning"}
                >
                  {p.status === "paid" ? "Paid" : "Refunded"}
                </ClientStatusBadge>
                <button
                  type="button"
                  aria-label={`Download receipt ${p.invoice}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-cloud hover:text-fg"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
