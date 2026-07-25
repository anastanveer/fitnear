"use client";

import { Star, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import type { Filters } from "@/lib/search";
import { PRICE_MAX, DISTANCE_MAX } from "@/lib/search";
import type { TrainingFormat } from "@/lib/types";
import { categories } from "@/data/categories";
import { aed, cn } from "@/lib/utils";

const formats: { key: TrainingFormat; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "gym", label: "Gym" },
  { key: "outdoor", label: "Outdoor" },
  { key: "online", label: "Online" },
];

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-ink-900/8 py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-semibold text-fg">{title}</h3>
      {children}
    </div>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  onReset,
}: {
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  onReset: () => void;
}) {
  const toggleFormat = (key: TrainingFormat) => {
    const next = filters.formats.includes(key)
      ? filters.formats.filter((f) => f !== key)
      : [...filters.formats, key];
    setFilters({ formats: next });
  };

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-5">
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-fg-muted hover:text-fg"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <Group title="Sport">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={filters.sport === "all"}
            onClick={() => setFilters({ sport: "all" })}
          >
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={filters.sport === c.slug}
              onClick={() => setFilters({ sport: c.slug })}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
      </Group>

      <Group title="Trainer gender">
        <Segmented
          value={filters.gender}
          options={[
            { value: "any", label: "Any" },
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
          onChange={(v) => setFilters({ gender: v as Filters["gender"] })}
        />
      </Group>

      <Group title="Training format">
        <div className="grid grid-cols-2 gap-2">
          {formats.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFormat(f.key)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                filters.formats.includes(f.key)
                  ? "border-lime-400 bg-lime-300/20 text-fg"
                  : "border-ink-900/10 text-fg-muted hover:border-ink-900/25",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Group>

      <Group title={`Max price · ${aed(filters.maxPrice)}${filters.maxPrice >= PRICE_MAX ? "+" : ""}/hr`}>
        <input
          type="range"
          min={100}
          max={PRICE_MAX}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
          className="fitnear-range"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-fg-muted">
          <span>AED 100</span>
          <span>AED {PRICE_MAX}+</span>
        </div>
      </Group>

      <Group title={`Within ${filters.maxDistance} km`}>
        <input
          type="range"
          min={1}
          max={DISTANCE_MAX}
          step={1}
          value={filters.maxDistance}
          onChange={(e) => setFilters({ maxDistance: Number(e.target.value) })}
          className="fitnear-range"
          aria-label="Maximum distance"
        />
        <div className="mt-1 flex justify-between text-xs text-fg-muted">
          <span>1 km</span>
          <span>{DISTANCE_MAX} km</span>
        </div>
      </Group>

      <Group title="Minimum rating">
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ minRating: r })}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                filters.minRating === r
                  ? "border-lime-400 bg-lime-300/20 text-fg"
                  : "border-ink-900/10 text-fg-muted hover:border-ink-900/25",
              )}
            >
              {r === 0 ? (
                "Any"
              ) : (
                <>
                  <Star className="h-3 w-3 fill-lime-400 text-lime-400" /> {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Quick filters">
        <div className="space-y-2">
          <Toggle
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Verified trainers only"
            checked={filters.verifiedOnly}
            onChange={(v) => setFilters({ verifiedOnly: v })}
          />
          <Toggle
            icon={<Zap className="h-4 w-4" />}
            label="Available today"
            checked={filters.availableToday}
            onChange={(v) => setFilters({ availableToday: v })}
          />
        </div>
      </Group>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-ink-900 bg-ink-900 text-fg-invert"
          : "border-ink-900/10 text-fg-muted hover:border-ink-900/25",
      )}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-xl border border-ink-900/10 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            value === o.value
              ? "bg-ink-900 text-fg-invert"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-2 rounded-xl border border-ink-900/8 px-3 py-2.5 text-left"
    >
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        <span className="text-lime-600">{icon}</span>
        {label}
      </span>
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-lime-400" : "bg-ink-900/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
            checked ? "left-[1.15rem]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}
