"use client";

import { useState } from "react";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { Measurement } from "@/data/progress";
import { SectionHeading } from "./progress-ui";
import { WeightChart } from "./WeightChart";

export function MeasurementsCard({
  measurements,
  onAdd,
}: {
  measurements: Measurement[];
  onAdd: (weightKg: number) => void;
}) {
  const toast = useToast();
  const [value, setValue] = useState("");

  const sorted = [...measurements].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const delta =
    latest && first
      ? Math.round((latest.weightKg - first.weightKg) * 10) / 10
      : 0;
  const down = delta <= 0;

  const submit = () => {
    const kg = Number(value);
    if (!value || Number.isNaN(kg) || kg < 30 || kg > 300) {
      toast("Enter a weight between 30 and 300 kg.", "error");
      return;
    }
    onAdd(Math.round(kg * 10) / 10);
    setValue("");
  };

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-6 sm:p-7">
      <SectionHeading
        icon={<Scale className="h-5 w-5" />}
        title="Measurements"
        description="Track your weight over time — trends matter more than any single day."
        action={
          latest ? (
            <div className="text-right">
              <p className="font-display text-2xl font-bold text-fg">
                {latest.weightKg}
                <span className="ml-1 text-sm font-semibold text-fg-muted">kg</span>
              </p>
              {sorted.length > 1 && (
                <p
                  className={cn(
                    "mt-0.5 inline-flex items-center gap-1 text-xs font-semibold",
                    down ? "text-emerald-600" : "text-amber-600",
                  )}
                >
                  {down ? (
                    <TrendingDown className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(delta)} kg since start
                </p>
              )}
            </div>
          ) : null
        }
      />

      <div className="mt-6">
        <WeightChart data={measurements} />
      </div>

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="flex-1">
          <label
            htmlFor="weigh-in"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted"
          >
            Today&apos;s weight (kg)
          </label>
          <input
            id="weigh-in"
            type="number"
            inputMode="decimal"
            step="0.1"
            min={30}
            max={300}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 66.0"
            className="w-full rounded-2xl border border-ink-900/12 bg-cloud px-4 py-3 text-sm text-fg placeholder:text-fg-muted/70 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40"
          />
        </div>
        <Button type="submit" variant="dark" size="lg" className="shrink-0">
          Add weigh-in
        </Button>
      </form>
    </div>
  );
}
