"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
  MoreHorizontal,
} from "lucide-react";
import type { FeedPost } from "@/data/posts";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/feed";
import { VerifiedBadge } from "@/components/ui/Badge";

export function PostCard({
  post,
  onLike,
  onSave,
  onComment,
}: {
  post: FeedPost;
  onLike: () => void;
  onSave: () => void;
  onComment: (text: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");

  const submitComment = () => {
    const t = draft.trim();
    if (!t) return;
    onComment(t);
    setDraft("");
    setShowComments(true);
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-ink-900/8 bg-white">
      {/* header */}
      <div className="flex items-center gap-3 p-4">
        <Link
          href={`/trainer/${post.trainerSlug}`}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full"
        >
          <Image src={post.authorAvatar} alt={post.authorName} fill sizes="44px" className="object-cover" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Link
              href={`/trainer/${post.trainerSlug}`}
              className="truncate font-semibold hover:underline"
            >
              {post.authorName}
            </Link>
            {post.verified && <VerifiedBadge label={false} />}
          </div>
          <p className="truncate text-xs text-fg-muted">
            {post.authorRole} · {relativeTime(post.createdAt, post.timeLabel)}
          </p>
        </div>
        <button
          aria-label="More"
          className="rounded-full p-1.5 text-fg-muted hover:bg-ink-900/5"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* text */}
      <p className="px-4 pb-3 text-[15px] leading-relaxed text-fg">{post.text}</p>

      {/* tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {post.tags.map((t) => (
            <span key={t} className="text-sm font-medium text-lime-600">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* image */}
      {post.image && (
        <div className="relative aspect-[16/10] w-full bg-mist">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 640px"
            className="object-cover"
            unoptimized={post.image.startsWith("data:")}
          />
        </div>
      )}

      {/* engagement bar */}
      <div className="flex items-center gap-1 px-2 py-2">
        <button
          onClick={onLike}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
            post.liked ? "text-rose-500" : "text-fg-muted hover:bg-ink-900/5",
          )}
        >
          <motion.span
            key={String(post.liked)}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Heart className={cn("h-5 w-5", post.liked && "fill-rose-500")} />
          </motion.span>
          {post.likes}
        </button>

        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-ink-900/5"
        >
          <MessageCircle className="h-5 w-5" />
          {post.comments.length}
        </button>

        <button className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-ink-900/5">
          <Share2 className="h-5 w-5" />
        </button>

        <button
          onClick={onSave}
          aria-label="Save"
          className={cn(
            "ml-auto rounded-full px-3 py-2 transition-colors",
            post.saved ? "text-lime-600" : "text-fg-muted hover:bg-ink-900/5",
          )}
        >
          <Bookmark className={cn("h-5 w-5", post.saved && "fill-lime-500 text-lime-600")} />
        </button>
      </div>

      {/* comments */}
      <AnimatePresence initial={false}>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-900/8"
          >
            <div className="space-y-3 p-4">
              {post.comments.length === 0 && (
                <p className="text-sm text-fg-muted">
                  Be the first to comment.
                </p>
              )}
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                    <Image src={c.avatar} alt={c.author} fill sizes="32px" className="object-cover" />
                  </div>
                  <div className="rounded-2xl bg-mist px-3 py-2">
                    <p className="text-xs font-semibold">{c.author}</p>
                    <p className="text-sm text-fg">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* add comment */}
      <div className="flex items-center gap-2 border-t border-ink-900/8 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitComment()}
          placeholder="Add a comment…"
          className="flex-1 rounded-full bg-mist px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
        />
        <button
          onClick={submitComment}
          disabled={!draft.trim()}
          aria-label="Send comment"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-lime-300 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
