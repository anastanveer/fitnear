import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { trainerBySlug, featuredTrainers } from "@/data/trainers";
import type { TrainingFormat } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { TrainerCard } from "@/components/trainer/TrainerCard";

export const metadata = {
  title: "Book a session",
  description: "Book a training session with a verified FitNear trainer.",
};

const validFormats = new Set<TrainingFormat>(["home", "gym", "outdoor", "online"]);

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ trainer?: string; format?: string }>;
}) {
  const params = await searchParams;
  const trainer = params.trainer ? trainerBySlug[params.trainer] : undefined;
  const format =
    params.format && validFormats.has(params.format as TrainingFormat)
      ? (params.format as TrainingFormat)
      : undefined;

  // No trainer chosen → let the user pick one first.
  if (!params.trainer) {
    return (
      <div className="pt-28 pb-24">
        <Container>
          <h1 className="font-display text-3xl font-bold">Book a session</h1>
          <p className="mt-2 text-fg-muted">
            Choose a trainer to start your booking.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTrainers.map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (!trainer) notFound();

  return (
    <div className="pt-28 pb-24">
      <Container>
        <Link
          href={`/trainer/${trainer.slug}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {trainer.name}&apos;s profile
        </Link>
        <h1 className="font-display mb-8 text-3xl font-bold">
          Book a session with {trainer.name}
        </h1>
        <BookingFlow trainer={trainer} initialFormat={format} />
      </Container>
    </div>
  );
}
