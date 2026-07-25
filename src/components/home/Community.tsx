"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowUpRight, ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { aed } from "@/lib/utils";

const events = [
  {
    title: "Sunrise Beach Bootcamp",
    host: "with Omar Al Rashid",
    where: "JBR Beach, Dubai Marina",
    when: "Sat · 6:00 AM",
    spots: "8 spots left",
    price: 60,
    tag: "Outdoor",
    accent: "#c2f22a",
  },
  {
    title: "Community Yoga in the Park",
    host: "with Layla Hassan",
    where: "Safa Park, Jumeirah",
    when: "Sun · 7:30 AM",
    spots: "12 spots left",
    price: 45,
    tag: "Wellness",
    accent: "#a78bfa",
  },
  {
    title: "White-Collar Boxing Night",
    host: "with Marcus Obi",
    where: "Warehouse Gym, Business Bay",
    when: "Wed · 7:00 PM",
    spots: "5 spots left",
    price: 80,
    tag: "Boxing",
    accent: "#fb7185",
  },
];

export function Community() {
  return (
    <section id="community" className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Local community</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              Group sessions &amp; events near you
            </h2>
            <p className="mt-3 max-w-lg text-fg-muted">
              Fitness is better together. Join affordable outdoor bootcamps,
              community yoga and social training happening around the city.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/community"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-lime-600 hover:text-lime-700"
            >
              Open the community feed
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${e.accent}22`, color: "#4b5c12" }}
                >
                  {e.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-fg-muted">{e.host}</p>
              <div className="mt-4 space-y-1.5 text-sm text-fg-muted">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {e.where}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {e.when}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> {e.spots}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
                <span className="font-display text-lg font-bold">
                  {aed(e.price)}
                  <span className="text-sm font-normal text-fg-muted">
                    /person
                  </span>
                </span>
                <span className="text-sm font-semibold text-lime-600">
                  Join session →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
