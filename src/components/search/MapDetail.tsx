"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Star,
  X,
  ExternalLink,
  MessageCircle,
  Clock,
} from "lucide-react";
import type { Trainer } from "@/lib/types";
import { aed } from "@/lib/utils";
import { trainerLatLng, googleMapsLink } from "@/lib/geo";
import { whatsappLink } from "@/lib/whatsapp";
import { VerifiedBadge, AvailableTodayBadge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { ButtonLink } from "@/components/ui/Button";

export function MapDetail({
  trainer,
  onClose,
}: {
  trainer: Trainer;
  onClose: () => void;
}) {
  const [lat, lng] = trainerLatLng(trainer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-ink-900/8 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
          <Image src={trainer.avatar} alt={trainer.name} fill sizes="80px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">{trainer.name}</h3>
              {trainer.verified && <VerifiedBadge label={false} />}
              {trainer.availableToday && <AvailableTodayBadge />}
            </div>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="shrink-0 rounded-full p-1 text-fg-muted hover:bg-ink-900/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-0.5 truncate text-sm text-fg-muted">{trainer.headline}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-muted">
            <RatingStars rating={trainer.rating} count={trainer.reviewCount} size={13} />
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {trainer.area}, {trainer.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" /> {trainer.distanceKm} km away
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {trainer.responseTime}
            </span>
          </div>
        </div>
      </div>

      {/* coordinates + actions */}
      <div className="mt-4 flex flex-col gap-3 border-t border-ink-900/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-fg-muted">
          <span className="font-semibold text-fg">Approx. location</span> ·{" "}
          {lat.toFixed(4)}, {lng.toFixed(4)}
          <span className="ml-2 rounded-full bg-mist px-2 py-0.5 font-medium">
            {aed(trainer.hourlyRate)}/hr
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ButtonLink
            href={googleMapsLink(lat, lng)}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open in Google Maps
          </ButtonLink>
          <ButtonLink
            href={whatsappLink(trainer)}
            variant="whatsapp"
            size="sm"
            className="gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </ButtonLink>
          <ButtonLink href={`/trainer/${trainer.slug}`} variant="dark" size="sm">
            View profile
          </ButtonLink>
        </div>
      </div>
    </motion.div>
  );
}
