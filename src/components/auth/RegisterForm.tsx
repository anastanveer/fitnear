"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { AuthInput } from "./AuthInput";

export function RegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const [role, setRole] = useState<"client" | "trainer">("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        setLoading(false);
        return;
      }
      toast("Account created — welcome to FitNear 🎉");
      router.push(role === "trainer" ? "/dashboard/trainer" : "/dashboard/client");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* role toggle */}
      <div>
        <span className="mb-1.5 block text-sm font-medium text-fg">I&apos;m joining as</span>
        <div className="flex rounded-2xl border border-ink-900/10 p-1">
          {(["client", "trainer"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "flex-1 rounded-xl px-3 py-2 text-sm font-semibold capitalize transition-colors",
                role === r ? "bg-ink-900 text-fg-invert" : "text-fg-muted hover:text-fg",
              )}
            >
              {r === "client" ? "A client" : "A trainer"}
            </button>
          ))}
        </div>
      </div>

      <AuthInput
        label="Full name"
        name="name"
        autoComplete="name"
        required
        placeholder="e.g. Layla Haddad"
        icon={<User className="h-5 w-5" />}
      />
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@email.com"
        icon={<Mail className="h-5 w-5" />}
      />
      <AuthInput
        label="Password"
        name="password"
        isPassword
        autoComplete="new-password"
        required
        minLength={8}
        placeholder="At least 8 characters"
        icon={<Lock className="h-5 w-5" />}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
