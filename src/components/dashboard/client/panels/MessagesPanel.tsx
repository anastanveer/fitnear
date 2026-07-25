"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClientPanelHeader, ClientAvatar } from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import {
  clientProfile,
  conversations,
  chatThreads,
} from "@/data/clientDashboard";

export function MessagesPanel() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [showThreadMobile, setShowThreadMobile] = useState(false);

  const activeConvo = conversations.find((c) => c.id === activeId)!;
  const activeTrainer = trainerBySlug[activeConvo.trainerSlug];
  const thread = chatThreads[activeId] ?? [];

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Messages"
        description="Chat directly with your trainers. Coordinate timings, goals and locations."
      />

      <div className="grid overflow-hidden rounded-3xl border border-ink-900/8 bg-white lg:grid-cols-[320px_1fr]">
        {/* Conversation list */}
        <aside
          className={cn(
            "border-ink-900/8 lg:border-r",
            showThreadMobile ? "hidden lg:block" : "block",
          )}
        >
          <div className="border-b border-ink-900/8 px-5 py-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-fg-muted">
              Conversations
            </h2>
          </div>
          <ul className="max-h-[560px] overflow-y-auto no-scrollbar">
            {conversations.map((c) => {
              const trainer = trainerBySlug[c.trainerSlug];
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(c.id);
                      setShowThreadMobile(true);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-ink-900/5 px-5 py-4 text-left transition-colors",
                      isActive ? "bg-lime-300/12" : "hover:bg-cloud",
                    )}
                  >
                    <ClientAvatar src={trainer.avatar} alt={trainer.name} size={44} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold text-fg">
                          {trainer.name}
                        </p>
                        <span className="shrink-0 text-[11px] text-fg-muted">
                          {c.timeLabel}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-fg-muted">
                        {c.preview}
                      </p>
                    </div>
                    {c.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1.5 text-[11px] font-bold text-ink-900">
                        {c.unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Thread */}
        <section
          className={cn(
            "flex min-h-[560px] flex-col",
            showThreadMobile ? "flex" : "hidden lg:flex",
          )}
        >
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-ink-900/8 px-5 py-4">
            <button
              type="button"
              onClick={() => setShowThreadMobile(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-muted hover:bg-cloud lg:hidden"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <ClientAvatar src={activeTrainer.avatar} alt={activeTrainer.name} size={40} />
            <div>
              <p className="font-display font-semibold text-fg">
                {activeTrainer.name}
              </p>
              <p className="flex items-center gap-1 text-xs text-fg-muted">
                <MapPin className="h-3 w-3" /> {activeTrainer.area} ·{" "}
                {activeTrainer.responseTime}
              </p>
            </div>
          </div>

          {/* Bubbles */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-cloud/50 px-5 py-6 no-scrollbar">
            <AnimatePresence mode="popLayout">
              {thread.map((m) => {
                const mine = m.from === "client";
                return (
                  <motion.div
                    key={activeId + m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn("flex", mine ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        mine
                          ? "rounded-br-md bg-ink-900 text-fg-invert"
                          : "rounded-bl-md border border-ink-900/8 bg-white text-fg",
                      )}
                    >
                      <p>{m.text}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          mine ? "text-fg-invert-muted" : "text-fg-muted",
                        )}
                      >
                        {m.timeLabel}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Composer (visual only) */}
          <div className="border-t border-ink-900/8 p-4">
            <div className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2">
              <input
                type="text"
                placeholder={`Message ${activeTrainer.name.split(" ")[0]}…`}
                aria-label="Type a message"
                className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
              />
              <button
                type="button"
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-ink-900 transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-fg-muted">
              Demo conversation — messaging is illustrative in this prototype.
            </p>
          </div>
        </section>
      </div>

      <p className="text-xs text-fg-muted">
        Signed in as {clientProfile.name}.
      </p>
    </div>
  );
}
