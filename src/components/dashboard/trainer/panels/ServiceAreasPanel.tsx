"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultServiceAreas, allUaeAreas } from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";

export function ServiceAreasPanel() {
  const [areas, setAreas] = useState<string[]>(defaultServiceAreas);

  const add = (area: string) =>
    setAreas((prev) => (prev.includes(area) ? prev : [...prev, area]));
  const remove = (area: string) =>
    setAreas((prev) => prev.filter((a) => a !== area));

  const available = allUaeAreas.filter((a) => !areas.includes(a));

  return (
    <div>
      <PanelHeader
        title="Service areas"
        subtitle="Choose the UAE areas you travel to. You'll appear in searches for each one you add."
      />

      <Card>
        <h3 className="text-sm font-semibold text-fg">
          Your areas
          <span className="ml-2 text-fg-muted">({areas.length})</span>
        </h3>
        <div className="mt-3 flex min-h-[3rem] flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {areas.map((area) => (
              <motion.button
                key={area}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                onClick={() => remove(area)}
                className="group inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-1.5 text-sm font-medium text-fg-invert"
                aria-label={`Remove ${area}`}
              >
                <MapPin className="h-3.5 w-3.5 text-lime-300" aria-hidden />
                {area}
                <X className="h-3.5 w-3.5 text-fg-invert-muted transition-colors group-hover:text-lime-300" aria-hidden />
              </motion.button>
            ))}
          </AnimatePresence>
          {areas.length === 0 && (
            <p className="text-sm text-fg-muted">
              No areas yet — add some below.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-ink-900/8 pt-5">
          <h3 className="text-sm font-semibold text-fg">Add an area</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {available.map((area) => (
              <button
                key={area}
                onClick={() => add(area)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-ink-900/12 bg-white px-3.5 py-1.5 text-sm font-medium text-fg-muted transition-colors",
                  "hover:border-lime-500/40 hover:bg-lime-300/10 hover:text-fg",
                )}
              >
                <Plus className="h-3.5 w-3.5" aria-hidden />
                {area}
              </button>
            ))}
            {available.length === 0 && (
              <p className="text-sm text-fg-muted">
                You&apos;ve added every available area.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
