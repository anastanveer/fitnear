import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ValuePanel } from "@/components/join/ValuePanel";
import { JoinForm } from "@/components/join/JoinForm";

export const metadata = { title: "Join as a trainer" };

const highlights = [
  { icon: Clock, label: "Takes ~4 minutes" },
  { icon: ShieldCheck, label: "Verified profile" },
  { icon: Sparkles, label: "No monthly fee" },
];

export default function JoinPage() {
  return (
    <main className="bg-cloud pb-20 sm:pb-28">
      {/* Intro / hero band */}
      <section className="pt-28 sm:pt-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Become a FitNear trainer</Eyebrow>
              <h1 className="display-2 font-display mt-4 font-bold text-balance">
                Turn your coaching into a business clients can find.
              </h1>
              <p className="mt-4 text-lg text-fg-muted">
                Create your trainer profile, set your rates and availability,
                and start receiving booking enquiries from people training near
                you across Dubai and Abu Dhabi. Free to join, and you&apos;re in
                control.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {highlights.map((h) => (
                  <li
                    key={h.label}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3.5 py-2 text-sm font-medium text-fg"
                  >
                    <h.icon className="h-4 w-4 text-lime-600" />
                    {h.label}
                  </li>
                ))}
                <li className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white px-3.5 py-2 text-sm font-medium text-fg-muted">
                  Scroll to start <ArrowRight className="h-4 w-4" />
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Form + value panel */}
      <section className="mt-12 sm:mt-16">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
            <ValuePanel />
            <JoinForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
