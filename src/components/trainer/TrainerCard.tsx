"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Navigation } from "lucide-react";
import type { Trainer } from "@/lib/types";
import { aed, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { categoryBySlug } from "@/data/categories";
import { RatingStars } from "@/components/ui/RatingStars";
import {
  VerifiedBadge,
  AvailableTodayBadge,
  FeaturedBadge,
} from "@/components/ui/Badge";

const formatLabels: Record<string, string> = {
  home: "Home",
  gym: "Gym",
  outdoor: "Outdoor",
  online: "Online",
};

export function TrainerCard({
  trainer,
  className,
}: {
  trainer: Trainer;
  className?: string;
}) {
  const category = categoryBySlug[trainer.primarySport];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] transition-shadow",
        className,
      )}
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={trainer.cover}
          alt={`${trainer.name} training`}
          fill
          sizes="(max-width:768px) 100vw, 380px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />

        <div className="absolute left-3 top-3 flex gap-2">
          {trainer.featured && <FeaturedBadge />}
        </div>
        <div className="absolute right-3 top-3">
          {trainer.availableToday && <AvailableTodayBadge />}
        </div>

        {/* Avatar + name overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-end gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 shadow-lg">
            <Image
              src={trainer.avatar}
              alt={trainer.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="pb-0.5 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-lg font-semibold leading-none">
                {trainer.name}
              </h3>
            </div>
            <p className="mt-1 text-xs text-white/80">
              {category?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <RatingStars rating={trainer.rating} count={trainer.reviewCount} />
          {trainer.verified && <VerifiedBadge label={false} />}
        </div>

        <div className="flex items-center gap-3 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {trainer.area}
          </span>
          <span className="inline-flex items-center gap-1">
            <Navigation className="h-3.5 w-3.5" /> {trainer.distanceKm} km
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {trainer.formats.map((f) => (
            <span
              key={f}
              className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-medium text-fg-muted"
            >
              {formatLabels[f]}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="font-display text-xl font-bold text-fg">
              {aed(trainer.hourlyRate)}
            </span>
            <span className="text-sm text-fg-muted">/hr</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(trainer)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contact ${trainer.name} on WhatsApp`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/12 text-[#1da851] transition-colors hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <Link
              href={`/trainer/${trainer.slug}`}
              className="inline-flex h-9 items-center rounded-full bg-ink-900 px-4 text-sm font-semibold text-fg-invert transition-transform hover:-translate-y-0.5"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
