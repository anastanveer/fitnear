"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ClientPanelHeader,
  ClientEmptyState,
  ClientAvatar,
} from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import { reviewsToSubmit } from "@/data/clientDashboard";

const ratingWords = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export function ReviewsPanel() {
  const [submitted, setSubmitted] = useState<Record<string, number>>({});
  const pending = reviewsToSubmit.filter((r) => !submitted[r.id]);

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Reviews to submit"
        description="Your honest feedback helps other clients in the UAE and rewards great trainers."
      />

      {pending.length === 0 ? (
        <ClientEmptyState
          icon={<Check className="h-6 w-6" />}
          title="All caught up"
          description="You've reviewed every completed session. Thank you for helping the community."
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {pending.map((r) => (
            <ReviewCard
              key={r.id}
              prompt={r}
              onSubmit={(rating) =>
                setSubmitted((s) => ({ ...s, [r.id]: rating }))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({
  prompt,
  onSubmit,
}: {
  prompt: (typeof reviewsToSubmit)[number];
  onSubmit: (rating: number) => void;
}) {
  const trainer = trainerBySlug[prompt.trainerSlug];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || rating;

  return (
    <div className="flex flex-col rounded-3xl border border-ink-900/8 bg-white p-6">
      <div className="flex items-center gap-3">
        <ClientAvatar src={trainer.avatar} alt={trainer.name} size={48} />
        <div>
          <p className="font-display font-semibold text-fg">{trainer.name}</p>
          <p className="text-xs text-fg-muted">
            {prompt.sportLabel} · {prompt.dateLabel}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-fg-muted">
        How was your session with {trainer.name.split(" ")[0]}?
      </p>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }).map((_, i) => {
            const val = i + 1;
            const filled = val <= shown;
            return (
              <button
                key={val}
                type="button"
                role="radio"
                aria-checked={rating === val}
                aria-label={`${val} star${val > 1 ? "s" : ""}`}
                onMouseEnter={() => setHover(val)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(val)}
                className="rounded-md p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    filled
                      ? "fill-lime-400 text-lime-400"
                      : "text-ink-900/15",
                  )}
                />
              </button>
            );
          })}
        </div>
        {shown > 0 && (
          <span className="text-sm font-semibold text-lime-700">
            {ratingWords[shown]}
          </span>
        )}
      </div>

      <textarea
        rows={3}
        placeholder="Share a few words about your experience (optional)…"
        aria-label="Review comment"
        className="mt-4 w-full resize-none rounded-2xl border border-ink-900/10 bg-cloud px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-lime-400"
      />

      <Button
        variant="primary"
        size="sm"
        disabled={rating === 0}
        onClick={() => onSubmit(rating)}
        className="mt-4 self-start"
      >
        Submit review
      </Button>
    </div>
  );
}
