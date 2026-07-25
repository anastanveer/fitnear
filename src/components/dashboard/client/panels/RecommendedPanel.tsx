"use client";

import { TrainerCard } from "@/components/trainer/TrainerCard";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { ClientPanelHeader } from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import { clientProfile, recommendedTrainerSlugs } from "@/data/clientDashboard";

export function RecommendedPanel() {
  const recommended = recommendedTrainerSlugs
    .map((slug) => trainerBySlug[slug])
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Recommended for you"
        description={`Matched to your goals, budget and trainers near ${clientProfile.area}.`}
        action={
          <ButtonLink href="/search" variant="outline" size="sm">
            Refine matches
          </ButtonLink>
        }
      />

      <div className="rounded-3xl border border-lime-400/30 bg-lime-300/10 px-5 py-4">
        <Eyebrow>Smart match</Eyebrow>
        <p className="mt-2 text-sm text-fg">
          Because you booked strength and mobility sessions, we prioritised
          highly-rated coaches who train in your area and offer home visits.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {recommended.map((trainer) => (
          <StaggerItem key={trainer.id}>
            <TrainerCard trainer={trainer} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
