"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Map as MapIcon,
  X,
  SearchX,
  Zap,
  ChevronRight,
  LocateFixed,
} from "lucide-react";
import { nearestArea } from "@/lib/geo";
import { useToast } from "@/components/ui/Toast";
import { Select } from "@/components/ui/Select";
import { Combobox } from "@/components/ui/Combobox";
import { trainers } from "@/data/trainers";
import { categories } from "@/data/categories";
import {
  applyFilters,
  countActiveFilters,
  defaultFilters,
  type Filters,
  type SortKey,
} from "@/lib/search";
import type { SportSlug } from "@/lib/types";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { TrainerCard } from "@/components/trainer/TrainerCard";
import { FilterPanel } from "./FilterPanel";
import { MapDetail } from "./MapDetail";

// Leaflet touches `window`, so the real map is client-only.
const RealMap = dynamic(
  () => import("./RealMap").then((m) => m.RealMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-ink-950 text-sm text-fg-invert-muted">
        Loading map…
      </div>
    ),
  },
);

const areas = [
  "Dubai Marina",
  "JVC",
  "Business Bay",
  "Downtown Dubai",
  "Al Barsha",
  "Dubai Hills",
  "Jumeirah",
  "Abu Dhabi",
];

const sortLabels: Record<SortKey, string> = {
  distance: "Nearest first",
  rating: "Highest rated",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
};

export function SearchExperience({
  initialArea = "",
  initialSport = "all",
  initialToday = false,
}: {
  initialArea?: string;
  initialSport?: SportSlug | "all";
  initialToday?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    area: initialArea,
    sport: initialSport,
    availableToday: initialToday,
  });
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const toast = useToast();

  const update = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const useMyLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      toast("Location isn't available on this device.", "error");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        update({ area });
        setLocating(false);
        toast(`Showing trainers near ${area}`);
      },
      () => {
        setLocating(false);
        toast("Couldn't get your location — please enter your area.", "error");
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };
  const reset = () =>
    setFilters({ ...defaultFilters, area: filters.area });

  const results = useMemo(() => applyFilters(trainers, filters), [filters]);
  const activeCount = countActiveFilters(filters);
  const selectedTrainer =
    (selectedId && results.find((t) => t.id === selectedId)) || null;

  return (
    <div className="pt-24">
      {/* Search bar */}
      <div className="sticky top-[4.5rem] z-30 border-b border-ink-900/8 bg-cloud/85 backdrop-blur-xl">
        <Container className="py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <Combobox
                className="flex-1"
                ariaLabel="Area or current location"
                value={filters.area}
                onChange={(v) => update({ area: v })}
                options={areas}
                placeholder="Area or current location"
                icon={<MapPin className="h-5 w-5 shrink-0 text-lime-600" />}
                rightSlot={
                  filters.area ? (
                    <button
                      onClick={() => update({ area: "" })}
                      aria-label="Clear location"
                      className="shrink-0 text-fg-muted hover:text-fg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={useMyLocation}
                      disabled={locating}
                      aria-label="Use my current location"
                      title="Use my current location"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-lime-600 hover:text-lime-700 disabled:opacity-50"
                    >
                      <LocateFixed
                        className={cn("h-4 w-4", locating && "animate-spin")}
                      />
                      <span className="hidden sm:inline">
                        {locating ? "Locating…" : "Near me"}
                      </span>
                    </button>
                  )
                }
              />

              <div className="flex flex-1 items-center rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                <Select
                  className="flex-1"
                  ariaLabel="Sport or category"
                  value={filters.sport}
                  onChange={(v) => update({ sport: v as Filters["sport"] })}
                  icon={<Search className="h-5 w-5 shrink-0 text-lime-600" />}
                  options={[
                    { value: "all", label: "Any sport or category" },
                    ...categories.map((c) => ({
                      value: c.slug,
                      label: c.name,
                    })),
                  ]}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* mobile filter button */}
              <button
                onClick={() => setSheetOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-ink-900">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* view toggle */}
              <div className="flex rounded-2xl border border-ink-900/10 bg-white p-1">
                <ViewButton
                  active={view === "list"}
                  onClick={() => setView("list")}
                  icon={<LayoutGrid className="h-4 w-4" />}
                  label="List"
                />
                <ViewButton
                  active={view === "map"}
                  onClick={() => setView("map")}
                  icon={<MapIcon className="h-4 w-4" />}
                  label="Map"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-44 space-y-4">
              <FilterPanel filters={filters} setFilters={update} onReset={reset} />
              <Link
                href="/promote"
                className="surface-dark grain group relative block overflow-hidden rounded-3xl p-5"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 glow-lime opacity-40" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-300/15 px-2.5 py-1 text-[11px] font-semibold text-lime-300">
                    <Zap className="h-3 w-3 fill-lime-300" /> For trainers
                  </span>
                  <p className="font-display mt-3 text-base font-semibold text-fg-invert">
                    Want to appear up here?
                  </p>
                  <p className="mt-1 text-xs text-fg-invert-muted">
                    Feature your profile for priority placement at the top of
                    search.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lime-300">
                    Get featured
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-bold">
                  {results.length}{" "}
                  {results.length === 1 ? "trainer" : "trainers"}{" "}
                  {filters.area ? `near ${filters.area}` : "available"}
                </h1>
                <p className="flex items-center gap-1.5 text-sm text-fg-muted">
                  <Zap className="h-3.5 w-3.5 text-lime-600" />
                  Featured trainers shown first ·{" "}
                  {activeCount > 0
                    ? `${activeCount} filter${activeCount > 1 ? "s" : ""} applied`
                    : "adjust filters to refine"}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-ink-900/10 bg-white px-3 py-2 text-sm">
                <span className="shrink-0 text-fg-muted">Sort</span>
                <Select
                  ariaLabel="Sort results"
                  align="right"
                  value={filters.sort}
                  onChange={(v) => update({ sort: v as SortKey })}
                  options={Object.entries(sortLabels).map(([k, v]) => ({
                    value: k,
                    label: v,
                  }))}
                  className="min-w-[9.5rem]"
                />
              </div>
            </div>

            {results.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : view === "map" ? (
              <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-4">
                  <div className="h-[26rem] overflow-hidden rounded-3xl border border-ink-900/10 sm:h-[32rem]">
                    <RealMap
                      trainers={results}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                    />
                  </div>
                  {selectedTrainer ? (
                    <MapDetail
                      trainer={selectedTrainer}
                      onClose={() => setSelectedId(null)}
                    />
                  ) : (
                    <p className="flex items-center gap-2 rounded-2xl border border-dashed border-ink-900/12 bg-white/50 px-4 py-3 text-sm text-fg-muted">
                      <MapPin className="h-4 w-4 text-lime-600" />
                      Tap any trainer pin on the map to see their location and
                      details here.
                    </p>
                  )}
                </div>
                <div className="flex max-h-[calc(100vh-13rem)] flex-col gap-3 overflow-y-auto pr-1 no-scrollbar">
                  {results.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={cn(
                        "rounded-2xl text-left transition-all",
                        selectedId === t.id && "ring-2 ring-lime-400 ring-offset-2",
                      )}
                    >
                      <TrainerCard trainer={t} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {results.map((t) => (
                  <TrainerCard key={t.id} trainer={t} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cloud p-4 lg:hidden"
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-ink-900/15" />
              <FilterPanel filters={filters} setFilters={update} onReset={reset} />
              <button
                onClick={() => setSheetOpen(false)}
                className="mt-4 w-full rounded-full bg-ink-900 py-3.5 font-semibold text-fg-invert"
              >
                Show {results.length} trainers
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
        active ? "bg-ink-900 text-fg-invert" : "text-fg-muted hover:text-fg",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/15 bg-white py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist text-fg-muted">
        <SearchX className="h-8 w-8" />
      </span>
      <h3 className="font-display mt-5 text-xl font-semibold">
        No trainers match those filters
      </h3>
      <p className="mt-2 max-w-sm text-sm text-fg-muted">
        Try widening your distance, raising your budget, or clearing a filter or
        two to see more coaches near you.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-fg-invert"
      >
        Reset filters
      </button>
    </div>
  );
}
