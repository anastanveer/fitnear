"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DAYS, SLOTS, availabilityFor } from "@/lib/availability";

export function AvailabilityCalendar({ trainerId }: { trainerId: string }) {
  const available = useMemo(() => availabilityFor(trainerId), [trainerId]);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-fg-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-lime-300" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-ink-900" /> Selected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-mist" /> Unavailable
        </span>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[34rem]">
          {/* header */}
          <div className="grid grid-cols-[3.5rem_repeat(7,1fr)] gap-1.5">
            <div />
            {DAYS.map((d) => (
              <div
                key={d}
                className="pb-1 text-center text-xs font-semibold text-fg-muted"
              >
                {d}
              </div>
            ))}
          </div>
          {/* grid */}
          {SLOTS.map((slot) => (
            <div
              key={slot}
              className="grid grid-cols-[3.5rem_repeat(7,1fr)] items-center gap-1.5 py-0.5"
            >
              <div className="text-right text-xs font-medium text-fg-muted pr-1">
                {slot}
              </div>
              {DAYS.map((day) => {
                const key = `${day}-${slot}`;
                const isOpen = available.has(key);
                const isSel = selected === key;
                return (
                  <button
                    key={key}
                    disabled={!isOpen}
                    onClick={() => setSelected(isSel ? null : key)}
                    aria-label={`${day} ${slot} ${isOpen ? "available" : "unavailable"}`}
                    className={cn(
                      "h-9 rounded-lg text-[11px] font-semibold transition-all",
                      !isOpen && "cursor-not-allowed bg-mist text-transparent",
                      isOpen && !isSel && "bg-lime-300/70 text-ink-900 hover:bg-lime-300",
                      isSel && "bg-ink-900 text-lime-300 ring-2 ring-lime-400",
                    )}
                  >
                    {isOpen ? (isSel ? "✓" : "") : ""}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl bg-lime-300/15 px-4 py-3 text-sm font-medium text-fg"
        >
          Selected: {selected.replace("-", " · ")}. Continue to the booking flow
          to confirm this slot.
        </motion.p>
      )}
    </div>
  );
}
