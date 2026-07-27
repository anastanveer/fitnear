"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Check, Filter, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { aed, feeBreakdown, cn } from "@/lib/utils";
import type { Booking } from "@/data/adminDashboard";
import { Card, PanelHeader, PaymentBadge } from "./_shared";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Refunded", label: "Refunded" },
];

export function BookingsPanel({
  bookings,
  onTogglePaid,
}: {
  bookings: Booking[];
  onTogglePaid: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesStatus = status === "all" || b.status === status;
      const matchesQuery =
        !q ||
        b.client.toLowerCase().includes(q) ||
        b.coach.toLowerCase().includes(q) ||
        b.ref.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, status]);

  const totals = useMemo(() => {
    const gross = filtered.reduce((s, b) => s + b.amount, 0);
    const commission = filtered.reduce(
      (s, b) => s + feeBreakdown(b.amount).commission,
      0,
    );
    return { gross, commission };
  }, [filtered]);

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div>
      <PanelHeader
        title="Bookings"
        subtitle="Every session booked on FitNear — which coach got which client, and whether the payment has landed."
        action={
          pendingCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <AlertCircle className="h-4 w-4" aria-hidden />
              {pendingCount} payment{pendingCount > 1 ? "s" : ""} pending
            </span>
          ) : undefined
        }
      />

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2.5 rounded-full border border-ink-900/12 bg-white px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client, coach or booking ref…"
            aria-label="Search bookings"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
          />
        </div>
        <div className="rounded-full border border-ink-900/12 bg-white px-4 py-2.5 sm:w-56">
          <Select
            ariaLabel="Filter by payment status"
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
            icon={<Filter className="h-4 w-4 text-fg-muted" aria-hidden />}
          />
        </div>
      </div>

      {/* ---------- Desktop table ---------- */}
      <Card className="hidden overflow-hidden p-0 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <caption className="sr-only">
              Bookings with client, coach, session type, amount, platform
              commission and payment status
            </caption>
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-fg-muted">
                <th scope="col" className="px-6 py-3 font-semibold">Client</th>
                <th scope="col" className="px-6 py-3 font-semibold">Coach</th>
                <th scope="col" className="px-6 py-3 font-semibold">Session</th>
                <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Amount</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Commission</th>
                <th scope="col" className="px-6 py-3 font-semibold">Payment</th>
                <th scope="col" className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-ink-900/5 last:border-0 hover:bg-mist/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={b.clientAvatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-fg">{b.client}</div>
                        <div className="text-xs text-fg-muted">{b.ref}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={b.coachAvatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="font-medium text-fg">{b.coach}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-fg">{b.sessionType}</div>
                    <div className="text-xs text-fg-muted">{b.area}</div>
                  </td>
                  <td className="px-6 py-4 text-fg-muted">{b.date}</td>
                  <td className="px-6 py-4 text-right font-semibold text-fg">
                    {aed(b.amount)}
                  </td>
                  <td className="px-6 py-4 text-right text-fg-muted">
                    {aed(feeBreakdown(b.amount).commission)}
                  </td>
                  <td className="px-6 py-4">
                    <PaymentBadge status={b.status} />
                  </td>
                  <td className="px-6 py-4">
                    {b.status === "Pending" ? (
                      <Button
                        size="sm"
                        onClick={() => onTogglePaid(b.id)}
                        aria-label={`Mark ${b.client}'s payment as paid`}
                      >
                        <Check className="h-4 w-4" aria-hidden />
                        Mark paid
                      </Button>
                    ) : (
                      <span className="text-xs text-fg-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <EmptyRow />}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr className="border-t border-ink-900/10 bg-mist/40 font-semibold text-fg">
                  <td className="px-6 py-4" colSpan={4}>
                    {filtered.length} booking{filtered.length > 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-right">{aed(totals.gross)}</td>
                  <td className="px-6 py-4 text-right text-lime-700">
                    {aed(totals.commission)}
                  </td>
                  <td className="px-6 py-4" colSpan={2}>
                    <span className="text-xs font-medium text-fg-muted">
                      Platform commission (12%)
                    </span>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>

      {/* ---------- Mobile cards ---------- */}
      <div className="space-y-3 lg:hidden">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="rounded-3xl border border-ink-900/8 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={b.clientAvatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-fg">{b.client}</div>
                  <div className="text-xs text-fg-muted">{b.ref} · {b.date}</div>
                </div>
              </div>
              <PaymentBadge status={b.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-fg-muted">Coach</dt>
                <dd className="font-medium text-fg">{b.coach}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">Session</dt>
                <dd className="font-medium text-fg">{b.sessionType}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">Amount</dt>
                <dd className="font-semibold text-fg">{aed(b.amount)}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">Commission (12%)</dt>
                <dd className="font-medium text-fg">
                  {aed(feeBreakdown(b.amount).commission)}
                </dd>
              </div>
            </dl>
            {b.status === "Pending" && (
              <Button
                size="sm"
                className="mt-4 w-full"
                onClick={() => onTogglePaid(b.id)}
                aria-label={`Mark ${b.client}'s payment as paid`}
              >
                <Check className="h-4 w-4" aria-hidden />
                Mark payment as paid
              </Button>
            )}
          </div>
        ))}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between rounded-3xl border border-ink-900/10 bg-mist/50 px-4 py-3.5 text-sm font-semibold text-fg">
            <span>{filtered.length} shown</span>
            <span>
              {aed(totals.gross)}
              <span className="ml-2 font-medium text-lime-700">
                · {aed(totals.commission)} commission
              </span>
            </span>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="rounded-3xl border border-ink-900/8 bg-white p-10 text-center">
            <p className="text-sm text-fg-muted">
              No bookings match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td colSpan={8} className="px-6 py-14 text-center">
        <p className="text-sm text-fg-muted">
          No bookings match your search or filter.
        </p>
      </td>
    </tr>
  );
}
