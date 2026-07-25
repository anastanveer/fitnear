import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  count,
  size = 14,
  className,
  dark,
}: {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={cn(
                filled
                  ? "fill-lime-400 text-lime-400"
                  : dark
                    ? "text-ink-500"
                    : "text-ink-900/20",
              )}
              aria-hidden
            />
          );
        })}
      </span>
      <span
        className={cn(
          "text-sm font-semibold",
          dark ? "text-fg-invert" : "text-fg",
        )}
      >
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span
          className={cn(
            "text-sm",
            dark ? "text-fg-invert-muted" : "text-fg-muted",
          )}
        >
          ({count})
        </span>
      )}
    </span>
  );
}
