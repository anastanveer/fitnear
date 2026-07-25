"use client";

import { Heart } from "lucide-react";
import { TrainerCard } from "@/components/trainer/TrainerCard";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import {
  ClientPanelHeader,
  ClientEmptyState,
} from "@/components/dashboard/shared/client-ui";
import { trainerBySlug } from "@/data/trainers";
import { savedTrainerSlugs } from "@/data/clientDashboard";

export function SavedTrainersPanel() {
  const saved = savedTrainerSlugs
    .map((slug) => trainerBySlug[slug])
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Saved trainers"
        description="Coaches you've shortlisted across the UAE. Book a session or compare before you commit."
        action={
          <ButtonLink href="/search" variant="outline" size="sm">
            Browse more
          </ButtonLink>
        }
      />

      {saved.length === 0 ? (
        <ClientEmptyState
          icon={<Heart className="h-6 w-6" />}
          title="No saved trainers yet"
          description="Tap the heart on any trainer to save them here for quick access."
          action={
            <ButtonLink href="/search" variant="primary" size="sm">
              Find trainers
            </ButtonLink>
          }
        />
      ) : (
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((trainer) => (
            <StaggerItem key={trainer.id}>
              <TrainerCard trainer={trainer} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
