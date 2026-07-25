"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { AuthInput } from "./AuthInput";

export function ResetForm() {
  const router = useRouter();
  const toast = useToast();
  const token = useSearchParams().get("token") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Reset failed.");
        setLoading(false);
        return;
      }
      setDone(true);
      toast("Password updated — you can sign in now ✓");
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1400);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="rounded-2xl bg-rose-500/10 p-4 text-sm text-rose-600">
        This reset link is missing its token. Please request a new one from{" "}
        <Link href="/forgot-password" className="font-semibold underline">
          Forgot password
        </Link>
        .
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-lime-400/40 bg-lime-300/10 p-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-lime-600" />
        <p className="text-sm text-fg">
          Password updated. Redirecting you to sign in…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}
      <AuthInput
        label="New password"
        name="password"
        isPassword
        autoComplete="new-password"
        required
        minLength={8}
        placeholder="At least 8 characters"
        icon={<Lock className="h-5 w-5" />}
      />
      <AuthInput
        label="Confirm password"
        name="confirm"
        isPassword
        autoComplete="new-password"
        required
        placeholder="Re-enter password"
        icon={<Lock className="h-5 w-5" />}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Updating…" : "Reset password"}
      </Button>
    </form>
  );
}
