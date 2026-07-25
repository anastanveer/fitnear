import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  IdCard,
  GraduationCap,
  Award,
  ShieldCheck,
  ArrowRight,
  Check,
  X,
  MapPin,
  PhoneCall,
  UserCheck,
  Lock,
  Wallet,
  CalendarCheck,
  Star,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/shared/Counter";
import { featuredTrainers } from "@/data/trainers";
import { safetyGuarantees, trustSignals, trustScore } from "@/lib/trust";
import { TrustFaq } from "@/components/trust/TrustFaq";

export const metadata = {
  title: "Trust & Safety",
  description:
    "How FitNear verifies every trainer and protects clients — ID and certification checks, background screening, insured coaches, secure payments and a first-session guarantee.",
};

const stages = [
  { icon: IdCard, title: "Identity check", text: "Government ID verified against the trainer's profile before they can go live." },
  { icon: GraduationCap, title: "Certification review", text: "Coaching qualifications and first-aid credentials checked by our team." },
  { icon: Award, title: "Experience validation", text: "Work history, references and specialisations confirmed." },
  { icon: ShieldCheck, title: "Verified badge issued", text: "Only then does a trainer earn the FitNear badge and priority placement." },
];

const compare = [
  "Anyone can list themselves",
  "Unverified certifications",
  "No background screening",
  "Reviews can be bought or faked",
  "Pay upfront, hope for the best",
];

const safetyFeatures = [
  { icon: MapPin, title: "Share your location", text: "Send your live session location to a trusted contact in one tap." },
  { icon: PhoneCall, title: "Support on standby", text: "Reach the FitNear safety team any time, before or during a session." },
  { icon: UserCheck, title: "Female-only filter", text: "Prefer a female trainer? Filter your entire search in one click." },
  { icon: Lock, title: "Address protected", text: "Your exact location is shared with a trainer only after you book." },
];

export default function TrustPage() {
  const showcase = featuredTrainers[0];
  const signals = trustSignals(showcase).filter((s) => s.active).slice(0, 4);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="surface-dark grain relative overflow-hidden pt-28 pb-20 text-fg-invert sm:pt-36">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 glow-lime opacity-40" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Trust &amp; Safety
              </span>
              <h1 className="display-1 font-display mt-6 font-bold text-balance">
                Your safety is <span className="text-lime-300">built in.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-fg-invert-muted">
                Anyone can call themselves a trainer. On FitNear, the verified
                badge means real checks have happened — so you book with complete
                confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/search" variant="primary" size="lg">
                  Find a verified trainer <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>

            {/* Showcase verified card */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="animate-float rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                      <Image src={showcase.avatar} alt={showcase.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-display font-semibold text-fg-invert">{showcase.name}</p>
                        <ShieldCheck className="h-4 w-4 text-lime-300" />
                      </div>
                      <p className="flex items-center gap-1 text-xs text-fg-invert-muted">
                        <Star className="h-3 w-3 fill-lime-300 text-lime-300" /> {showcase.rating} · {showcase.area}
                      </p>
                    </div>
                    <span className="ml-auto rounded-full bg-lime-300 px-2.5 py-1 text-[11px] font-bold text-ink-900">
                      Verified
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {signals.map((s) => (
                      <span key={s.key} className="inline-flex items-center gap-1.5 rounded-full border border-lime-300/25 bg-lime-300/10 px-2.5 py-1 text-[11px] font-semibold text-fg-invert">
                        <Check className="h-3 w-3 text-lime-300" /> {s.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-white/5 p-3">
                    <div className="flex items-center justify-between text-xs text-fg-invert-muted">
                      <span>Trust score</span>
                      <span className="font-bold text-lime-300">{trustScore(showcase)}/100</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-lime-300" style={{ width: `${trustScore(showcase)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
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

      {/* What verified means — comparison */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">The difference</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                What &ldquo;verified&rdquo; really means
              </h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-ink-900/8 bg-white p-7">
                <p className="text-sm font-semibold text-fg-muted">Elsewhere</p>
                <ul className="mt-4 space-y-3">
                  {compare.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-lime-400/40 bg-lime-300/[0.07] p-7 ring-1 ring-lime-300/30">
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-700">
                  <ShieldCheck className="h-4 w-4" /> On FitNear
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Every trainer ID-verified",
                    "Certifications reviewed by our team",
                    "Background screening completed",
                    "Reviews only from real, completed sessions",
                    "Payment held until your session happens",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm font-medium text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-600" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Verification stages */}
      <section className="bg-mist py-20 sm:py-24">
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
                  <span className="mt-4 block text-xs font-bold text-lime-600">STEP 0{i + 1}</span>
                  <h3 className="font-display mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* In-person safety */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Safe in person</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Extra care for home &amp; outdoor sessions
              </h2>
              <p className="mt-4 max-w-md text-fg-muted">
                Training at home or in the park should feel just as safe as a gym.
                These tools are built into every booking.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {safetyFeatures.map((f, i) => (
                <Reveal key={f.title} delay={(i % 2) * 0.08}>
                  <div className="h-full rounded-3xl border border-ink-900/8 bg-white p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-3 text-base font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Payment protection */}
      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">Payment protection</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Your money is protected end-to-end
              </h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { icon: Wallet, step: "1", title: "You pay securely", text: "Your payment is taken safely at booking." },
              { icon: CalendarCheck, step: "2", title: "Held until the session", text: "Funds are held — not sent to the trainer yet." },
              { icon: Check, step: "3", title: "Released after", text: "The trainer is paid only once your session is done." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-ink-900/8 bg-white p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-ink-900">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Guarantees */}
      <section className="py-20 sm:py-24">
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
              const Icon = (Icons[g.icon as keyof typeof Icons] as Icons.LucideIcon) ?? ShieldCheck;
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

      {/* FAQ */}
      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">Good to know</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Trust &amp; safety questions
              </h2>
            </Reveal>
          </div>
          <div className="mt-12">
            <TrustFaq />
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
