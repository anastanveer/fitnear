"use client";

import { Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BADGES } from "@/data/progress";

export function BadgesGrid({ unlocked }: { unlocked: string[] }) {
  const reduce = useReducedMotion();
  const set = new Set(unlocked);
  const count = set.size;

  return (
    <div>
      <p className="mb-4 text-sm text-fg-muted">
        <span className="font-bold text-fg">{count}</span> of {BADGES.length} unlocked
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {BADGES.map((b, i) => {
          const on = set.has(b.id);
          const Icon = b.icon;
          return (
            <motion.li
              key={b.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col items-center gap-2.5 rounded-3xl border p-5 text-center transition-colors",
                on
                  ? "border-lime-300 bg-lime-300/10"
                  : "border-ink-900/8 bg-white",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  on ? "bg-lime-300 text-ink-900" : "bg-mist text-fg-muted/60",
                )}
              >
                {on ? (
                  <Icon className="h-6 w-6" aria-hidden />
                ) : (
                  <Lock className="h-5 w-5" aria-hidden />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-bold",
                    on ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {b.label}
                </p>
                <p className="mt-0.5 text-xs text-fg-muted">{b.description}</p>
              </div>
              <span className="sr-only">
                {on ? "Unlocked" : "Locked"}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
