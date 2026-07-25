"use client";

import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

export function Categories() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Explore by sport</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              Popular categories near you
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/search"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-lime-600 hover:text-lime-700"
            >
              View all trainers
              <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c, i) => {
            const Icon =
              (Icons[c.icon as keyof typeof Icons] as Icons.LucideIcon) ??
              Icons.Dumbbell;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/search?sport=${c.slug}`}
                  className="group relative block aspect-[5/6] overflow-hidden rounded-3xl bg-ink-900"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 300px"
                    className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* readability gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/5" />
                  {/* accent glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(120% 80% at 50% 100%, ${c.accent}44, transparent 70%)`,
                    }}
                  />

                  {/* top row */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${c.accent}2e` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: c.accent }} />
                    </span>
                    <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      {c.trainerCount}
                    </span>
                  </div>

                  {/* bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-display text-lg font-semibold leading-tight text-white">
                      {c.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-white/70">
                      {c.tagline}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-lime-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Explore
                      <Icons.ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* hover ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:ring-lime-300/40" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
