"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Clock,
  MapPin,
  MessageCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VerifiedBadge } from "@/components/ui/Badge";
import {
  ClientPanelHeader,
  ClientEmptyState,
  ClientAvatar,
  ClientStatusBadge,
} from "@/components/dashboard/shared/client-ui";
import { ButtonLink } from "@/components/ui/Button";
import { trainerBySlug } from "@/data/trainers";
import { upcomingSessions } from "@/data/clientDashboard";
import { aed } from "@/lib/utils";
import type { SectionKey } from "@/components/dashboard/client/sections";

const formatLabels: Record<string, string> = {
  home: "Home visit",
  gym: "Gym",
  outdoor: "Outdoor",
  online: "Online",
};

export function UpcomingSessionsPanel({
  onNavigate,
}: {
  onNavigate: (s: SectionKey) => void;
}) {
  const [cancelled, setCancelled] = useState<Record<string, boolean>>({});
  const active = upcomingSessions.filter((s) => !cancelled[s.id]);

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Upcoming sessions"
        description="Your confirmed bookings. Message your trainer, reschedule or cancel up to 6 hours before."
        action={
          <ButtonLink href="/search" variant="outline" size="sm">
            Book another
          </ButtonLink>
        }
      />

      {active.length === 0 ? (
        <ClientEmptyState
          icon={<CalendarClock className="h-6 w-6" />}
          title="No upcoming sessions"
          description="When you book a trainer, your session details will show up here."
          action={
            <ButtonLink href="/search" variant="primary" size="sm">
              Find a trainer
            </ButtonLink>
          }
        />
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {active.map((session) => {
              const trainer = trainerBySlug[session.trainerSlug];
              return (
                <motion.div
                  key={session.id}
                  layout
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                  className="overflow-hidden rounded-3xl border border-ink-900/8 bg-white"
                >
                  <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <ClientAvatar
                        src={trainer.avatar}
                        alt={trainer.name}
                        size={56}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/trainer/${trainer.slug}`}
                            className="font-display text-lg font-semibold text-fg hover:underline"
                          >
                            {trainer.name}
                          </Link>
                          {trainer.verified && <VerifiedBadge label={false} />}
                          {session.isNext && (
                            <ClientStatusBadge tone="warning">Next up</ClientStatusBadge>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-fg-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarClock className="h-4 w-4" /> {session.dateLabel}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> {session.timeLabel} ·{" "}
                            {session.durationMin} min
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {session.location}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">
                          <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-medium text-fg-muted">
                            {formatLabels[session.format]}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                      <span className="font-display text-xl font-bold text-fg">
                        {aed(session.price)}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onNavigate("messages")}
                        >
                          <MessageCircle className="h-4 w-4" /> Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4" /> Reschedule
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-500/10"
                          onClick={() =>
                            setCancelled((c) => ({ ...c, [session.id]: true }))
                          }
                        >
                          <X className="h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
