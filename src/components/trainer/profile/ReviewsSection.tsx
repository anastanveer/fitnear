import Image from "next/image";
import { Star } from "lucide-react";
import type { Review } from "@/lib/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { Chip } from "@/components/ui/Badge";

function ratingBreakdown() {
  // synthesised distribution weighted toward high ratings
  const map = [0.02, 0.03, 0.05, 0.2, 0.7];
  return map.map((m, i) => ({ stars: i + 1, pct: Math.round(m * 100) }));
}

export function ReviewsSection({
  rating,
  count,
  reviews,
}: {
  rating: number;
  count: number;
  reviews: Review[];
}) {
  const dist = ratingBreakdown().reverse();

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* summary */}
      <div className="rounded-3xl border border-ink-900/8 bg-white p-6 lg:h-fit">
        <div className="text-center">
          <div className="font-display text-5xl font-bold">{rating.toFixed(1)}</div>
          <div className="mt-2 flex justify-center">
            <RatingStars rating={rating} size={16} />
          </div>
          <p className="mt-1 text-sm text-fg-muted">{count} reviews</p>
        </div>
        <div className="mt-5 space-y-2">
          {dist.map((d) => (
            <div key={d.stars} className="flex items-center gap-2 text-xs">
              <span className="inline-flex w-6 items-center gap-0.5 text-fg-muted">
                {d.stars}
                <Star className="h-3 w-3 fill-lime-400 text-lime-400" />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-lime-400"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-fg-muted">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-3xl border border-ink-900/8 bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image src={r.avatar} alt={r.author} fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{r.author}</p>
                  <p className="text-xs text-fg-muted">
                    {new Date(r.date).toLocaleDateString("en-AE", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <RatingStars rating={r.rating} size={13} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fg">“{r.text}”</p>
            {r.goal && (
              <div className="mt-3">
                <Chip>Goal: {r.goal}</Chip>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
