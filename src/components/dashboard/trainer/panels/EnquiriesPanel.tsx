"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Target, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { enquiries as seedEnquiries } from "@/data/trainerDashboard";
import { PanelHeader } from "./_shared";

type Decision = "accepted" | "declined";

export function EnquiriesPanel() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const decide = (id: string, d: Decision) =>
    setDecisions((prev) => ({ ...prev, [id]: d }));

  const open = seedEnquiries.filter((e) => !decisions[e.id]);
  const newCount = seedEnquiries.filter(
    (e) => e.status === "new" && !decisions[e.id],
  ).length;

  return (
    <div>
      <PanelHeader
        title="Client enquiries"
        subtitle={`${newCount} new ${newCount === 1 ? "enquiry needs" : "enquiries need"} a reply. Aim to respond within an hour to keep your response rate high.`}
      />

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {seedEnquiries.map((e) => {
            const decision = decisions[e.id];
            return (
              <motion.div
                key={e.id}
                layout
                initial={false}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                className={cn(
                  "rounded-3xl border bg-white p-5 transition-colors",
                  decision === "accepted"
                    ? "border-lime-500/40"
                    : decision === "declined"
                      ? "border-ink-900/8 opacity-60"
                      : "border-ink-900/8",
                )}
              >
                <div className="flex gap-4">
                  <Image
                    src={e.avatar}
                    alt={e.client}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-bold text-fg">
                        {e.client}
                      </h3>
                      {e.status === "new" && !decision && (
                        <span className="rounded-full bg-lime-300 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-900">
                          New
                        </span>
                      )}
                      {decision === "accepted" && (
                        <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-600">
                          Accepted
                        </span>
                      )}
                      {decision === "declined" && (
                        <span className="rounded-full bg-ink-900/8 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-fg-muted">
                          Declined
                        </span>
                      )}
                      <span className="ml-auto text-xs text-fg-muted">
                        {e.time}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5" aria-hidden />
                        {e.goal}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {e.area}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg">
                      {e.message}
                    </p>

                    {!decision && (
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        <Button variant="whatsapp" size="sm">
                          Reply on WhatsApp
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => decide(e.id, "accepted")}
                        >
                          <Check className="h-4 w-4" aria-hidden />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => decide(e.id, "declined")}
                        >
                          <X className="h-4 w-4" aria-hidden />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {open.length === 0 && (
        <p className="mt-6 text-center text-sm text-fg-muted">
          You&apos;ve actioned every enquiry. New ones will appear here.
        </p>
      )}
    </div>
  );
}
