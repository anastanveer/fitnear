import { trainers } from "@/data/trainers";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { TrainerCard } from "@/components/trainer/TrainerCard";
import { ButtonLink } from "@/components/ui/Button";

export function TrainersNearYou() {
  const featured = trainers.slice(0, 8);
  return (
    <section className="relative bg-mist py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Trainers near you</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              Handpicked coaches in your area
            </h2>
            <p className="mt-3 max-w-lg text-fg-muted">
              Real, verified professionals — showing eight of hundreds available
              across the UAE.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/search" variant="dark" size="md">
              Browse all trainers
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 0.06}>
              <TrainerCard trainer={t} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
