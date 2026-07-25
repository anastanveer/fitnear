import { notFound } from "next/navigation";
import { challenges, challengeBySlug } from "@/data/challenges";
import { ChallengeDetail } from "@/components/challenges/ChallengeDetail";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = challengeBySlug[slug];
  if (!challenge) return { title: "Challenge" };
  return {
    title: challenge.title,
    description: challenge.tagline,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!challengeBySlug[slug]) notFound();
  return <ChallengeDetail slug={slug} />;
}
