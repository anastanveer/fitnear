"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";
import type { ReelComment } from "@/data/reels";
import { cn } from "@/lib/utils";

const YOU_AVATAR = "https://i.pravatar.cc/100?img=68";

interface CommentsSheetProps {
  open: boolean;
  onClose: () => void;
  trainerName: string;
  comments: ReelComment[];
  onAddComment: (text: string) => void;
}

export function CommentsSheet({
  open,
  onClose,
  trainerName,
  comments,
  onAddComment,
}: CommentsSheetProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAddComment(text);
    setValue("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-30 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Comments on ${trainerName}'s reel`}
            className="absolute inset-x-0 bottom-0 z-40 flex max-h-[72%] flex-col rounded-t-3xl border-t border-white/10 bg-ink-900/95 backdrop-blur-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
          >
            <div className="flex flex-col items-center pt-2.5">
              <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
            </div>

            <div className="flex items-center justify-between px-5 pb-3 pt-3">
              <h2 className="text-sm font-semibold text-fg-invert">
                {comments.length} comment{comments.length === 1 ? "" : "s"}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close comments"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-fg-invert transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 pb-2">
              {comments.length === 0 ? (
                <li className="py-10 text-center text-sm text-fg-invert-muted">
                  No comments yet — start the conversation.
                </li>
              ) : (
                comments.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={c.avatar}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-fg-invert">
                        {c.author}
                      </p>
                      <p className="mt-0.5 text-sm text-fg-invert-muted">
                        {c.text}
                      </p>
                    </div>
                    <Heart
                      className="mt-1 h-4 w-4 shrink-0 text-white/30"
                      aria-hidden
                    />
                  </li>
                ))
              )}
            </ul>

            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-white/10 bg-ink-900/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={YOU_AVATAR}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Reply to ${trainerName.split(" ")[0]}…`}
                aria-label="Add a comment"
                className="h-10 min-w-0 flex-1 rounded-full border border-white/12 bg-white/8 px-4 text-sm text-fg-invert placeholder:text-white/40 focus:border-lime-300/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!value.trim()}
                aria-label="Post comment"
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
                  value.trim()
                    ? "bg-lime-300 text-ink-900 hover:bg-lime-200"
                    : "bg-white/10 text-white/40",
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
