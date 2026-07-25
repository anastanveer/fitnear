"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Play,
  X,
  Briefcase,
  Languages,
  CheckCircle2,
} from "lucide-react";
import type { Trainer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { categoryBySlug } from "@/data/categories";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerifiedBadge, AvailableTodayBadge, Chip } from "@/components/ui/Badge";

export function ProfileHeader({ trainer }: { trainer: Trainer }) {
  const [playing, setPlaying] = useState(false);
  const category = categoryBySlug[trainer.primarySport];

  return (
    <div>
      {/* Cover */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image
          src={trainer.cover}
          alt={`${trainer.name} coaching`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/20" />

        {trainer.videoIntro && (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-300 text-ink-900">
              <Play className="h-3.5 w-3.5 fill-ink-900" />
            </span>
            Watch intro
          </button>
        )}
      </div>

      {/* Identity — avatar overlaps the cover, all text sits on the light bg */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative -mt-16 h-28 w-28 overflow-hidden rounded-3xl border-4 border-cloud shadow-xl sm:-mt-20 sm:h-36 sm:w-36">
          <Image
            src={trainer.avatar}
            alt={trainer.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>

        <div className="mt-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {trainer.verified && <VerifiedBadge />}
            {trainer.availableToday && <AvailableTodayBadge />}
            <Chip>{category?.name}</Chip>
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            {trainer.name}
          </h1>
          <p className="mt-1.5 max-w-2xl text-fg-muted">{trainer.headline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
            <RatingStars rating={trainer.rating} count={trainer.reviewCount} />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {trainer.area}, {trainer.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" /> {trainer.experienceYears} yrs
              experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Languages className="h-4 w-4" /> {trainer.languages.join(", ")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />{" "}
              {trainer.sessionsCompleted.toLocaleString()} sessions
            </span>
          </div>
        </div>
      </div>

      {/* Video modal (mock) */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setPlaying(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative aspect-video w-full max-w-3xl overflow-hidden rounded-3xl",
                "surface-dark grain flex items-center justify-center",
              )}
            >
              <Image
                src={trainer.cover}
                alt=""
                fill
                sizes="768px"
                className="object-cover opacity-40"
              />
              <div className="relative text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-300 text-ink-900">
                  <Play className="h-7 w-7 fill-ink-900" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-white">
                  {trainer.name}&apos;s introduction
                </p>
                <p className="mt-1 text-sm text-fg-invert-muted">
                  Video preview — demo placeholder
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
