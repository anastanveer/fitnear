"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  UserCheck,
  Users,
  CreditCard,
  BarChart3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { adminPersona, bookings as seedBookings } from "@/data/adminDashboard";
import type { Booking } from "@/data/adminDashboard";

import { OverviewPanel } from "./panels/OverviewPanel";
import { BookingsPanel } from "./panels/BookingsPanel";
import { CoachesPanel } from "./panels/CoachesPanel";
import { ClientsPanel } from "./panels/ClientsPanel";
import { PaymentsPanel } from "./panels/PaymentsPanel";
import { AnalyticsPanel } from "./panels/AnalyticsPanel";

type SectionKey =
  | "overview"
  | "bookings"
  | "coaches"
  | "clients"
  | "payments"
  | "analytics";

interface NavItem {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
}

export function AdminDashboard() {
  const [active, setActive] = useState<SectionKey>("overview");
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const reduce = useReducedMotion();

  const togglePaid = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id && b.status === "Pending" ? { ...b, status: "Paid" } : b,
      ),
    );
  }, []);

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  const NAV: (NavItem & { badge?: number })[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "bookings", label: "Bookings", icon: CalendarCheck, badge: pendingCount || undefined },
    { key: "coaches", label: "Coaches", icon: UserCheck },
    { key: "clients", label: "Clients", icon: Users },
    { key: "payments", label: "Payments & payouts", icon: CreditCard },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const renderPanel = () => {
    switch (active) {
      case "overview":
        return <OverviewPanel bookings={bookings} />;
      case "bookings":
        return <BookingsPanel bookings={bookings} onTogglePaid={togglePaid} />;
      case "coaches":
        return <CoachesPanel />;
      case "clients":
        return <ClientsPanel />;
      case "payments":
        return <PaymentsPanel bookings={bookings} />;
      case "analytics":
        return <AnalyticsPanel bookings={bookings} />;
    }
  };

  return (
    <div className="min-h-screen bg-cloud pt-24 pb-20">
      <Container>
        {/* Admin identity header */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-3xl border border-ink-900/8 bg-white p-4 sm:p-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-lime-300 sm:h-16 sm:w-16">
            <ShieldCheck className="h-7 w-7" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg font-bold text-fg sm:text-xl">
                {adminPersona.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-lime-300">
                Admin
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm text-fg-muted">
              {adminPersona.role} · {adminPersona.org}
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* ---------- Sidebar (desktop) ---------- */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Admin sections"
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
                        layoutId="admin-nav-active"
                        className="absolute inset-0 rounded-2xl bg-ink-900"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <Icon className="relative z-10 h-4.5 w-4.5 shrink-0" aria-hidden />
                    <span className="relative z-10 flex-1 text-left">
                      {item.label}
                    </span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "relative z-10 grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold",
                          isActive
                            ? "bg-lime-300 text-ink-900"
                            : "bg-amber-500/15 text-amber-700",
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
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
                  ariaLabel="Admin section"
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
                      {item.badge ? (
                        <span
                          className={cn(
                            "grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[11px] font-bold",
                            isActive
                              ? "bg-lime-300 text-ink-900"
                              : "bg-amber-500/15 text-amber-700",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
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
                {renderPanel()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </Container>
    </div>
  );
}
