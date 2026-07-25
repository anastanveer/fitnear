"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { aed, cn } from "@/lib/utils";
import { upcomingSessions, type Session } from "@/data/trainerDashboard";
import { PanelHeader } from "./_shared";

const formatColor: Record<Session["format"], string> = {
  Gym: "bg-lime-300/20 text-lime-700",
  Home: "bg-sky-500/12 text-sky-700",
  Outdoor: "bg-amber-500/14 text-amber-700",
  Online: "bg-violet-500/12 text-violet-700",
};

export function SessionsPanel() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? upcomingSessions
      : upcomingSessions.filter((s) => s.format.toLowerCase() === filter);

  return (
    <div>
      <PanelHeader
        title="Upcoming sessions"
        subtitle={`${upcomingSessions.length} sessions scheduled over the next 7 days.`}
        action={
          <div className="rounded-2xl border border-ink-900/10 bg-white px-4 py-2.5">
            <Select
              ariaLabel="Filter by format"
              value={filter}
              onChange={setFilter}
              align="right"
              options={[
                { value: "all", label: "All formats" },
                { value: "gym", label: "Gym" },
                { value: "home", label: "Home" },
                { value: "outdoor", label: "Outdoor" },
                { value: "online", label: "Online" },
              ]}
            />
          </div>
        }
      />

      <StaggerGroup className="space-y-4">
        {filtered.map((s) => (
          <StaggerItem key={s.id}>
            <div className="flex flex-col gap-4 rounded-3xl border border-ink-900/8 bg-white p-5 sm:flex-row sm:items-center">
              <Image
                src={s.avatar}
                alt={s.client}
                width={52}
                height={52}
                className="h-13 w-13 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-fg">
                    {s.client}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      formatColor[s.format],
                    )}
                  >
                    {s.format}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Dumbbell className="h-3.5 w-3.5" aria-hidden />
                    {s.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    {s.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {s.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {s.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <Chip className="bg-ink-900/[0.04] font-semibold text-fg">
                  {aed(s.fee)}
                </Chip>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-ink-900/15 bg-white/50 py-16 text-center">
          <p className="font-display text-lg font-bold text-fg">No sessions</p>
          <p className="mt-1 text-sm text-fg-muted">
            No {filter} sessions scheduled this week.
          </p>
        </div>
      )}
    </div>
  );
}
