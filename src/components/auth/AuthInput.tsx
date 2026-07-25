"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthInput({
  label,
  icon,
  type = "text",
  isPassword,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
      <span
        className={cn(
          "flex items-center gap-2.5 rounded-2xl border border-ink-900/10 bg-white px-4 py-3",
          "focus-within:border-lime-400 focus-within:ring-4 focus-within:ring-lime-300/20",
        )}
      >
        {icon && <span className="shrink-0 text-fg-muted">{icon}</span>}
        <input
          type={inputType}
          className="w-full bg-transparent text-sm placeholder:text-fg-muted focus:outline-none"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="shrink-0 text-fg-muted hover:text-fg"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
    </label>
  );
}
