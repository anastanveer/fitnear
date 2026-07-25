import { cn } from "@/lib/utils";

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

/** Section title + optional description for the top of each panel. */
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
          <p className="mt-1.5 max-w-xl text-sm text-fg-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
