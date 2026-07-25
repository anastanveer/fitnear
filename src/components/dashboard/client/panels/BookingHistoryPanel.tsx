"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Select } from "@/components/ui/Select";
import {
  ClientPanelHeader,
  ClientStatusBadge,
  ClientAvatar,
} from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import { bookingHistory } from "@/data/clientDashboard";
import { aed } from "@/lib/utils";

const filterOptions = [
  { value: "all", label: "All bookings" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function BookingHistoryPanel() {
  const [filter, setFilter] = useState("all");
  const rows = bookingHistory.filter(
    (b) => filter === "all" || b.status === filter,
  );

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Booking history"
        description="Every session you've booked with FitNear, all in one place."
        action={
          <div className="min-w-[180px] rounded-full border border-ink-900/12 bg-white px-4 py-2.5">
            <Select
              value={filter}
              options={filterOptions}
              onChange={setFilter}
              ariaLabel="Filter bookings by status"
            />
          </div>
        }
      />

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-3xl border border-ink-900/8 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/8 text-xs uppercase tracking-wide text-fg-muted">
              <th className="px-6 py-4 font-semibold">Trainer</th>
              <th className="px-6 py-4 font-semibold">Sport</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b, i) => {
              const trainer = trainerBySlug[b.trainerSlug];
              return (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-ink-900/5 last:border-0 hover:bg-cloud/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ClientAvatar src={trainer.avatar} alt={trainer.name} size={36} />
                      <Link
                        href={`/trainer/${trainer.slug}`}
                        className="font-semibold text-fg hover:underline"
                      >
                        {trainer.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-fg-muted">{b.sportLabel}</td>
                  <td className="px-6 py-4 text-fg-muted">{b.dateLabel}</td>
                  <td className="px-6 py-4 text-fg-muted">{b.location}</td>
                  <td className="px-6 py-4 font-semibold text-fg">{aed(b.price)}</td>
                  <td className="px-6 py-4">
                    <ClientStatusBadge
                      tone={b.status === "completed" ? "success" : "danger"}
                    >
                      {b.status === "completed" ? "Completed" : "Cancelled"}
                    </ClientStatusBadge>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((b) => {
          const trainer = trainerBySlug[b.trainerSlug];
          return (
            <div
              key={b.id}
              className="rounded-2xl border border-ink-900/8 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ClientAvatar src={trainer.avatar} alt={trainer.name} size={40} />
                  <div>
                    <p className="font-semibold text-fg">{trainer.name}</p>
                    <p className="text-xs text-fg-muted">{b.sportLabel}</p>
                  </div>
                </div>
                <ClientStatusBadge
                  tone={b.status === "completed" ? "success" : "danger"}
                >
                  {b.status === "completed" ? "Completed" : "Cancelled"}
                </ClientStatusBadge>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-ink-900/5 pt-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-fg-muted">
                  <MapPin className="h-3.5 w-3.5" /> {b.dateLabel}
                </span>
                <span className="font-semibold text-fg">{aed(b.price)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
