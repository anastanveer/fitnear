import type { MetadataRoute } from "next";
import { trainers } from "@/data/trainers";

const BASE = "https://fitnear.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/join",
    "/promote",
    "/trust",
    "/booking",
    "/dashboard/client",
    "/dashboard/trainer",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const trainerRoutes = trainers.map((t) => ({
    url: `${BASE}/trainer/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...trainerRoutes];
}
