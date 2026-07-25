import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  dark,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="FitNear home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300 shadow-[0_6px_20px_-6px_rgba(204,250,60,0.8)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" fill="none">
          <path
            d="M12 21s-6.5-4.35-9-8.5C1.5 9.5 3 6 6.5 6c2 0 3.5 1.5 5.5 3 2-1.5 3.5-3 5.5-3C21 6 22.5 9.5 21 12.5 18.5 16.65 12 21 12 21Z"
            className="fill-ink-900/0"
          />
          <path
            d="M4 12h3l1.5-3.5L11 15l2-6 1.5 3H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          dark ? "text-fg-invert" : "text-fg",
        )}
      >
        Fit<span className={dark ? "text-lime-300" : "text-lime-500"}>Near</span>
      </span>
    </Link>
  );
}
