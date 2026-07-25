"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  Home,
  Building2,
  Trees,
  Wifi,
  CalendarDays,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  Lock,
  PartyPopper,
  Info,
} from "lucide-react";
import type { Trainer, TrainingFormat } from "@/lib/types";
import { aed, cn, feeBreakdown } from "@/lib/utils";
import { SLOTS } from "@/lib/availability";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";

const formatMeta: Record<
  TrainingFormat,
  { label: string; icon: typeof Home; desc: string }
> = {
  home: { label: "Home training", icon: Home, desc: "Trainer comes to you" },
  gym: { label: "Gym session", icon: Building2, desc: "Meet at a partner gym" },
  outdoor: { label: "Outdoor", icon: Trees, desc: "Park or beach session" },
  online: { label: "Online", icon: Wifi, desc: "Live video coaching" },
};

const steps = ["Session", "Date & time", "Location", "Review", "Payment"] as const;

export function BookingFlow({
  trainer,
  initialFormat,
}: {
  trainer: Trainer;
  initialFormat?: TrainingFormat;
}) {
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState<TrainingFormat>(
    initialFormat && trainer.formats.includes(initialFormat)
      ? initialFormat
      : trainer.formats[0],
  );
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dates = useMemo(() => {
    if (!mounted) return [];
    const out: { key: string; day: string; num: string; month: string }[] = [];
    const base = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      out.push({
        key: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-AE", { weekday: "short" }),
        num: d.toLocaleDateString("en-AE", { day: "2-digit" }),
        month: d.toLocaleDateString("en-AE", { month: "short" }),
      });
    }
    return out;
  }, [mounted]);

  const { fee, commission, trainerPayout } = feeBreakdown(trainer.hourlyRate);

  const needsAddress = format === "home" || format === "outdoor";
  const locationValid =
    format === "online" || format === "gym" || location.trim().length > 3;

  const canNext =
    (step === 0 && !!format) ||
    (step === 1 && !!date && !!time) ||
    (step === 2 && locationValid) ||
    step === 3;

  const bookingRef = useMemo(
    () => "FN-" + trainer.id.replace("t-", "") + "-" + (date?.replace(/-/g, "").slice(4) ?? "0000"),
    [trainer.id, date],
  );

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirmed(true);
    }, 1600);
  };

  if (confirmed) {
    return <Confirmation trainer={trainer} refId={bookingRef} date={date} time={time} format={format} total={fee} />;
  }

  const FormatIcon = formatMeta[format].icon;

  const locationLabel =
    format === "online"
      ? "Online — video link sent after booking"
      : format === "gym"
        ? "Partner gym near " + trainer.area
        : location || "—";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      {/* Wizard */}
      <div>
        {/* Steps indicator */}
        <ol className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    i < step
                      ? "bg-lime-300 text-ink-900"
                      : i === step
                        ? "bg-ink-900 text-lime-300"
                        : "bg-mist text-fg-muted",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    i === step ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1",
                    i < step ? "bg-lime-400" : "bg-ink-900/10",
                  )}
                />
              )}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl border border-ink-900/8 bg-white p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && (
                <StepShell title="Choose your session type">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {trainer.formats.map((f) => {
                      const m = formatMeta[f];
                      const active = format === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setFormat(f)}
                          className={cn(
                            "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-lime-400 bg-lime-300/15 ring-1 ring-lime-400"
                              : "border-ink-900/10 hover:border-ink-900/25",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl",
                              active
                                ? "bg-lime-300 text-ink-900"
                                : "bg-mist text-fg-muted",
                            )}
                          >
                            <m.icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block font-semibold">{m.label}</span>
                            <span className="block text-sm text-fg-muted">
                              {m.desc}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </StepShell>
              )}

              {step === 1 && (
                <StepShell title="Pick a date & time">
                  <p className="mb-3 text-sm font-semibold text-fg-muted">Date</p>
                  {!mounted ? (
                    <div className="flex gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton h-20 w-16 rounded-2xl" />
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {dates.map((d) => (
                        <button
                          key={d.key}
                          onClick={() => setDate(d.key)}
                          className={cn(
                            "flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition-all",
                            date === d.key
                              ? "border-lime-400 bg-lime-300/15"
                              : "border-ink-900/10 hover:border-ink-900/25",
                          )}
                        >
                          <span className="text-xs text-fg-muted">{d.day}</span>
                          <span className="font-display text-lg font-bold">
                            {d.num}
                          </span>
                          <span className="text-xs text-fg-muted">{d.month}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mb-3 mt-6 text-sm font-semibold text-fg-muted">
                    Time
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setTime(s)}
                        className={cn(
                          "rounded-xl border py-2.5 text-sm font-medium transition-all",
                          time === s
                            ? "border-lime-400 bg-lime-300/15"
                            : "border-ink-900/10 hover:border-ink-900/25",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title="Where should you meet?">
                  {needsAddress ? (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-fg-muted">
                        {format === "home" ? "Your address" : "Preferred location"}
                      </label>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={
                          format === "home"
                            ? "Building, street, area (e.g. Marina Gate, Dubai Marina)"
                            : "Park or beach (e.g. Kite Beach, Jumeirah)"
                        }
                        className="w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm focus:border-lime-400 focus:outline-none"
                      />
                      <p className="mt-2 text-xs text-fg-muted">
                        Exact location is shared with your trainer only after
                        booking is confirmed.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 rounded-2xl bg-mist p-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
                      <p className="text-sm text-fg">
                        {format === "online"
                          ? "This is an online session. A secure video link will be sent to you after payment."
                          : `Your trainer will confirm a partner gym near ${trainer.area}. No address needed.`}
                      </p>
                    </div>
                  )}
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title="Review your booking">
                  <div className="space-y-3">
                    <ReviewRow icon={<CalendarDays className="h-4 w-4" />} label="Date" value={date ?? "—"} />
                    <ReviewRow icon={<Clock className="h-4 w-4" />} label="Time" value={time ?? "—"} />
                    <ReviewRow icon={<FormatIcon className="h-4 w-4" />} label="Format" value={formatMeta[format].label} />
                    <ReviewRow icon={<MapPin className="h-4 w-4" />} label="Location" value={locationLabel} />
                  </div>

                  <div className="mt-6 rounded-2xl border border-ink-900/8 p-5">
                    <PriceLine label="Trainer fee (1 hour)" value={aed(fee)} />
                    <PriceLine
                      label="Platform commission (12%)"
                      value={aed(commission)}
                      muted
                      note="FitNear's share of the trainer's fee"
                    />
                    <PriceLine label="Trainer receives" value={aed(trainerPayout)} muted />
                    <div className="my-3 border-t border-ink-900/8" />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total you pay</span>
                      <span className="font-display text-2xl font-bold">
                        {aed(fee)}
                      </span>
                    </div>
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-fg-muted">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      You pay the listed price — nothing extra. The commission is
                      taken from the trainer&apos;s fee.
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-lime-300/12 p-3 text-xs text-fg">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime-600" />
                    <span>
                      <strong>Free cancellation</strong> up to 24 hours before
                      your session. Cancel within 24 hours and a 50% fee applies.
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-fg-muted">
                    <span className="flex flex-col items-center gap-1 rounded-xl border border-ink-900/8 py-2">
                      <Lock className="h-3.5 w-3.5 text-lime-600" /> Secure payment
                    </span>
                    <span className="flex flex-col items-center gap-1 rounded-xl border border-ink-900/8 py-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-lime-600" /> Verified trainer
                    </span>
                    <span className="flex flex-col items-center gap-1 rounded-xl border border-ink-900/8 py-2">
                      <Info className="h-3.5 w-3.5 text-lime-600" /> 1st-session guarantee
                    </span>
                  </div>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell title="Payment">
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-mist px-4 py-2.5 text-xs text-fg-muted">
                    <Lock className="h-3.5 w-3.5" /> Demo checkout — no real card
                    is charged.
                  </div>
                  <div className="space-y-3">
                    <Field label="Cardholder name" placeholder="Name on card" />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-fg-muted">
                        Card number
                      </label>
                      <div className="flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                        <CreditCard className="h-5 w-5 text-fg-muted" />
                        <input
                          defaultValue="4242 4242 4242 4242"
                          className="w-full bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" placeholder="12 / 28" defaultValue="12 / 28" />
                      <Field label="CVC" placeholder="123" defaultValue="123" />
                    </div>
                  </div>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => (step === 0 ? null : setStep(step - 1))}
              disabled={step === 0}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-semibold",
                step === 0 ? "text-fg-muted/40" : "text-fg-muted hover:text-fg",
              )}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 4 ? (
              <Button
                size="lg"
                onClick={() => canNext && setStep(step + 1)}
                disabled={!canNext}
              >
                Continue
              </Button>
            ) : (
              <Button size="lg" onClick={pay} disabled={processing}>
                {processing ? "Processing…" : `Pay ${aed(fee)}`}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Summary sidebar */}
      <aside className="lg:relative">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-ink-900/8 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
              Your booking
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                <Image src={trainer.avatar} alt={trainer.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-display font-semibold">{trainer.name}</p>
                <RatingStars rating={trainer.rating} size={12} />
              </div>
            </div>
            <dl className="mt-5 space-y-2.5 text-sm">
              <SummaryRow label="Format" value={formatMeta[format].label} />
              <SummaryRow label="Date" value={date ?? "Not set"} />
              <SummaryRow label="Time" value={time ?? "Not set"} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-ink-900/8 pt-4">
              <span className="text-sm text-fg-muted">Total</span>
              <span className="font-display text-xl font-bold">{aed(fee)}</span>
            </div>
          </div>
          <p className="mt-3 px-1 text-center text-xs text-fg-muted">
            Secured by FitNear · Demo booking
          </p>
        </div>
      </aside>
    </div>
  );
}

/* --- helpers --- */

function StepShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display mb-5 text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  placeholder,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-fg-muted">{label}</label>
      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm focus:border-lime-400 focus:outline-none"
      />
    </div>
  );
}

function ReviewRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-mist px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm text-fg-muted">
        {icon} {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function PriceLine({
  label,
  value,
  muted,
  note,
}: {
  label: string;
  value: string;
  muted?: boolean;
  note?: string;
}) {
  return (
    <div className="flex items-start justify-between py-1">
      <span className={cn("text-sm", muted ? "text-fg-muted" : "text-fg")}>
        {label}
        {note && <span className="block text-xs text-fg-muted">{note}</span>}
      </span>
      <span className={cn("text-sm font-semibold", muted && "text-fg-muted")}>
        {value}
      </span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function Confirmation({
  trainer,
  refId,
  date,
  time,
  format,
  total,
}: {
  trainer: Trainer;
  refId: string;
  date: string | null;
  time: string | null;
  format: TrainingFormat;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-xl text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-300 text-ink-900"
      >
        <PartyPopper className="h-9 w-9" />
      </motion.span>
      <h1 className="font-display mt-6 text-3xl font-bold">Booking confirmed!</h1>
      <p className="mt-3 text-fg-muted">
        Your session with <strong className="text-fg">{trainer.name}</strong> is
        booked. We&apos;ve sent the details and a WhatsApp intro to get you
        started.
      </p>

      <div className="mt-8 rounded-3xl border border-ink-900/8 bg-white p-6 text-left">
        <div className="flex items-center justify-between border-b border-ink-900/8 pb-4">
          <span className="text-sm text-fg-muted">Booking reference</span>
          <span className="font-mono text-sm font-semibold">{refId}</span>
        </div>
        <dl className="mt-4 space-y-2.5 text-sm">
          <SummaryRow label="Trainer" value={trainer.name} />
          <SummaryRow label="Format" value={formatMeta[format].label} />
          <SummaryRow label="Date" value={date ?? "—"} />
          <SummaryRow label="Time" value={time ?? "—"} />
          <SummaryRow label="Amount paid" value={aed(total)} />
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/dashboard/client" variant="primary" size="lg">
          Go to my dashboard
        </ButtonLink>
        <ButtonLink href="/search" variant="outline" size="lg">
          Find more trainers
        </ButtonLink>
      </div>
      <p className="mt-6 text-xs text-fg-muted">
        <Link href="/" className="underline">
          Free cancellation
        </Link>{" "}
        up to 24 hours before your session · Demo booking, no real charge made.
      </p>
    </motion.div>
  );
}
