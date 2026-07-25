import { BadgeCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({
  className,
  label = true,
}: {
  className?: string;
  label?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-lime-300/15 px-2 py-0.5 text-xs font-semibold text-lime-700",
        className,
      )}
      title="Identity, certifications and experience verified by FitNear"
    >
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      {label && "Verified"}
    </span>
  );
}

export function AvailableTodayBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-xs font-semibold text-emerald-600",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping-slow" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      Available today
    </span>
  );
}

export function FeaturedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-lime-300",
        className,
      )}
    >
      <Zap className="h-3 w-3 fill-lime-300" aria-hidden />
      Featured
    </span>
  );
}

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
