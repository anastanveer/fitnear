import type { MetadataRoute } from "next";
import { trainers } from "@/data/trainers";
import { challenges } from "@/data/challenges";

const BASE = "https://fitnear.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/join",
    "/promote",
    "/community",
    "/ai-coach",
    "/reels",
    "/challenges",
    "/progress",
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

  const challengeRoutes = challenges.map((c) => ({
    url: `${BASE}/challenges/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...trainerRoutes, ...challengeRoutes];
}
