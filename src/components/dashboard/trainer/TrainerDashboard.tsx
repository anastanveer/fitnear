"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  MessageSquare,
  Wallet,
  Star,
  Clock,
  MapPin,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { VerifiedBadge, FeaturedBadge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { trainerPersona } from "@/data/trainerDashboard";

import { OverviewPanel } from "./panels/OverviewPanel";
import { AnalyticsPanel } from "./panels/AnalyticsPanel";
import { SessionsPanel } from "./panels/SessionsPanel";
import { EnquiriesPanel } from "./panels/EnquiriesPanel";
import { EarningsPanel } from "./panels/EarningsPanel";
import { ReviewsPanel } from "./panels/ReviewsPanel";
import { AvailabilityPanel } from "./panels/AvailabilityPanel";
import { ServiceAreasPanel } from "./panels/ServiceAreasPanel";
import { UpgradePanel } from "./panels/UpgradePanel";

type SectionKey =
  | "overview"
  | "analytics"
  | "sessions"
  | "enquiries"
  | "earnings"
  | "reviews"
  | "availability"
  | "areas"
  | "upgrade";

interface NavItem {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const NAV: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "sessions", label: "Upcoming sessions", icon: Calendar, badge: 12 },
  { key: "enquiries", label: "Client enquiries", icon: MessageSquare, badge: 2 },
  { key: "earnings", label: "Earnings & commission", icon: Wallet },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "availability", label: "Availability", icon: Clock },
  { key: "areas", label: "Service areas", icon: MapPin },
  { key: "upgrade", label: "Upgrade to Featured", icon: Zap },
];

const PANELS: Record<SectionKey, React.ComponentType> = {
  overview: OverviewPanel,
  analytics: AnalyticsPanel,
  sessions: SessionsPanel,
  enquiries: EnquiriesPanel,
  earnings: EarningsPanel,
  reviews: ReviewsPanel,
  availability: AvailabilityPanel,
  areas: ServiceAreasPanel,
  upgrade: UpgradePanel,
};

export function TrainerDashboard() {
  const [active, setActive] = useState<SectionKey>("overview");
  const reduce = useReducedMotion();
  const Panel = PANELS[active];

  return (
    <div className="min-h-screen bg-cloud pt-24 pb-20">
      <Container>
        {/* Trainer identity header */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-3xl border border-ink-900/8 bg-white p-4 sm:p-5">
          <Image
            src={trainerPersona.avatar}
            alt={trainerPersona.name}
            width={64}
            height={64}
            className="h-14 w-14 rounded-2xl object-cover sm:h-16 sm:w-16"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg font-bold text-fg sm:text-xl">
                {trainerPersona.name}
              </h2>
              <VerifiedBadge />
              <FeaturedBadge />
            </div>
            <p className="mt-0.5 truncate text-sm text-fg-muted">
              {trainerPersona.role} · {trainerPersona.area} · Member since{" "}
              {trainerPersona.memberSince}
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* ---------- Sidebar (desktop) ---------- */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Dashboard sections"
              className="sticky top-24 space-y-1 rounded-3xl border border-ink-900/8 bg-white p-2.5"
            >
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-fg-invert"
                        : "text-fg-muted hover:bg-ink-900/[0.04] hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-2xl bg-ink-900"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "relative z-10 h-4.5 w-4.5 shrink-0",
                        isActive && item.key === "upgrade" && "text-lime-300",
                      )}
                      aria-hidden
                    />
                    <span className="relative z-10 flex-1 text-left">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "relative z-10 grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold",
                          isActive
                            ? "bg-lime-300 text-ink-900"
                            : "bg-ink-900/8 text-fg",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ---------- Mobile nav ---------- */}
          <div className="mb-6 lg:hidden">
            <div className="mb-3 sm:hidden">
              <div className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                <Select
                  ariaLabel="Dashboard section"
                  value={active}
                  onChange={(v) => setActive(v as SectionKey)}
                  options={NAV.map((n) => ({ value: n.key, label: n.label }))}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActive(item.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "border-ink-900 bg-ink-900 text-fg-invert"
                          : "border-ink-900/12 bg-white text-fg-muted hover:text-fg",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---------- Main content ---------- */}
          <main className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <Panel />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </Container>
    </div>
  );
}
