import {
  Gift,
  CalendarX2,
  HandCoins,
  Percent,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Container";

const valueProps = [
  {
    icon: Gift,
    title: "Free registration",
    body: "Build a complete, verified profile and start receiving enquiries at zero cost.",
  },
  {
    icon: CalendarX2,
    title: "No monthly fee initially",
    body: "No subscription in the first version — you keep your profile live without a bill.",
  },
  {
    icon: HandCoins,
    title: "Trainers earn first",
    body: "You get paid for the session. Our model only works when you're already working.",
  },
  {
    icon: Percent,
    title: "Commission on paid bookings only",
    body: "A modest 10–15% applies solely to completed, paid bookings — never on leads.",
  },
  {
    icon: Sparkles,
    title: "Premium visibility is optional",
    body: "Featured placement and promotion come later, and only if you choose to use them.",
  },
];

export function ValuePanel() {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="surface-dark grain relative overflow-hidden rounded-3xl p-7 sm:p-9">
        <div className="glow-lime pointer-events-none absolute -right-20 -top-24 h-64 w-64 opacity-40" />
        <div className="glow-lime pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 opacity-20" />

        <div className="relative">
          <Eyebrow dark>Why join FitNear</Eyebrow>
          <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-balance sm:text-3xl">
            Fair terms, built so trainers win first.
          </h2>
          <p className="mt-3 text-sm text-fg-invert-muted">
            FitNear connects you with clients across Dubai and Abu Dhabi who are
            actively searching for a coach near them. Setting up takes a few
            minutes.
          </p>

          <ul className="mt-8 space-y-4">
            {valueProps.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lime-300/15 text-lime-300 ring-1 ring-inset ring-lime-300/20">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-fg-invert">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-invert-muted">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-white/10 pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-fg-invert">
              <ShieldCheck className="h-3.5 w-3.5 text-lime-300" /> Verified
              trainer badge
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-fg-invert">
              <Star className="h-3.5 w-3.5 text-lime-300" /> 900+ trainers
              onboarded
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
