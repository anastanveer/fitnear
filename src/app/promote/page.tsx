import { ArrowRight, Zap } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PromotePlans } from "@/components/promote/PromotePlans";

export const metadata = {
  title: "Get featured — promote your profile",
  description:
    "Boost your visibility on FitNear. Featured trainers get priority placement at the top of search results across the UAE.",
};

export default function PromotePage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="surface-dark grain relative overflow-hidden pt-32 pb-20 text-fg-invert sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[55rem] -translate-x-1/2 glow-lime opacity-40" />
        <Container className="relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
              <Zap className="h-3.5 w-3.5 fill-lime-300" /> Featured listings
            </span>
            <h1 className="display-1 font-display mx-auto mt-6 max-w-3xl font-bold text-balance">
              Get seen first. <span className="text-lime-300">Grow faster.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-fg-invert-muted">
              Great coaching deserves to be found. Feature your profile and take
              priority placement at the top of search — right where clients in
              your area are looking.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="#plans" variant="primary" size="lg">
                See plans <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/join"
                variant="dark"
                size="lg"
                className="border border-white/15 bg-white/10 hover:bg-white/15"
              >
                Join for free first
              </ButtonLink>
            </div>
            <p className="mt-5 text-xs text-fg-invert-muted/70">
              Trainers keep every booking they earn · Featuring is optional and
              cancellable anytime
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Plans + benefits */}
      <section id="plans" className="pt-16 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">How featuring works</Eyebrow>
              <h2 className="display-3 font-display mt-3 font-bold text-balance">
                A simple boost, aligned with your success
              </h2>
              <p className="mt-4 text-fg-muted">
                Featuring is a flat monthly fee for visibility — completely
                separate from bookings. You always keep what you earn from
                clients.
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <PromotePlans />
          </div>
        </Container>
      </section>
    </div>
  );
}
