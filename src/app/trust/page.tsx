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
  ChevronRight,
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

const uns = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const stages = [
  { icon: IdCard, title: "Identity check", text: "Government ID verified against the trainer's profile before they go live." },
  { icon: GraduationCap, title: "Certification review", text: "Coaching qualifications and first-aid credentials checked by our team." },
  { icon: Award, title: "Experience validation", text: "Work history, references and specialisations confirmed." },
  { icon: ShieldCheck, title: "Verified badge issued", text: "Only then does a trainer earn the FitNear badge and priority placement." },
];

const safetyFeatures = [
  { icon: MapPin, title: "Share your location", text: "Send your live session location to a trusted contact in one tap." },
  { icon: PhoneCall, title: "Support on standby", text: "Reach the FitNear safety team any time, before or during a session." },
  { icon: UserCheck, title: "Female-only filter", text: "Prefer a female trainer? Filter your entire search in one click." },
  { icon: Lock, title: "Address protected", text: "Your exact location is shared with a trainer only after you book." },
];

/** Card with a subtle top accent + hover lift — used to break the flat-box look. */
function LiftCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.28)] ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-lime-300 to-lime-500 transition-transform duration-300 group-hover:scale-x-100" />
      {children}
    </div>
  );
}

export default function TrustPage() {
  const showcase = featuredTrainers[0];
  const signals = trustSignals(showcase).filter((s) => s.active).slice(0, 4);
  const score = trustScore(showcase);

  return (
    <div className="pb-24">
      {/* ===================== HERO ===================== */}
      <section className="surface-dark grain relative overflow-hidden pt-28 pb-40 text-fg-invert sm:pt-36">
        <div className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] glow-lime opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(194,242,42,0.06),transparent)]" />
        {/* faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#c2f22a 1px, transparent 1px), linear-gradient(90deg, #c2f22a 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
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

            {/* Showcase verified card + floating chips */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="animate-float rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-lime-300/40">
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
                      <span className="font-bold text-lime-300">{score}/100</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-lime-300" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                </div>
                {/* floating mini badges */}
                <div className="animate-float absolute -left-6 top-6 hidden rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-fg-invert backdrop-blur-xl sm:flex sm:items-center sm:gap-1.5" style={{ animationDelay: "1.2s" }}>
                  <Lock className="h-3.5 w-3.5 text-lime-300" /> Secure payments
                </div>
                <div className="animate-float absolute -right-4 -bottom-4 hidden rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-fg-invert backdrop-blur-xl sm:flex sm:items-center sm:gap-1.5" style={{ animationDelay: "0.6s" }}>
                  <ShieldCheck className="h-3.5 w-3.5 text-lime-300" /> Insured coaches
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===== Floating stats card overlapping the hero ===== */}
      <Container className="relative z-10 -mt-24">
        <Reveal>
          <div className="grid gap-4 rounded-[2rem] border border-ink-900/8 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] sm:grid-cols-3 sm:p-8">
            {[
              { to: 100, suffix: "%", label: "Trainers ID-verified before going live" },
              { to: 24, suffix: "h", label: "Free cancellation on every booking" },
              { to: 4.9, decimals: 1, label: "Avg rating from verified reviews" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${i < 2 ? "sm:border-r sm:border-ink-900/8" : ""}`}
              >
                <div className="font-display text-4xl font-bold text-fg sm:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-1.5 text-sm text-fg-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* ===================== COMPARISON ===================== */}
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
          <div className="mx-auto mt-12 grid max-w-3xl items-stretch gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-ink-900/8 bg-mist/60 p-7">
                <p className="text-sm font-semibold text-fg-muted">Elsewhere</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Anyone can list themselves",
                    "Unverified certifications",
                    "No background screening",
                    "Reviews can be bought or faked",
                    "Pay upfront, hope for the best",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-400/15">
                        <X className="h-3 w-3 text-rose-400" />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {/* premium dark card for contrast */}
              <div className="surface-dark grain relative h-full overflow-hidden rounded-3xl p-7">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 glow-lime opacity-40" />
                <p className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-lime-300">
                  <ShieldCheck className="h-4 w-4" /> On FitNear
                </p>
                <ul className="relative mt-4 space-y-3">
                  {[
                    "Every trainer ID-verified",
                    "Certifications reviewed by our team",
                    "Background screening completed",
                    "Reviews only from real, completed sessions",
                    "Payment held until your session happens",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm font-medium text-fg-invert">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime-300/20">
                        <Check className="h-3 w-3 text-lime-300" />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===================== VERIFICATION TIMELINE ===================== */}
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
          <div className="relative mt-14">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ink-900/15 to-transparent md:block" />
            <div className="grid gap-6 md:grid-cols-4">
              {stages.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="text-center md:text-left">
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-lime-300 shadow-[0_16px_40px_-16px_rgba(11,13,11,0.6)] md:mx-0">
                      <s.icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-xs font-bold text-ink-900">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-fg-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== IN-PERSON SAFETY (with image) ===================== */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
                  <Image
                    src={uns("1518611012118-696072aa579a")}
                    alt="Safe outdoor training"
                    fill
                    sizes="(max-width:1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                </div>
                {/* floating safety chip */}
                <div className="glass absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-white">
                  <ShieldCheck className="h-5 w-5 text-lime-300" />
                  <span className="text-sm font-semibold">Protected on every session</span>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow>Safe in person</Eyebrow>
                <h2 className="display-2 font-display mt-3 font-bold text-balance">
                  Extra care for home &amp; outdoor sessions
                </h2>
                <p className="mt-4 max-w-md text-fg-muted">
                  Training at home or in the park should feel just as safe as a
                  gym. These tools are built into every booking.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {safetyFeatures.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 2) * 0.08}>
                    <LiftCard className="p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600">
                        <f.icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display mt-3 text-base font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm text-fg-muted">{f.text}</p>
                    </LiftCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== PAYMENT PROTECTION (flow) ===================== */}
      <section className="surface-dark grain relative overflow-hidden py-20 text-fg-invert sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 glow-lime opacity-30" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow dark className="justify-center">Payment protection</Eyebrow>
              <h2 className="display-2 font-display mt-3 font-bold text-balance">
                Your money is protected end-to-end
              </h2>
            </Reveal>
          </div>
          <div className="relative mx-auto mt-14 max-w-4xl">
            {/* connector */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-lime-300/50 via-lime-300/30 to-lime-300/50 sm:block" />
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Wallet, title: "You pay securely", text: "Your payment is taken safely at booking." },
                { icon: CalendarCheck, title: "Held until the session", text: "Funds are held — not sent to the trainer yet." },
                { icon: Check, title: "Released after", text: "The trainer is paid only once your session is done." },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-300 text-ink-900 shadow-[0_16px_40px_-12px_rgba(204,250,60,0.5)]">
                      <s.icon className="h-7 w-7" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-lime-300">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-base font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-fg-invert-muted">{s.text}</p>
                    {i < 2 && (
                      <ChevronRight className="absolute -right-3 top-4 hidden h-6 w-6 text-lime-300/60 sm:block" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== GUARANTEES ===================== */}
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
                  <LiftCard>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-lime-500 text-ink-900">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display mt-4 text-base font-semibold">{g.title}</h3>
                    <p className="mt-2 text-sm text-fg-muted">{g.text}</p>
                  </LiftCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== FAQ ===================== */}
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

      {/* ===================== CTA ===================== */}
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
