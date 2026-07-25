import Link from "next/link";
import { Check, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const perks = [
  { icon: MapPin, text: "Find verified trainers near you" },
  { icon: Sparkles, text: "AI matching + a starter plan" },
  { icon: ShieldCheck, text: "Secure, private and free to join" },
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-cloud pt-24 pb-16 lg:pt-0">
      <div className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Brand panel (desktop) */}
        <div className="hidden lg:block">
          <div className="surface-dark grain relative overflow-hidden rounded-[2.5rem] p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 glow-lime opacity-40" />
            <div className="relative">
              <Logo dark />
              <h2 className="display-3 font-display mt-10 font-bold text-balance">
                Your next session starts here.
              </h2>
              <p className="mt-4 max-w-sm text-fg-invert-muted">
                Join thousands of clients and trainers building a healthier UAE
                — one local session at a time.
              </p>
              <ul className="mt-8 space-y-4">
                {perks.map((p) => (
                  <li key={p.text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/15 text-lime-300">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-fg-invert">{p.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-fg-invert-muted">
                <Check className="h-4 w-4 shrink-0 text-lime-300" />
                Free forever for clients · No credit card required
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-fg-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && (
            <div className="mt-6 text-center text-sm text-fg-muted">{footer}</div>
          )}
          <p className="mt-8 text-center text-xs text-fg-muted">
            By continuing you agree to FitNear&apos;s{" "}
            <Link href="/" className="underline hover:text-fg">
              Terms
            </Link>{" "}
            &amp;{" "}
            <Link href="/" className="underline hover:text-fg">
              Privacy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
