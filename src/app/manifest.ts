import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FitNear — Find the right trainer, closer to you.",
    short_name: "FitNear",
    description:
      "A location-based marketplace for verified fitness trainers across the UAE.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b0d0b",
    theme_color: "#0b0d0b",
    categories: ["health", "fitness", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Find a trainer", url: "/search" },
      { name: "AI Coach", url: "/ai-coach" },
      { name: "Reels", url: "/reels" },
    ],
  };
}
