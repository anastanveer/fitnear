"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, AlertCircle, MailCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthInput } from "./AuthInput";

export function ForgotForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email") }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed.");
        setLoading(false);
        return;
      }
      setSent(true);
      if (data.devLink) setDevLink(data.devLink);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div>
        <div className="flex items-start gap-3 rounded-2xl border border-lime-400/40 bg-lime-300/10 p-4">
          <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
          <p className="text-sm text-fg">
            If an account exists for that email, we&apos;ve sent a link to reset
            your password. Check your inbox (and spam).
          </p>
        </div>

        {devLink && (
          <div className="mt-4 rounded-2xl border border-ink-900/10 bg-mist p-4">
            <p className="text-xs font-semibold text-fg-muted">
              Email delivery isn&apos;t enabled yet (demo) — use this link to
              reset now:
            </p>
            <Link
              href={devLink.replace(/^https?:\/\/[^/]+/, "")}
              className="mt-2 inline-flex items-center gap-1.5 break-all text-sm font-semibold text-lime-600 hover:text-lime-700"
            >
              <ExternalLink className="h-4 w-4 shrink-0" /> Open reset link
            </Link>
          </div>
        )}

        <Link
          href="/login"
          className="mt-6 block text-center text-sm font-semibold text-lime-600 hover:text-lime-700"
        >
          ← Back to sign in
        </Link>
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
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@email.com"
        icon={<Mail className="h-5 w-5" />}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
