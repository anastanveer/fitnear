"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================
   Small shared building blocks for the client dashboard.
   Named `client-*` to stay unique within shared/.
   ============================================================ */

/** Panel header used at the top of each dashboard panel. */
export function ClientPanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-fg sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-fg-muted">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

type StatusTone = "success" | "danger" | "neutral" | "warning";

const statusTones: Record<StatusTone, string> = {
  success: "bg-emerald-500/12 text-emerald-600",
  danger: "bg-rose-500/12 text-rose-600",
  neutral: "bg-ink-900/8 text-fg-muted",
  warning: "bg-amber-500/15 text-amber-600",
};

/** Coloured status pill (Completed / Cancelled / Paid / Refunded …). */
export function ClientStatusBadge({
  tone,
  children,
  className,
}: {
  tone: StatusTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        statusTones[tone],
        className,
      )}
    >
      {tone === "success" && <Check className="h-3 w-3" aria-hidden />}
      {tone === "danger" && <X className="h-3 w-3" aria-hidden />}
      {children}
    </span>
  );
}

/** Consistent empty-state block. */
export function ClientEmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/12 bg-white/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-700">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-fg">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-fg-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Rounded avatar with graceful sizing. */
export function ClientAvatar({
  src,
  alt,
  size = 44,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn(
        "shrink-0 rounded-2xl border border-white/70 object-cover shadow-sm",
        className,
      )}
    />
  );
}
