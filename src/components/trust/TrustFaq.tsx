"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do you verify a trainer?",
    a: "Every trainer submits a government ID, coaching certifications and references. Our team checks each one — and runs a background screening — before the profile can go live. Only then is the Verified badge issued.",
  },
  {
    q: "What does the Verified badge actually mean?",
    a: "It means the person is who they say they are, holds real qualifications, and has been cleared for in-person and home sessions. It is never bought — it is earned through our checks.",
  },
  {
    q: "Is my payment safe?",
    a: "Yes. Your payment is held securely and only released to the trainer after your session takes place. You are never charged before you book, and there are no hidden fees.",
  },
  {
    q: "What if I'm not happy with my first session?",
    a: "Our first-session guarantee has you covered — if it's not the right fit, you get your money back, no questions asked.",
  },
  {
    q: "Is home training safe?",
    a: "You can share your live session location with a trusted contact, reach our support at any time, and filter for female-only trainers. Your exact address is shared with the trainer only after you confirm a booking.",
  },
  {
    q: "How are reviews kept genuine?",
    a: "Only clients who completed a paid session can leave a review. Nothing is bought, incentivised or faked — so ratings reflect real experiences.",
  },
];

export function TrustFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl divide-y divide-ink-900/8 rounded-3xl border border-ink-900/8 bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold">{f.q}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                  isOpen ? "rotate-45 bg-lime-300 text-ink-900" : "bg-mist text-fg-muted",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
