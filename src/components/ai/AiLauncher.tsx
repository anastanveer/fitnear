"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/** Floating "Ask AI" launcher, present on most pages. */
export function AiLauncher() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/ai-coach") || pathname.startsWith("/reels");

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
        >
          <Link
            href="/ai-coach"
            aria-label="Ask the FitNear AI coach"
            className="group flex items-center gap-2.5 rounded-full bg-ink-900 py-3 pl-3 pr-4 text-sm font-semibold text-fg-invert shadow-[0_16px_40px_-12px_rgba(11,13,11,0.6)] transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 text-ink-900">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300 opacity-60 animate-ping-slow" />
              <Sparkles className="relative h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Ask AI</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
