"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Clock } from "lucide-react";
import { trainers } from "@/data/trainers";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { ButtonLink } from "@/components/ui/Button";

export function UrgentSession() {
  const availableToday = trainers.filter((t) => t.availableToday);
  const preview = availableToday.slice(0, 5);

  return (
    <section className="py-8 sm:py-12">
      <Container>
        <Reveal>
          <div className="surface-dark grain relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 glow-lime opacity-40" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300 opacity-75 animate-ping-slow" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
                  </span>
                  Live now
                </span>
                <h2 className="display-3 font-display mt-4 font-bold text-balance">
                  Need a trainer{" "}
                  <span className="text-lime-300">today?</span>
                </h2>
                <p className="mt-3 text-fg-invert-muted">
                  Plans changed or motivation struck?{" "}
                  <span className="font-semibold text-fg-invert">
                    <Counter to={availableToday.length} /> verified trainers
                  </span>{" "}
                  near you are open for a session today. Book now and train
                  within hours.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {preview.map((t) => (
                      <div
                        key={t.id}
                        className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-ink-900"
                      >
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-fg-invert-muted">
                    <Clock className="h-4 w-4 text-lime-300" /> Avg. reply under
                    1 hour
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <ButtonLink
                  href="/search?today=1"
                  variant="primary"
                  size="lg"
                  className="w-full lg:w-auto"
                >
                  <Zap className="h-4 w-4 fill-ink-900" /> Find trainers available
                  today
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <p className="mt-3 text-center text-xs text-fg-invert-muted">
                  Same-day booking · Free cancellation up to 24h
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
