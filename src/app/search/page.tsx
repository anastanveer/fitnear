import { SearchExperience } from "@/components/search/SearchExperience";
import type { SportSlug } from "@/lib/types";
import { categories } from "@/data/categories";

export const metadata = {
  title: "Find a trainer",
  description:
    "Search verified fitness trainers across the UAE by area, sport, price, availability, rating and training format.",
};

const validSports = new Set(categories.map((c) => c.slug));

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; sport?: string; today?: string }>;
}) {
  const params = await searchParams;
  const sport =
    params.sport && validSports.has(params.sport as SportSlug)
      ? (params.sport as SportSlug)
      : "all";

  return (
    <SearchExperience
      initialArea={params.area ?? ""}
      initialSport={sport}
      initialToday={params.today === "1"}
    />
  );
}
