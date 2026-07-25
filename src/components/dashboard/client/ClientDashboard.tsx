"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ClientAvatar } from "@/components/dashboard/shared/client-ui";
import { clientProfile } from "@/data/clientDashboard";
import { sections, type SectionKey } from "./sections";

import { OverviewPanel } from "./panels/OverviewPanel";
import { SavedTrainersPanel } from "./panels/SavedTrainersPanel";
import { RecentSearchesPanel } from "./panels/RecentSearchesPanel";
import { UpcomingSessionsPanel } from "./panels/UpcomingSessionsPanel";
import { BookingHistoryPanel } from "./panels/BookingHistoryPanel";
import { MessagesPanel } from "./panels/MessagesPanel";
import { ReviewsPanel } from "./panels/ReviewsPanel";
import { PaymentsPanel } from "./panels/PaymentsPanel";
import { RecommendedPanel } from "./panels/RecommendedPanel";
import { SettingsPanel } from "./panels/SettingsPanel";

export function ClientDashboard() {
  const [active, setActive] = useState<SectionKey>("overview");
  const reduce = useReducedMotion();

  function renderPanel() {
    switch (active) {
      case "overview":
        return <OverviewPanel onNavigate={setActive} />;
      case "saved":
        return <SavedTrainersPanel />;
      case "searches":
        return <RecentSearchesPanel />;
      case "upcoming":
        return <UpcomingSessionsPanel onNavigate={setActive} />;
      case "history":
        return <BookingHistoryPanel />;
      case "messages":
        return <MessagesPanel />;
      case "reviews":
        return <ReviewsPanel />;
      case "payments":
        return <PaymentsPanel />;
      case "recommended":
        return <RecommendedPanel />;
      case "settings":
        return <SettingsPanel />;
    }
  }

  return (
    <div className="min-h-screen bg-cloud pb-20 pt-24">
      <Container>
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-ink-900/8 bg-white p-4">
                <div className="flex items-center gap-3">
                  <ClientAvatar
                    src={clientProfile.avatar}
                    alt={clientProfile.name}
                    size={48}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-display font-semibold text-fg">
                      {clientProfile.name}
                    </p>
                    <p className="truncate text-xs text-fg-muted">
                      {clientProfile.area}
                    </p>
                  </div>
                </div>
              </div>

              <nav
                aria-label="Dashboard sections"
                className="rounded-3xl border border-ink-900/8 bg-white p-2"
              >
                <ul className="space-y-1">
                  {sections.map((s) => {
                    const Icon = s.icon;
                    const isActive = s.key === active;
                    return (
                      <li key={s.key}>
                        <button
                          type="button"
                          onClick={() => setActive(s.key)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "relative flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-ink-900 text-fg-invert"
                              : "text-fg-muted hover:bg-mist hover:text-fg",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4.5 w-4.5 shrink-0",
                              isActive ? "text-lime-300" : "",
                            )}
                          />
                          <span className="flex-1 text-left">{s.label}</span>
                          {s.badge ? (
                            <span
                              className={cn(
                                "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                                isActive
                                  ? "bg-lime-300 text-ink-900"
                                  : "bg-lime-300/20 text-lime-700",
                              )}
                            >
                              {s.badge}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-mist hover:text-fg"
              >
                <LogOut className="h-4.5 w-4.5" /> Sign out
              </button>
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0">
            {/* Mobile top bar */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-3">
                <ClientAvatar
                  src={clientProfile.avatar}
                  alt={clientProfile.name}
                  size={44}
                />
                <div>
                  <p className="text-xs text-fg-muted">Welcome back</p>
                  <p className="font-display font-semibold text-fg">
                    {clientProfile.firstName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-fg-muted"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-lime-400" />
              </button>
            </div>

            {/* Mobile horizontal tab bar */}
            <div className="mb-6 -mx-5 overflow-x-auto px-5 no-scrollbar lg:hidden">
              <div className="flex gap-2">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = s.key === active;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setActive(s.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "border-ink-900 bg-ink-900 text-fg-invert"
                          : "border-ink-900/10 bg-white text-fg-muted",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-lime-300" : "",
                        )}
                      />
                      {s.label}
                      {s.badge ? (
                        <span
                          className={cn(
                            "flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                            isActive
                              ? "bg-lime-300 text-ink-900"
                              : "bg-lime-300/20 text-lime-700",
                          )}
                        >
                          {s.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderPanel()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
}
