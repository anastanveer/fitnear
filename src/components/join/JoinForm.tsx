"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Mail,
  MapPin,
  Phone,
  Plus,
  Send,
  Sparkles,
  User,
  Video,
  Wallet,
  X,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { cn, aed } from "@/lib/utils";
import { categories } from "@/data/categories";
import type { SportSlug } from "@/lib/types";
import {
  allAreas,
  areaGroups,
  certificationOptions,
  cityOptions,
  genderOptions,
  specializationsBySport,
  timePreferenceLabel,
  timePreferenceOptions,
  weekDays,
} from "./data";
import { Chip, FieldShell, Segmented, TextField } from "./fields";

const EASE = [0.16, 1, 0.3, 1] as const;
const COMMISSION = 0.12;

interface JoinData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  primarySport: SportSlug | "";
  specializations: string[];
  area: string;
  serviceAreas: string[];
  experienceYears: number;
  certifications: string[];
  days: string[];
  timePreference: string;
  hourlyRate: number;
  profilePhoto: string | null;
  coverPhoto: string | null;
  gallery: string[];
  introVideo: string | null;
}

const initialData: JoinData = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  city: "",
  primarySport: "",
  specializations: [],
  area: "",
  serviceAreas: [],
  experienceYears: 3,
  certifications: [],
  days: [],
  timePreference: "",
  hourlyRate: 180,
  profilePhoto: null,
  coverPhoto: null,
  gallery: [],
  introVideo: null,
};

const steps = [
  { icon: User, title: "Personal details", blurb: "Tell clients who they'll be training with." },
  { icon: Dumbbell, title: "Sport & specialization", blurb: "Pick your main sport and what you focus on." },
  { icon: MapPin, title: "Service location", blurb: "Where across the UAE do you coach?" },
  { icon: Award, title: "Experience & certifications", blurb: "Your track record and accreditations." },
  { icon: Calendar, title: "Availability", blurb: "The days and times you can take sessions." },
  { icon: Wallet, title: "Pricing", blurb: "Set an hourly rate that reflects your value." },
  { icon: Camera, title: "Photos & video", blurb: "Show up well — profiles with media convert best." },
  { icon: Check, title: "Review & submit", blurb: "One last look before you go live." },
];

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function JoinForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<JoinData>(initialData);
  const [customCert, setCustomCert] = useState("");

  const update = (patch: Partial<JoinData>) =>
    setData((d) => ({ ...d, ...patch }));

  const checks = useMemo(
    () => [
      data.fullName.trim().length > 1,
      /\S+@\S+\.\S+/.test(data.email),
      data.phone.replace(/\D/g, "").length >= 7,
      !!data.gender,
      !!data.city,
      !!data.primarySport,
      data.specializations.length > 0,
      !!data.area,
      data.serviceAreas.length > 0,
      data.experienceYears > 0,
      data.days.length > 0,
      !!data.timePreference,
      data.hourlyRate > 0,
      !!data.profilePhoto,
    ],
    [data],
  );
  const completion = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100,
  );

  const stepValid = (i: number): boolean => {
    switch (i) {
      case 0:
        return checks[0] && checks[1] && checks[2] && checks[3] && checks[4];
      case 1:
        return checks[5] && checks[6];
      case 2:
        return checks[7] && checks[8];
      case 3:
        return checks[9];
      case 4:
        return checks[10] && checks[11];
      case 5:
        return checks[12];
      default:
        return true;
    }
  };

  const goTo = (i: number) => {
    setDir(i > step ? 1 : -1);
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };
  const next = () => {
    if (step < steps.length - 1 && stepValid(step)) goTo(step + 1);
  };
  const back = () => {
    if (step > 0) goTo(step - 1);
  };

  const payout = Math.round(data.hourlyRate * (1 - COMMISSION));
  const canProceed = stepValid(step);

  if (submitted) return <SuccessCard data={data} reduce={!!reduce} />;

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white shadow-[0_30px_80px_-40px_rgba(11,13,11,0.3)]">
      {/* Sticky header: step + completion */}
      <div className="border-b border-ink-900/8 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
              {(() => {
                const Icon = steps[step].icon;
                return <Icon className="h-5 w-5" />;
              })()}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
                Step {step + 1} of {steps.length}
              </p>
              <h2 className="font-display text-lg font-bold leading-tight sm:text-xl">
                {steps[step].title}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold leading-none">
              {completion}%
            </p>
            <p className="text-xs font-medium text-fg-muted">complete</p>
          </div>
        </div>

        {/* Single segmented progress — each segment is a step */}
        <div className="mt-5 flex items-center gap-1.5">
          {steps.map((s, i) => {
            const reached = i <= maxStep;
            const done = i < step;
            const current = i === step;
            return (
              <button
                key={s.title}
                type="button"
                disabled={!reached}
                onClick={() => reached && goTo(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={current ? "step" : undefined}
                className="group relative h-2 flex-1 overflow-hidden rounded-full bg-ink-900/10 disabled:cursor-not-allowed"
              >
                {/* fill: completed = solid, current = animated grow */}
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-lime-400"
                  initial={false}
                  animate={{ width: done ? "100%" : current ? "55%" : "0%" }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                />
                {current && (
                  <span className="absolute inset-y-0 right-0 w-1/2 rounded-full bg-lime-300/25" />
                )}
                {reached && !done && !current && (
                  <span className="absolute inset-0 rounded-full bg-ink-900/10 transition-colors group-hover:bg-ink-900/25" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step body */}
      <div className="p-6 sm:p-8">
        <p className="mb-6 text-sm text-fg-muted">{steps[step].blurb}</p>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, x: dir * 36 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -36 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <TextField
                    id="fullName"
                    label="Full name"
                    hint="Required"
                    icon={<User className="h-4 w-4" />}
                    placeholder="e.g. Layla Haddad"
                    value={data.fullName}
                    autoComplete="name"
                    onChange={(e) => update({ fullName: e.target.value })}
                  />
                </div>
                <TextField
                  id="email"
                  label="Email"
                  hint="Required"
                  type="email"
                  icon={<Mail className="h-4 w-4" />}
                  placeholder="you@email.com"
                  value={data.email}
                  autoComplete="email"
                  onChange={(e) => update({ email: e.target.value })}
                />
                <TextField
                  id="phone"
                  label="Mobile number"
                  hint="Required"
                  type="tel"
                  icon={<Phone className="h-4 w-4" />}
                  placeholder="+971 50 000 0000"
                  value={data.phone}
                  autoComplete="tel"
                  onChange={(e) => update({ phone: e.target.value })}
                />
                <div>
                  <p className="mb-2 text-sm font-semibold text-fg">Gender</p>
                  <Segmented
                    ariaLabel="Gender"
                    value={data.gender}
                    options={genderOptions}
                    onChange={(v) => update({ gender: v })}
                  />
                </div>
                <FieldShell label="Based in">
                  <Select
                    value={data.city}
                    options={cityOptions}
                    onChange={(v) => update({ city: v, area: "" })}
                    placeholder="Select your emirate"
                    ariaLabel="City"
                    icon={<MapPin className="h-4 w-4 text-fg-muted" />}
                    className="w-full"
                  />
                </FieldShell>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-fg">
                  Primary sport
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {categories.map((c) => {
                    const active = data.primarySport === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          update({
                            primarySport: c.slug,
                            specializations: [],
                          })
                        }
                        className={cn(
                          "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active
                            ? "border-lime-400 bg-lime-300/10 ring-2 ring-lime-300/30"
                            : "border-ink-900/10 hover:border-ink-900/25",
                        )}
                      >
                        <span
                          className="mt-1 h-3 w-3 shrink-0 rounded-full"
                          style={{ background: c.accent }}
                        />
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 font-semibold text-fg">
                            {c.name}
                            {active && (
                              <Check className="h-4 w-4 text-lime-600" />
                            )}
                          </span>
                          <span className="mt-0.5 block text-xs text-fg-muted">
                            {c.tagline}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Specializations
                    </p>
                    <span className="text-xs font-medium text-fg-muted">
                      {data.specializations.length} selected
                    </span>
                  </div>
                  {data.primarySport ? (
                    <div className="flex flex-wrap gap-2.5">
                      {specializationsBySport[data.primarySport].map((s) => (
                        <Chip
                          key={s}
                          active={data.specializations.includes(s)}
                          onClick={() =>
                            update({
                              specializations: toggle(
                                data.specializations,
                                s,
                              ),
                            })
                          }
                        >
                          {s}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-ink-900/15 bg-cloud px-4 py-6 text-center text-sm text-fg-muted">
                      Pick a primary sport to see specializations.
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <FieldShell label="Primary area (where you're based)">
                  <Select
                    value={data.area}
                    options={allAreas.map((a) => ({ value: a, label: a }))}
                    onChange={(v) => update({ area: v })}
                    placeholder="Select your base area"
                    ariaLabel="Primary area"
                    icon={<MapPin className="h-4 w-4 text-fg-muted" />}
                    className="w-full"
                    panelClassName="max-h-64"
                  />
                </FieldShell>

                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Service areas you cover
                    </p>
                    <span className="text-xs font-medium text-fg-muted">
                      {data.serviceAreas.length} selected
                    </span>
                  </div>
                  <div className="space-y-5">
                    {areaGroups.map((g) => (
                      <div key={g.city}>
                        <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
                          {g.city}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {g.areas.map((a) => (
                            <Chip
                              key={a}
                              active={data.serviceAreas.includes(a)}
                              onClick={() =>
                                update({
                                  serviceAreas: toggle(data.serviceAreas, a),
                                })
                              }
                            >
                              {a}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="rounded-2xl border border-ink-900/8 bg-cloud p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Years of experience
                    </p>
                    <p className="font-display text-2xl font-bold">
                      {data.experienceYears}
                      <span className="ml-1 text-sm font-medium text-fg-muted">
                        {data.experienceYears === 1 ? "year" : "years"}
                        {data.experienceYears >= 25 ? "+" : ""}
                      </span>
                    </p>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={data.experienceYears}
                    onChange={(e) =>
                      update({ experienceYears: Number(e.target.value) })
                    }
                    className="fitnear-range mt-4"
                    aria-label="Years of experience"
                  />
                  <div className="mt-1 flex justify-between text-xs text-fg-muted">
                    <span>1 year</span>
                    <span>25+ years</span>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Certifications{" "}
                      <span className="font-normal text-fg-muted">
                        (optional)
                      </span>
                    </p>
                    <span className="text-xs font-medium text-fg-muted">
                      {data.certifications.length} added
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {certificationOptions.map((c) => (
                      <Chip
                        key={c}
                        active={data.certifications.includes(c)}
                        onClick={() =>
                          update({
                            certifications: toggle(data.certifications, c),
                          })
                        }
                      >
                        {c}
                      </Chip>
                    ))}
                    {data.certifications
                      .filter((c) => !certificationOptions.includes(c))
                      .map((c) => (
                        <Chip
                          key={c}
                          active
                          onClick={() =>
                            update({
                              certifications: toggle(data.certifications, c),
                            })
                          }
                        >
                          {c}
                        </Chip>
                      ))}
                  </div>

                  <form
                    className="mt-4 flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const v = customCert.trim();
                      if (v && !data.certifications.includes(v)) {
                        update({ certifications: [...data.certifications, v] });
                      }
                      setCustomCert("");
                    }}
                  >
                    <input
                      value={customCert}
                      onChange={(e) => setCustomCert(e.target.value)}
                      placeholder="Add another certification"
                      aria-label="Add a certification"
                      className="h-11 flex-1 rounded-2xl border border-ink-900/12 bg-white px-4 text-sm outline-none transition-all focus:border-lime-400 focus:ring-4 focus:ring-lime-300/20"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="md"
                      disabled={!customCert.trim()}
                    >
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-fg">
                  Days you&apos;re available
                </p>
                <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7">
                  {weekDays.map((d) => {
                    const active = data.days.includes(d.key);
                    return (
                      <button
                        key={d.key}
                        type="button"
                        aria-pressed={active}
                        aria-label={d.full}
                        onClick={() =>
                          update({ days: toggle(data.days, d.key) })
                        }
                        className={cn(
                          "rounded-2xl border py-3 text-sm font-semibold transition-all duration-200",
                          active
                            ? "border-lime-400 bg-lime-300/20 text-fg"
                            : "border-ink-900/12 text-fg-muted hover:border-ink-900/30 hover:text-fg",
                        )}
                      >
                        {d.short}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7">
                  <p className="mb-3 text-sm font-semibold text-fg">
                    Preferred time of day
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {timePreferenceOptions.map((t) => {
                      const active = data.timePreference === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update({ timePreference: t.value })}
                          className={cn(
                            "flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                            active
                              ? "border-lime-400 bg-lime-300/10 ring-2 ring-lime-300/30 text-fg"
                              : "border-ink-900/12 text-fg-muted hover:border-ink-900/25",
                          )}
                        >
                          <Clock
                            className={cn(
                              "h-4 w-4 shrink-0",
                              active ? "text-lime-600" : "text-fg-muted",
                            )}
                          />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <div className="rounded-2xl border border-ink-900/8 bg-cloud p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Hourly rate
                    </p>
                    <p className="font-display text-3xl font-bold">
                      {aed(data.hourlyRate)}
                      <span className="ml-1 text-sm font-medium text-fg-muted">
                        /hr
                      </span>
                    </p>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={10}
                    value={data.hourlyRate}
                    onChange={(e) =>
                      update({ hourlyRate: Number(e.target.value) })
                    }
                    className="fitnear-range mt-4"
                    aria-label="Hourly rate"
                  />
                  <div className="mt-1 flex justify-between text-xs text-fg-muted">
                    <span>AED 80</span>
                    <span>AED 500+</span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-lime-400/40 bg-lime-300/10 p-4">
                  <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
                  <p className="text-sm text-fg">
                    On a completed 1-hour booking you keep{" "}
                    <strong>{aed(payout)}</strong> after our{" "}
                    {Math.round(COMMISSION * 100)}% commission. No booking, no
                    fee.
                  </p>
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <MockDrop
                    label="Profile photo"
                    hint="A clear headshot"
                    icon={<Camera className="h-5 w-5" />}
                    value={data.profilePhoto}
                    onSet={(v) => update({ profilePhoto: v })}
                    filename="profile-photo.jpg"
                  />
                  <MockDrop
                    label="Cover image"
                    hint="Shows on your profile"
                    icon={<Camera className="h-5 w-5" />}
                    value={data.coverPhoto}
                    onSet={(v) => update({ coverPhoto: v })}
                    filename="cover-image.jpg"
                  />
                  <div className="sm:col-span-2">
                    <MockDrop
                      label="Intro video"
                      hint="30–60s introducing yourself"
                      icon={<Video className="h-5 w-5" />}
                      value={data.introVideo}
                      onSet={(v) => update({ introVideo: v })}
                      filename="intro-video.mp4"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">
                      Gallery{" "}
                      <span className="font-normal text-fg-muted">
                        (optional)
                      </span>
                    </p>
                    <span className="text-xs font-medium text-fg-muted">
                      {data.gallery.length}/4 added
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => {
                      const filled = i < data.gallery.length;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            update({
                              gallery: filled
                                ? data.gallery.slice(0, -1)
                                : [...data.gallery, `photo-${data.gallery.length + 1}.jpg`],
                            })
                          }
                          className={cn(
                            "flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
                            filled
                              ? "border-lime-400 bg-lime-300/10 text-lime-600"
                              : "border-ink-900/12 text-fg-muted hover:border-ink-900/30",
                          )}
                          aria-label={
                            filled
                              ? `Remove gallery photo ${i + 1}`
                              : `Add gallery photo ${i + 1}`
                          }
                        >
                          {filled ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <Plus className="h-6 w-6" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-fg-muted">
                    Demo only — no files are uploaded. Tap a tile to simulate
                    adding media.
                  </p>
                </div>
              </div>
            )}

            {step === 7 && (
              <Review data={data} onEdit={(i) => goTo(i)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3 border-t border-ink-900/8 p-6 sm:px-8">
        <Button
          variant="ghost"
          size="md"
          onClick={back}
          disabled={step === 0}
          className={step === 0 ? "invisible" : ""}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        {step < steps.length - 1 ? (
          <div className="flex flex-col items-end gap-1.5">
            <Button
              variant="primary"
              size="md"
              onClick={next}
              disabled={!canProceed}
            >
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
            {!canProceed && (
              <span className="text-xs text-fg-muted">
                Complete the required fields to continue
              </span>
            )}
          </div>
        ) : (
          <Button variant="primary" size="md" onClick={() => setSubmitted(true)}>
            <Send className="h-4 w-4" /> Submit application
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------- Mock upload dropzone (visual only) ---------- */

function MockDrop({
  label,
  hint,
  icon,
  value,
  filename,
  onSet,
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  value: string | null;
  filename: string;
  onSet: (v: string | null) => void;
}) {
  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-lime-400/50 bg-lime-300/10 p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/25 text-lime-600">
          <Check className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-fg">{value}</p>
          <p className="text-xs text-fg-muted">{label} added</p>
        </div>
        <button
          type="button"
          onClick={() => onSet(null)}
          aria-label={`Remove ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-ink-900/5 hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onSet(filename)}
      className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-ink-900/15 p-4 text-left transition-colors hover:border-lime-400 hover:bg-lime-300/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-fg-muted">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-fg">{label}</p>
        <p className="text-xs text-fg-muted">{hint} · tap to add</p>
      </div>
    </button>
  );
}

/* ---------- Review summary ---------- */

function Review({
  data,
  onEdit,
}: {
  data: JoinData;
  onEdit: (step: number) => void;
}) {
  const sportName =
    categories.find((c) => c.slug === data.primarySport)?.name ?? "—";
  const dayLabels = weekDays
    .filter((d) => data.days.includes(d.key))
    .map((d) => d.short)
    .join(", ");
  const mediaCount =
    (data.profilePhoto ? 1 : 0) +
    (data.coverPhoto ? 1 : 0) +
    (data.introVideo ? 1 : 0) +
    data.gallery.length;

  const rows: { step: number; label: string; value: string }[] = [
    { step: 0, label: "Name", value: data.fullName || "—" },
    { step: 0, label: "Contact", value: `${data.email || "—"} · ${data.phone || "—"}` },
    { step: 0, label: "Based in", value: data.city || "—" },
    { step: 1, label: "Primary sport", value: sportName },
    {
      step: 1,
      label: "Specializations",
      value: data.specializations.join(", ") || "—",
    },
    { step: 2, label: "Base area", value: data.area || "—" },
    {
      step: 2,
      label: "Service areas",
      value: data.serviceAreas.join(", ") || "—",
    },
    {
      step: 3,
      label: "Experience",
      value: `${data.experienceYears} ${data.experienceYears === 1 ? "year" : "years"}`,
    },
    {
      step: 3,
      label: "Certifications",
      value: data.certifications.join(", ") || "None added",
    },
    {
      step: 4,
      label: "Availability",
      value: dayLabels
        ? `${dayLabels} · ${timePreferenceLabel(data.timePreference)}`
        : "—",
    },
    { step: 5, label: "Hourly rate", value: `${aed(data.hourlyRate)} / hr` },
    {
      step: 6,
      label: "Media",
      value: mediaCount ? `${mediaCount} item${mediaCount > 1 ? "s" : ""} added` : "None added",
    },
  ];

  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-ink-900/8 bg-cloud p-4">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
        <p className="text-sm text-fg">
          Here&apos;s your profile summary. Review each section and edit
          anything before submitting — you can update details later too.
        </p>
      </div>
      <dl className="divide-y divide-ink-900/8 overflow-hidden rounded-2xl border border-ink-900/8">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 bg-white px-4 py-3.5"
          >
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
                {r.label}
              </dt>
              <dd className="mt-0.5 text-sm text-fg">{r.value}</dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(r.step)}
              className="shrink-0 text-xs font-semibold text-lime-600 hover:text-lime-700"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Success state ---------- */

function SuccessCard({ data, reduce }: { data: JoinData; reduce: boolean }) {
  const nextSteps = [
    "Our team reviews your application within 48 hours.",
    "We run a short verification call to confirm your credentials.",
    "Your profile goes live and appears in searches near your service areas.",
  ];
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="surface-dark grain relative overflow-hidden rounded-3xl p-8 text-center sm:p-12"
    >
      <div className="glow-lime pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-40" />
      <div className="relative">
        <motion.div
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-300 text-ink-900 shadow-[0_10px_40px_-8px_rgba(204,250,60,0.7)]"
        >
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </motion.div>

        <h2 className="font-display mt-7 text-2xl font-bold sm:text-3xl">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-fg-invert-muted">
          Thank you{data.fullName ? `, ${data.fullName.split(" ")[0]}` : ""}.
          Your trainer application for{" "}
          {categories.find((c) => c.slug === data.primarySport)?.name ??
            "coaching"}{" "}
          in {data.city || "the UAE"} is in. Here&apos;s what happens next.
        </p>

        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {nextSteps.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-300/20 text-xs font-bold text-lime-300">
                {i + 1}
              </span>
              <span className="text-sm text-fg-invert">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="md">
            Back to home
          </ButtonLink>
          <ButtonLink
            href="/search"
            variant="outline"
            size="md"
            className="border-white/20 text-fg-invert hover:border-white/40 hover:bg-white/5"
          >
            Browse trainers
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-fg-invert-muted">
          A confirmation has been sent to {data.email || "your email"}.
        </p>
      </div>
    </motion.div>
  );
}
