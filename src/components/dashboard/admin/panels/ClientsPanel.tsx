"use client";

import Image from "next/image";
import { aed } from "@/lib/utils";
import { clientRows } from "@/data/adminDashboard";
import { Card, PanelHeader } from "./_shared";

export function ClientsPanel() {
  return (
    <div>
      <PanelHeader
        title="Clients"
        subtitle="People booking sessions on FitNear — when they joined, how much they've spent and when they were last active."
      />

      {/* Desktop table */}
      <Card className="hidden overflow-hidden p-0 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink-900/8 text-left text-xs uppercase tracking-wide text-fg-muted">
                <th scope="col" className="px-6 py-3 font-semibold">Client</th>
                <th scope="col" className="px-6 py-3 font-semibold">Joined</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Bookings</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Total spent</th>
                <th scope="col" className="px-6 py-3 font-semibold">Last active</th>
              </tr>
            </thead>
            <tbody>
              {clientRows.map((c) => (
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
                      <div>
                        <div className="font-medium text-fg">{c.name}</div>
                        <div className="text-xs text-fg-muted">{c.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-fg-muted">{c.joined}</td>
                  <td className="px-6 py-4 text-right font-medium text-fg">
                    {c.bookings}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-fg">
                    {aed(c.totalSpent)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-fg-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                      {c.lastActive}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {clientRows.map((c) => (
          <div
            key={c.id}
            className="rounded-3xl border border-ink-900/8 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={c.avatar}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-fg">{c.name}</div>
                <div className="text-xs text-fg-muted">
                  {c.city} · Joined {c.joined}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                {c.lastActive}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-fg-muted">Bookings</dt>
                <dd className="font-medium text-fg">{c.bookings}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-muted">Total spent</dt>
                <dd className="font-semibold text-fg">{aed(c.totalSpent)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
