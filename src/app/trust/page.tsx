import Link from "next/link";
import * as Icons from "lucide-react";
import {
  IdCard,
  GraduationCap,
  Award,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/shared/Counter";
import { safetyGuarantees } from "@/lib/trust";

export const metadata = {
  title: "Trust & Safety",
  description:
    "How FitNear verifies every trainer and keeps clients safe — ID and certification checks, background screening, insured coaches, secure payments and a first-session guarantee.",
};

const stages = [
  { icon: IdCard, title: "Identity check", text: "Government ID verified against the trainer's profile before they can go live." },
  { icon: GraduationCap, title: "Certification review", text: "Coaching qualifications and first-aid credentials checked by our team." },
  { icon: Award, title: "Experience validation", text: "Work history, references and specialisations confirmed." },
  { icon: ShieldCheck, title: "Verified badge issued", text: "Only then does a trainer earn the FitNear badge and priority placement." },
];

export default function TrustPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="surface-dark grain relative overflow-hidden pt-32 pb-20 text-fg-invert sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[55rem] -translate-x-1/2 glow-lime opacity-40" />
        <Container className="relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Trust &amp; Safety
            </span>
            <h1 className="display-1 font-display mx-auto mt-6 max-w-3xl font-bold text-balance">
              Your safety is <span className="text-lime-300">built in.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-fg-invert-muted">
              Anyone can call themselves a trainer. On FitNear, the verified
              badge means real checks have happened — so you can book with
              complete confidence.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Trust stats */}
      <section className="border-b border-ink-900/8 py-14">
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { to: 100, suffix: "%", label: "Trainers ID-verified before going live" },
              { to: 24, suffix: "h", label: "Free cancellation window on every booking" },
              { to: 4.9, decimals: 1, label: "Average rating from verified reviews" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="font-display text-5xl font-bold text-fg">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Verification stages */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">How we verify</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Four checks before any trainer meets you
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-ink-900/8 bg-white p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-lime-300">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 block text-xs font-bold text-lime-600">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="font-display mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Safety guarantees */}
      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">Protected every step</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Guarantees that have your back
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {safetyGuarantees.map((g, i) => {
              const Icon =
                (Icons[g.icon as keyof typeof Icons] as Icons.LucideIcon) ??
                ShieldCheck;
              return (
                <Reveal key={g.title} delay={(i % 4) * 0.06}>
                  <div className="h-full rounded-3xl border border-ink-900/8 bg-white p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display mt-4 text-base font-semibold">{g.title}</h3>
                    <p className="mt-2 text-sm text-fg-muted">{g.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pt-20">
        <Container>
          <Reveal>
            <div className="surface-dark grain relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 glow-lime opacity-40" />
              <div className="relative">
                <h2 className="display-3 font-display mx-auto max-w-2xl font-bold text-balance">
                  Book with confidence today
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-fg-invert-muted">
                  Every trainer verified. Every payment protected. Every session
                  backed by our guarantee.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <ButtonLink href="/search" variant="primary" size="lg">
                    Find a verified trainer <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <Link
                    href="/join"
                    className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-fg-invert hover:bg-white/15"
                  >
                    Become a verified trainer
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
