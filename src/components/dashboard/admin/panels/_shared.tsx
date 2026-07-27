import { Check, Clock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/data/adminDashboard";

/** White rounded card matching the FitNear surface style. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ink-900/8 bg-white p-6 sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Section title + optional description/action for the top of each panel. */
export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-fg sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-2xl text-sm text-fg-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/**
 * Colour-coded payment badge — the visual answer to
 * "is the payment done?". Paid = lime/emerald, Pending = amber,
 * Refunded = grey.
 */
export function PaymentBadge({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) {
  const map = {
    Paid: {
      cls: "bg-emerald-500/12 text-emerald-700",
      Icon: Check,
    },
    Pending: {
      cls: "bg-amber-500/15 text-amber-700",
      Icon: Clock,
    },
    Refunded: {
      cls: "bg-ink-900/8 text-fg-muted",
      Icon: RotateCcw,
    },
  } as const;
  const { cls, Icon } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        cls,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {status}
    </span>
  );
}
