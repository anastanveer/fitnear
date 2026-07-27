"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { trainers } from "@/data/trainers";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

/** UAE areas shown on the home — location-first, as the marketplace is organised by area. */
const areas = [
  { name: "Dubai Marina", accent: "#38bdf8" },
  { name: "JVC", accent: "#34d399" },
  { name: "Business Bay", accent: "#c2f22a" },
  { name: "Downtown Dubai", accent: "#fbbf24" },
  { name: "Al Barsha", accent: "#a78bfa" },
  { name: "Dubai Hills", accent: "#fb7185" },
  { name: "Jumeirah", accent: "#f97316" },
  { name: "Abu Dhabi", accent: "#e879f9" },
];

/** A coach can serve several areas, so they count under each area they cover. */
function coachCount(area: string) {
  return trainers.filter(
    (t) => t.area === area || t.serviceAreas.includes(area),
  ).length;
}

export function BrowseByLocation() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Start with your area</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              Browse trainers by location
            </h2>
            <p className="mt-3 max-w-lg text-fg-muted">
              Pick your area and see the coaches available near you. Every trainer
              can serve more than one location.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/search"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-lime-600 hover:text-lime-700"
            >
              View all areas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {areas.map((a, i) => {
            const count = coachCount(a.name);
            return (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/search?area=${encodeURIComponent(a.name)}`}
                  className="group relative flex h-full items-center gap-3 overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-5 transition-all hover:-translate-y-1 hover:border-lime-400/50 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)]"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${a.accent}22` }}
                  >
                    <MapPin className="h-5 w-5" style={{ color: a.accent }} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold leading-tight">
                      {a.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-fg-muted">
                      {count} trainer{count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-fg-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
