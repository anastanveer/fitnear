import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Award,
  MapPin,
  Dumbbell,
  Home,
  Building2,
  Trees,
  Wifi,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { trainerBySlug, trainers, similarTrainers } from "@/data/trainers";
import { safetyGuarantees } from "@/lib/trust";
import { TrustBadges, TrustMeter } from "@/components/trainer/TrustBadges";
import type { TrainingFormat } from "@/lib/types";
import { Container, Eyebrow } from "@/components/ui/Container";
import { TrainerCard } from "@/components/trainer/TrainerCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryBySlug } from "@/data/categories";
import { ProfileHeader } from "@/components/trainer/profile/ProfileHeader";
import { BookingWidget } from "@/components/trainer/profile/BookingWidget";
import { AvailabilityCalendar } from "@/components/trainer/profile/AvailabilityCalendar";
import { TransformationGallery } from "@/components/trainer/profile/TransformationGallery";
import { ReviewsSection } from "@/components/trainer/profile/ReviewsSection";

export function generateStaticParams() {
  return trainers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = trainerBySlug[slug];
  if (!trainer) return { title: "Trainer" };
  return {
    title: trainer.name,
    description: trainer.headline,
  };
}

const formatMeta: Record<TrainingFormat, { label: string; icon: typeof Home }> = {
  home: { label: "Home training", icon: Home },
  gym: { label: "Gym sessions", icon: Building2 },
  outdoor: { label: "Outdoor", icon: Trees },
  online: { label: "Online coaching", icon: Wifi },
};

function Section({
  title,
  children,
  id,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-ink-900/8 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display mb-5 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function TrainerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = trainerBySlug[slug];
  if (!trainer) notFound();

  const similar = similarTrainers(trainer);

  return (
    <div className="pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: trainer.name,
          image: trainer.avatar,
          jobTitle: `${categoryBySlug[trainer.primarySport]?.name} coach`,
          knowsLanguage: trainer.languages,
          address: {
            "@type": "PostalAddress",
            addressLocality: trainer.area,
            addressRegion: trainer.city,
            addressCountry: "AE",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: trainer.rating,
            reviewCount: trainer.reviewCount,
            bestRating: 5,
          },
          makesOffer: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: trainer.hourlyRate,
            description: `${trainer.primarySport.replace("-", " ")} training session`,
          },
        }}
      />
      <ProfileHeader trainer={trainer} />

      <Container className="py-10">
        <Link
          href="/search"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back to search
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          {/* Main */}
          <div className="min-w-0">
            <Section title="About">
              <p className="whitespace-pre-line leading-relaxed text-fg">
                {trainer.bio}
              </p>
            </Section>

            <Section title="Verified &amp; safe">
              <p className="mb-4 -mt-2 text-sm text-fg-muted">
                Every FitNear trainer passes our checks before going live.{" "}
                <Link href="/trust" className="font-semibold text-lime-600 hover:underline">
                  How we verify &amp; keep you safe →
                </Link>
              </p>
              <div className="grid gap-4 sm:grid-cols-[1fr_16rem]">
                <TrustBadges trainer={trainer} />
                <TrustMeter trainer={trainer} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {safetyGuarantees.slice(0, 2).map((g) => {
                  const Icon =
                    (Icons[g.icon as keyof typeof Icons] as Icons.LucideIcon) ??
                    Icons.ShieldCheck;
                  return (
                    <div
                      key={g.title}
                      className="flex items-start gap-3 rounded-2xl border border-ink-900/8 bg-white p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{g.title}</p>
                        <p className="mt-0.5 text-xs text-fg-muted">{g.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Specializations">
              <div className="flex flex-wrap gap-2">
                {trainer.specializations.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime-300/15 px-3.5 py-1.5 text-sm font-medium text-fg"
                  >
                    <Dumbbell className="h-3.5 w-3.5 text-lime-600" />
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Certifications & credentials">
              <ul className="grid gap-3 sm:grid-cols-2">
                {trainer.certifications.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 rounded-2xl border border-ink-900/8 bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600">
                      <Award className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Training formats & service areas">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-sm font-semibold text-fg-muted">
                    Available formats
                  </p>
                  <div className="space-y-2">
                    {trainer.formats.map((f) => {
                      const m = formatMeta[f];
                      return (
                        <div
                          key={f}
                          className="flex items-center gap-3 rounded-xl border border-ink-900/8 bg-white px-4 py-2.5 text-sm font-medium"
                        >
                          <m.icon className="h-4 w-4 text-lime-600" /> {m.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-fg-muted">
                    Service areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.serviceAreas.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 text-fg-muted" /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Weekly availability">
              <p className="mb-4 -mt-2 text-sm text-fg-muted">
                Tap an open slot to preview it, then continue to booking to
                confirm.
              </p>
              <AvailabilityCalendar trainerId={trainer.id} />
            </Section>

            <Section title="Transformation gallery">
              <TransformationGallery images={trainer.gallery} />
            </Section>

            <Section title={`Reviews (${trainer.reviewCount})`} id="reviews">
              <ReviewsSection
                rating={trainer.rating}
                count={trainer.reviewCount}
                reviews={trainer.reviews}
              />
            </Section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <BookingWidget trainer={trainer} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Similar trainers */}
      {similar.length > 0 && (
        <section className="bg-mist py-16">
          <Container>
            <Eyebrow>Similar trainers nearby</Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-bold">
              More {trainerBySlug[slug]?.primarySport.replace("-", " ")} coaches
              you might like
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((t) => (
                <TrainerCard key={t.id} trainer={t} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
