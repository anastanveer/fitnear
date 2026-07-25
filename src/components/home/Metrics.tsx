import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";

const metrics = [
  { to: 850, suffix: "+", label: "Verified trainers", decimals: 0 },
  { to: 32, suffix: "k+", label: "Sessions booked", decimals: 0 },
  { to: 4.9, suffix: "", label: "Average rating", decimals: 1 },
  { to: 40, prefix: "", suffix: "+", label: "UAE areas covered", decimals: 0 },
];

export function Metrics() {
  return (
    <section className="surface-dark grain relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 glow-lime opacity-40" />
      <Container className="relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-5xl font-bold text-lime-300 sm:text-6xl">
                <Counter
                  to={m.to}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-fg-invert-muted">
                {m.label}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-fg-invert-muted/70">
          Illustrative figures for this concept prototype.
        </p>
      </Container>
    </section>
  );
}
