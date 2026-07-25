import * as Icons from "lucide-react";
import type { Trainer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trustSignals, trustScore } from "@/lib/trust";

export function TrustBadges({
  trainer,
  className,
}: {
  trainer: Trainer;
  className?: string;
}) {
  const signals = trustSignals(trainer).filter((s) => s.active);
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {signals.map((s) => {
        const Icon =
          (Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon) ??
          Icons.ShieldCheck;
        return (
          <span
            key={s.key}
            title={s.note}
            className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/40 bg-lime-300/12 px-3 py-1.5 text-xs font-semibold text-fg"
          >
            <Icon className="h-3.5 w-3.5 text-lime-600" />
            {s.label}
          </span>
        );
      })}
    </div>
  );
}

export function TrustMeter({ trainer }: { trainer: Trainer }) {
  const score = trustScore(trainer);
  const tier = score >= 85 ? "Elite" : score >= 70 ? "Trusted" : "Verified";
  return (
    <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
          <Icons.ShieldCheck className="h-4 w-4 text-lime-600" /> Trust score
        </span>
        <span className="font-display text-lg font-bold">
          {score}
          <span className="text-sm font-medium text-fg-muted">/100</span>
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-lime-400"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-fg-muted">
        <span className="font-semibold text-lime-700">{tier}</span> trainer —
        based on verification, experience and verified reviews.
      </p>
    </div>
  );
}
