"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  availabilityDays,
  availabilitySlots,
  defaultAvailability,
} from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";

export function AvailabilityPanel() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(defaultAvailability),
  );

  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const toggleColumn = (day: string) => {
    const keys = availabilitySlots.map((t) => `${day}-${t}`);
    const allOn = keys.every((k) => selected.has(k));
    setSelected((prev) => {
      const next = new Set(prev);
      keys.forEach((k) => (allOn ? next.delete(k) : next.add(k)));
      return next;
    });
  };

  return (
    <div>
      <PanelHeader
        title="Availability"
        subtitle="Tap a slot to toggle when you're open for bookings. Clients only see your available times."
        action={
          <span className="rounded-full bg-lime-300/20 px-3 py-1.5 text-sm font-semibold text-lime-700">
            {selected.size} slots open
          </span>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            {/* Header row */}
            <div className="grid grid-cols-[64px_repeat(7,1fr)] gap-2">
              <span />
              {availabilityDays.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleColumn(d)}
                  className="rounded-lg py-1 text-center text-xs font-bold text-fg-muted transition-colors hover:bg-ink-900/[0.04] hover:text-fg"
                  aria-label={`Toggle all ${d} slots`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Slot rows */}
            <div className="mt-2 space-y-2">
              {availabilitySlots.map((slot) => (
                <div
                  key={slot}
                  className="grid grid-cols-[64px_repeat(7,1fr)] items-center gap-2"
                >
                  <span className="text-right text-xs font-medium text-fg-muted">
                    {slot}
                  </span>
                  {availabilityDays.map((day) => {
                    const key = `${day}-${slot}`;
                    const on = selected.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        aria-pressed={on}
                        aria-label={`${day} ${slot} ${on ? "available" : "unavailable"}`}
                        className={cn(
                          "flex h-10 items-center justify-center rounded-xl border text-xs font-semibold transition-all duration-150 active:scale-95",
                          on
                            ? "border-lime-500/40 bg-lime-300 text-ink-900 shadow-[0_4px_14px_-6px_rgba(204,250,60,0.8)]"
                            : "border-ink-900/8 bg-mist/50 text-transparent hover:border-ink-900/20 hover:bg-mist",
                        )}
                      >
                        {on && <Check className="h-4 w-4" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/8 pt-5">
          <div className="flex items-center gap-4 text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-lime-300" /> Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-ink-900/12 bg-mist/50" />{" "}
              Unavailable
            </span>
          </div>
          <Button size="sm">Save availability</Button>
        </div>
      </Card>
    </div>
  );
}
