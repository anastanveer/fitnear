"use client";

import { useMemo } from "react";
import { aed } from "@/lib/utils";
import {
  bookingsPerWeek,
  revenueTrend,
  type Booking,
  type Slice,
} from "@/data/adminDashboard";
import { Card, PanelHeader } from "./_shared";
import {
  AdminBarChart,
  AdminAreaChart,
  AdminDonutChart,
} from "../charts/AdminCharts";

export function AnalyticsPanel({ bookings }: { bookings: Booking[] }) {
  const split = useMemo<Slice[]>(() => {
    const count = (s: Booking["status"]) =>
      bookings.filter((b) => b.status === s).length;
    return [
      { label: "Paid", value: count("Paid"), color: "#ccfa3c" },
      { label: "Pending", value: count("Pending"), color: "#f59e0b" },
      { label: "Refunded", value: count("Refunded"), color: "#e2e6dc" },
    ];
  }, [bookings]);

  const total = split.reduce((s, d) => s + d.value, 0);
  const paidPct = total ? Math.round((split[0].value / total) * 100) : 0;

  return (
    <div>
      <PanelHeader
        title="Analytics"
        subtitle="Booking volume, revenue growth and how cleanly payments are being collected."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4">
            <h3 className="font-display text-base font-bold text-fg">
              Bookings per week
            </h3>
            <p className="text-sm text-fg-muted">Last 8 weeks across the UAE.</p>
          </div>
          <AdminBarChart
            data={bookingsPerWeek}
            ariaLabel={`Bookings per week over 8 weeks, latest week ${bookingsPerWeek[bookingsPerWeek.length - 1].value} bookings`}
          />
        </Card>

        <Card>
          <div className="mb-4">
            <h3 className="font-display text-base font-bold text-fg">
              Payment status split
            </h3>
            <p className="text-sm text-fg-muted">
              Share of bookings that are collected.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <AdminDonutChart
              data={split}
              centerLabel={`${paidPct}%`}
              centerSub="paid"
              ariaLabel={`Payment status split: ${split
                .map((s) => `${s.label} ${s.value}`)
                .join(", ")}`}
            />
            <ul className="w-full space-y-2.5 sm:w-44">
              {split.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2 text-fg-muted">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                  </span>
                  <span className="font-semibold text-fg">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-display text-base font-bold text-fg">
              Revenue trend
            </h3>
            <p className="text-sm text-fg-muted">
              Gross platform revenue per month (AED).
            </p>
          </div>
          <AdminAreaChart
            data={revenueTrend}
            valueFormat={(v) => aed(v)}
            ariaLabel={`Monthly revenue trend, peaking at ${aed(
              Math.max(...revenueTrend.map((d) => d.value)),
            )}`}
          />
        </Card>
      </div>
    </div>
  );
}
