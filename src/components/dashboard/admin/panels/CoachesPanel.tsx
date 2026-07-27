"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerifiedBadge } from "@/components/ui/Badge";
import { aed, cn } from "@/lib/utils";
import { coachRows, type CoachStatus } from "@/data/adminDashboard";
import { Card, PanelHeader } from "./_shared";

function StatusPill({ status }: { status: CoachStatus }) {
  const active = status === "Active";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-500/12 text-emerald-700"
          : "bg-amber-500/15 text-amber-700",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-emerald-500" : "bg-amber-500",
        )}
      />
      {status}
    </span>
  );
}

export function CoachesPanel() {
  const [rows, setRows] = useState(coachRows);

  const setStatus = (id: string, status: CoachStatus) =>
    setRows((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status, verified: status === "Active" ? true : c.verified }
          : c,
      ),
    );

  return (
    <div>
      <PanelHeader
        title="Coaches"
        subtitle="Verified trainers on the platform — sessions delivered, ratings, lifetime earnings and account status."
      />

      {/* Desktop table */}
      <Card className="hidden overflow-hidden p-0 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-fg-muted">
                <th scope="col" className="px-6 py-3 font-semibold">Coach</th>
                <th scope="col" className="px-6 py-3 font-semibold">Service areas</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Sessions</th>
                <th scope="col" className="px-6 py-3 font-semibold">Rating</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Total earned</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                <th scope="col" className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-ink-900/5 last:border-0 hover:bg-mist/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={c.avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-fg">{c.name}</span>
                        {c.verified && <VerifiedBadge label={false} />}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-fg-muted">
                    {c.areas.slice(0, 2).join(", ")}
                    {c.areas.length > 2 && ` +${c.areas.length - 2}`}
                  </td>
                  <td className="px-6 py-4 text-right text-fg-muted">
                    {c.sessionsCompleted.toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4">
                    <RatingStars rating={c.rating} count={c.reviewCount} size={13} />
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-fg">
                    {aed(c.totalEarned)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-6 py-4">
                    {c.status === "Active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setStatus(c.id, "Pending verification")}
                        aria-label={`Suspend ${c.name}`}
                      >
                        Suspend
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setStatus(c.id, "Active")}
                        aria-label={`Approve ${c.name}`}
                      >
                        <ShieldCheck className="h-4 w-4" aria-hidden />
                        Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {rows.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl border border-ink-900/8 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={c.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-fg">{c.name}</span>
                    {c.verified && <VerifiedBadge label={false} />}
                  </div>
                  <div className="mt-0.5">
                    <RatingStars rating={c.rating} count={c.reviewCount} size={12} />
                  </div>
                </div>
              </div>
              <StatusPill status={c.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-fg-muted">Sessions</dt>
                <dd className="font-medium text-fg">
                  {c.sessionsCompleted.toLocaleString("en-US")}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">Total earned</dt>
                <dd className="font-semibold text-fg">{aed(c.totalEarned)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-fg-muted">Service areas</dt>
                <dd className="font-medium text-fg">{c.areas.join(", ")}</dd>
              </div>
            </dl>
            {c.status === "Active" ? (
              <Button
                size="sm"
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setStatus(c.id, "Pending verification")}
                aria-label={`Suspend ${c.name}`}
              >
                Suspend coach
              </Button>
            ) : (
              <Button
                size="sm"
                className="mt-4 w-full"
                onClick={() => setStatus(c.id, "Active")}
                aria-label={`Approve ${c.name}`}
              >
                <Check className="h-4 w-4" aria-hidden />
                Approve verification
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
