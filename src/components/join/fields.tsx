"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Field label with an optional "required" or "optional" hint. */
export function FieldLabel({
  children,
  hint,
  htmlFor,
}: {
  children: React.ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center justify-between text-sm font-semibold text-fg"
    >
      <span>{children}</span>
      {hint && (
        <span className="text-xs font-medium text-fg-muted">{hint}</span>
      )}
    </label>
  );
}

/** A labelled text / email / tel input styled to the FitNear system. */
export function TextField({
  id,
  label,
  hint,
  icon,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <div className="group relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-4 text-fg-muted transition-colors group-focus-within:text-lime-600">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "h-12 w-full rounded-2xl border border-ink-900/12 bg-white text-sm text-fg placeholder:text-fg-muted/70 outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "focus:border-lime-400 focus:ring-4 focus:ring-lime-300/20",
            icon ? "pl-11 pr-4" : "px-4",
          )}
          {...props}
        />
      </div>
    </div>
  );
}

/** A bordered shell that hosts the custom <Select/> so it reads as a field. */
export function FieldShell({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="flex h-12 items-center rounded-2xl border border-ink-900/12 bg-white px-4 transition-all duration-200 focus-within:border-lime-400 focus-within:ring-4 focus-within:ring-lime-300/20">
        {children}
      </div>
    </div>
  );
}

/** Selectable pill used for specializations, service areas and certifications. */
export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        active
          ? "border-lime-400 bg-lime-300/20 text-fg"
          : "border-ink-900/12 text-fg-muted hover:border-ink-900/30 hover:text-fg",
      )}
    >
      {active && <Check className="h-3.5 w-3.5 text-lime-600" />}
      {children}
    </button>
  );
}

/** Two/three-way segmented control (e.g. gender, time buckets). */
export function Segmented({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex rounded-2xl border border-ink-900/12 bg-white p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200",
            value === o.value
              ? "bg-ink-900 text-fg-invert"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
