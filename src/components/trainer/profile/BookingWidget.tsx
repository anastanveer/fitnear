"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Clock, ShieldCheck, CalendarCheck } from "lucide-react";
import type { Trainer, TrainingFormat } from "@/lib/types";
import { aed, feeBreakdown } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { RatingStars } from "@/components/ui/RatingStars";

const formatLabels: Record<TrainingFormat, string> = {
  home: "Home training",
  gym: "Gym session",
  outdoor: "Outdoor",
  online: "Online",
};

export function BookingWidget({ trainer }: { trainer: Trainer }) {
  const router = useRouter();
  const [format, setFormat] = useState<TrainingFormat>(trainer.formats[0]);
  const { commission, trainerPayout } = feeBreakdown(trainer.hourlyRate);

  const book = () => {
    router.push(`/booking?trainer=${trainer.slug}&format=${format}`);
  };

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]">
      <div className="flex items-end justify-between">
        <div>
          <span className="font-display text-3xl font-bold">
            {aed(trainer.hourlyRate)}
          </span>
          <span className="text-fg-muted"> / hour</span>
        </div>
        <RatingStars rating={trainer.rating} count={trainer.reviewCount} size={14} />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-fg-muted">
          Training format
        </label>
        <div className="flex items-center rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
          <Select
            className="flex-1"
            ariaLabel="Training format"
            value={format}
            onChange={(v) => setFormat(v as TrainingFormat)}
            icon={<CalendarCheck className="h-5 w-5 shrink-0 text-lime-600" />}
            options={trainer.formats.map((f) => ({
              value: f,
              label: formatLabels[f],
            }))}
          />
        </div>
      </div>

      <Button size="lg" onClick={book} className="mt-4 w-full">
        Book a session
      </Button>
      <ButtonLink
        href={whatsappLink(trainer)}
        variant="whatsapp"
        size="lg"
        className="mt-2.5 w-full"
      >
        <MessageCircle className="h-4 w-4" /> Message on WhatsApp
      </ButtonLink>

      <p className="mt-3 text-center text-xs text-fg-muted">
        You won&apos;t be charged yet · Free cancellation up to 24h before
      </p>

      <div className="mt-5 space-y-2.5 border-t border-ink-900/8 pt-5 text-sm">
        <Row
          icon={<Clock className="h-4 w-4 text-lime-600" />}
          label={trainer.responseTime}
        />
        {trainer.verified && (
          <Row
            icon={<ShieldCheck className="h-4 w-4 text-lime-600" />}
            label="Identity & certifications verified"
          />
        )}
      </div>

      <div className="mt-5 rounded-2xl bg-mist p-4 text-xs text-fg-muted">
        <p className="flex items-center justify-between">
          <span>Trainer receives</span>
          <span className="font-semibold text-fg">{aed(trainerPayout)}</span>
        </p>
        <p className="mt-1 flex items-center justify-between">
          <span>FitNear service fee (12%)</span>
          <span className="font-semibold text-fg">{aed(commission)}</span>
        </p>
        <p className="mt-2 text-[11px] leading-relaxed">
          FitNear only earns when your trainer does — a small commission on
          completed bookings.
        </p>
      </div>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <p className="flex items-center gap-2 text-fg">
      {icon}
      {label}
    </p>
  );
}
