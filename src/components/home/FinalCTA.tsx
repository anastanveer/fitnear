import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="pb-24 pt-4">
      <Container>
        <Reveal>
          <div className="surface-dark grain relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[50rem] -translate-x-1/2 glow-lime opacity-40" />
            <div className="relative">
              <h2 className="display-2 font-display mx-auto max-w-3xl font-bold text-balance">
                Ready to find the right trainer,{" "}
                <span className="text-lime-300">closer to you?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-fg-invert-muted">
                Join thousands of clients and trainers building a healthier UAE —
                one local session at a time.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/search" variant="primary" size="lg">
                  Find a trainer
                </ButtonLink>
                <ButtonLink
                  href="/join"
                  variant="dark"
                  size="lg"
                  className="border border-white/15 bg-white/10 hover:bg-white/15"
                >
                  Join as a trainer
                </ButtonLink>
              </div>
              <p className="mt-6 text-xs text-fg-invert-muted/70">
                Free for trainers · No credit card · Available across Dubai &amp;
                Abu Dhabi
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
