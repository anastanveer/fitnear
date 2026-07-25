"use client";

import { useRef, useState } from "react";
import { Dumbbell, ImagePlus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import {
  WORKOUT_TYPE_OPTIONS,
  type WorkoutType,
} from "@/data/progress";
import { SectionHeading } from "./progress-ui";

export interface NewWorkout {
  type: WorkoutType;
  durationMin: number;
  note?: string;
  photo?: string;
}

const MAX_PHOTO_BYTES = 4_000_000; // ~4MB guard before FileReader

export function LogWorkoutCard({
  onLog,
}: {
  onLog: (w: NewWorkout) => void;
}) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<WorkoutType>("strength");
  const [duration, setDuration] = useState(45);
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file.", "error");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast("That image is a bit large — try one under 4MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.onerror = () => toast("Couldn't read that image.", "error");
    reader.readAsDataURL(file);
  };

  const submit = () => {
    onLog({
      type,
      durationMin: duration,
      note: note.trim() || undefined,
      photo: photo ?? undefined,
    });
    // reset the composer (keep the chosen type for quick repeat logging)
    setNote("");
    setPhoto(null);
    setDuration(45);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-6 sm:p-7">
      <SectionHeading
        icon={<Plus className="h-5 w-5" />}
        title="Log a workout"
        description="Every session counts. Add today's and watch your streak grow."
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Type */}
        <div>
          <label
            htmlFor="wk-type"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted"
          >
            Type
          </label>
          <div className="rounded-2xl border border-ink-900/12 bg-cloud px-3.5 py-3">
            <Select
              value={type}
              options={WORKOUT_TYPE_OPTIONS}
              onChange={(v) => setType(v as WorkoutType)}
              ariaLabel="Workout type"
              icon={<Dumbbell className="h-4 w-4 text-lime-600" aria-hidden />}
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="wk-duration"
            className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted"
          >
            <span>Duration</span>
            <span className="text-sm font-bold normal-case tracking-normal text-fg">
              {duration} min
            </span>
          </label>
          <div className="rounded-2xl border border-ink-900/12 bg-cloud px-3.5 py-4">
            <input
              id="wk-duration"
              type="range"
              min={5}
              max={180}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="fitnear-range"
              aria-valuetext={`${duration} minutes`}
            />
            <div className="mt-1.5 flex justify-between text-[10px] text-fg-muted">
              <span>5m</span>
              <span>90m</span>
              <span>3h</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="sm:col-span-2">
          <label
            htmlFor="wk-note"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted"
          >
            Note <span className="font-normal normal-case tracking-normal text-fg-muted/70">(optional)</span>
          </label>
          <textarea
            id="wk-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            maxLength={240}
            placeholder="How did it go? New PB, tough finisher, felt great…"
            className="w-full resize-none rounded-2xl border border-ink-900/12 bg-cloud px-4 py-3 text-sm text-fg placeholder:text-fg-muted/70 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-300/40"
          />
        </div>

        {/* Photo */}
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
            Photo <span className="font-normal normal-case tracking-normal text-fg-muted/70">(optional)</span>
          </span>

          {photo ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt="Workout preview"
                className="h-28 w-28 rounded-2xl border border-ink-900/10 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPhoto(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                aria-label="Remove photo"
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-fg-invert shadow-md transition-transform hover:scale-105"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="wk-photo"
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-ink-900/20 bg-cloud px-4 py-3 text-sm font-medium text-fg-muted transition-colors",
                "hover:border-lime-400 hover:text-fg focus-within:border-lime-400",
              )}
            >
              <ImagePlus className="h-4.5 w-4.5 text-lime-600" aria-hidden />
              Add a progress photo
            </label>
          )}
          <input
            id="wk-photo"
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="sr-only"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button variant="primary" size="lg" onClick={submit} className="w-full sm:w-auto">
          <Plus className="h-4.5 w-4.5" />
          Log workout
        </Button>
      </div>
    </div>
  );
}
