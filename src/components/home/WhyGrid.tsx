import {
  MapPin,
  ShieldCheck,
  Wallet,
  MessageCircle,
  CalendarClock,
  Star,
  TrendingUp,
  BadgeCheck,
  Users,
  Gauge,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const clientReasons = [
  { icon: MapPin, title: "Genuinely local", text: "Every result is ranked by real distance from you, not paid ads." },
  { icon: ShieldCheck, title: "Verified professionals", text: "Identity, certifications and experience checked before a trainer goes live." },
  { icon: Wallet, title: "Transparent pricing", text: "Hourly rates shown upfront. No hidden fees, no surprises." },
  { icon: MessageCircle, title: "Instant contact", text: "Message trainers directly on WhatsApp, or book in a few taps." },
  { icon: CalendarClock, title: "Real availability", text: "See who's free today and this week before you reach out." },
  { icon: Star, title: "Honest reviews", text: "Ratings from real, completed sessions — nothing bought or faked." },
];

const trainerReasons = [
  { icon: Wallet, title: "Free to join", text: "No monthly fee to get started. You keep what you earn until a booking pays out." },
  { icon: TrendingUp, title: "Earn first", text: "We only take a small commission once you've been paid for a completed session." },
  { icon: Users, title: "Local clients", text: "Get discovered by people training exactly where you work." },
  { icon: BadgeCheck, title: "Build trust fast", text: "A verified badge and real reviews help you win clients sooner." },
  { icon: Gauge, title: "Simple tools", text: "Manage availability, enquiries and earnings from one clean dashboard." },
  { icon: Star, title: "Grow your reputation", text: "Great work rises. Strong ratings mean better placement over time." },
];

function Column({
  eyebrow,
  title,
  reasons,
  cta,
  href,
  dark,
}: {
  eyebrow: string;
  title: string;
  reasons: typeof clientReasons;
  cta: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "surface-dark grain relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
          : "rounded-[2rem] border border-ink-900/8 bg-white p-8 sm:p-10"
      }
    >
      {dark && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 glow-lime opacity-30" />
      )}
      <div className="relative">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h3 className="display-3 font-display mt-3 font-bold">{title}</h3>
        <ul className="mt-8 space-y-5">
          {reasons.map((r) => (
            <li key={r.title} className="flex gap-4">
              <span
                className={
                  dark
                    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/15 text-lime-300"
                    : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600"
                }
              >
                <r.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{r.title}</p>
                <p
                  className={
                    dark
                      ? "mt-0.5 text-sm text-fg-invert-muted"
                      : "mt-0.5 text-sm text-fg-muted"
                  }
                >
                  {r.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <ButtonLink
          href={href}
          variant={dark ? "primary" : "dark"}
          size="md"
          className="mt-8"
        >
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}

export function WhyGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Column
              eyebrow="For clients"
              title="Why clients choose FitNear"
              reasons={clientReasons}
              cta="Find a trainer"
              href="/search"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Column
              eyebrow="For trainers"
              title="Why trainers join FitNear"
              reasons={trainerReasons}
              cta="Join for free"
              href="/join"
              dark
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
