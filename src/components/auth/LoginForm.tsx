"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { AuthInput } from "./AuthInput";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const redirect = params.get("redirect") || "/dashboard/client";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      toast(`Welcome back, ${data.user.name.split(" ")[0]} 👋`);
      router.push(redirect);
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
      <AuthInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@email.com"
        icon={<Mail className="h-5 w-5" />}
      />
      <div>
        <AuthInput
          label="Password"
          name="password"
          isPassword
          autoComplete="current-password"
          required
          placeholder="Your password"
          icon={<Lock className="h-5 w-5" />}
        />
        <div className="mt-1.5 text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-lime-600 hover:text-lime-700"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
