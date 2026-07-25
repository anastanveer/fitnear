"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  MessageCircle,
  Star,
  Zap,
  Wallet,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Notif = {
  id: number;
  icon: typeof Bell;
  accent: string;
  title: string;
  text: string;
  time: string;
  unread: boolean;
};

const seed: Notif[] = [
  {
    id: 1,
    icon: CalendarCheck,
    accent: "text-lime-600 bg-lime-300/20",
    title: "Session confirmed",
    text: "Your session with Omar Al Rashid is booked for Sat, 26 Jul · 6:30 AM.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    icon: MessageCircle,
    accent: "text-sky-600 bg-sky-500/15",
    title: "New message",
    text: "Layla Hassan replied: “See you Saturday at Kite Beach 🌅”",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    icon: Star,
    accent: "text-amber-600 bg-amber-400/20",
    title: "Leave a review",
    text: "How was your session with Sofia Rahman? Share your feedback.",
    time: "3h ago",
    unread: true,
  },
  {
    id: 4,
    icon: Zap,
    accent: "text-emerald-600 bg-emerald-500/15",
    title: "Trainer available today",
    text: "Elena Petrova has an opening this evening near Dubai Marina.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    icon: Wallet,
    accent: "text-fuchsia-600 bg-fuchsia-500/15",
    title: "Payment received",
    text: "AED 220 paid for your last session. Receipt available.",
    time: "2d ago",
    unread: false,
  },
];

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(seed);
  const rootRef = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const readOne = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-fg-muted transition-colors hover:text-fg"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-ink-900">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-ink-900/8 px-4 py-3">
              <p className="font-display text-sm font-bold">Notifications</p>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-lime-600 hover:text-lime-700"
                >
                  <Check className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>

            <ul className="max-h-80 overflow-y-auto no-scrollbar">
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => readOne(n.id)}
                    className={cn(
                      "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-mist",
                      n.unread && "bg-lime-300/[0.06]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        n.accent,
                      )}
                    >
                      <n.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-fg">
                          {n.title}
                        </span>
                        {n.unread && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                        {n.text}
                      </span>
                      <span className="mt-1 block text-[11px] text-fg-muted/70">
                        {n.time}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink-900/8 px-4 py-2.5 text-center">
              <span className="text-xs font-semibold text-fg-muted">
                You&apos;re all caught up
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
