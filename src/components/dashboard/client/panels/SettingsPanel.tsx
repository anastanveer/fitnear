"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import {
  ClientPanelHeader,
  ClientAvatar,
} from "@/components/dashboard/shared/client-ui";
import { clientProfile, preferenceToggles } from "@/data/clientDashboard";

const areaOptions = [
  "Dubai Marina",
  "JVC",
  "Business Bay",
  "Downtown Dubai",
  "Al Barsha",
  "Dubai Hills",
  "Jumeirah",
  "Abu Dhabi",
].map((a) => ({ value: a, label: a }));

export function SettingsPanel() {
  const [area, setArea] = useState(clientProfile.area);
  const [toggles, setToggles] = useState(
    Object.fromEntries(preferenceToggles.map((t) => [t.key, t.enabled])),
  );

  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Profile settings"
        description="Manage your details and how FitNear keeps you in the loop."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Personal details */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 rounded-3xl border border-ink-900/8 bg-white p-6 lg:col-span-2"
        >
          <div className="flex items-center gap-4">
            <ClientAvatar
              src={clientProfile.avatar}
              alt={clientProfile.name}
              size={72}
              className="rounded-3xl"
            />
            <div>
              <p className="font-display text-lg font-semibold text-fg">
                {clientProfile.name}
              </p>
              <p className="text-sm text-fg-muted">
                Member since {clientProfile.memberSince}
              </p>
              <button
                type="button"
                className="mt-2 text-sm font-semibold text-lime-700 hover:underline"
              >
                Change photo
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" icon={<User className="h-4 w-4" />}>
              <input
                type="text"
                defaultValue={clientProfile.name}
                className="w-full bg-transparent text-sm text-fg outline-none"
              />
            </Field>
            <Field label="Email" icon={<Mail className="h-4 w-4" />}>
              <input
                type="email"
                defaultValue={clientProfile.email}
                className="w-full bg-transparent text-sm text-fg outline-none"
              />
            </Field>
            <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
              <input
                type="tel"
                defaultValue={clientProfile.phone}
                className="w-full bg-transparent text-sm text-fg outline-none"
              />
            </Field>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-fg-muted">
                Preferred area
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-cloud px-4 py-3">
                <MapPin className="h-4 w-4 text-fg-muted" />
                <Select
                  value={area}
                  options={areaOptions}
                  onChange={setArea}
                  ariaLabel="Preferred area"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" size="md" type="submit">
              Save changes
            </Button>
            <Button variant="ghost" size="md" type="button">
              Cancel
            </Button>
          </div>
        </form>

        {/* Preferences */}
        <div className="rounded-3xl border border-ink-900/8 bg-white p-6">
          <h3 className="font-display text-lg font-semibold text-fg">
            Notifications
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            Choose what we ping you about.
          </p>
          <div className="mt-5 space-y-5">
            {preferenceToggles.map((t) => (
              <div key={t.key} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-fg">{t.label}</p>
                  <p className="mt-0.5 text-xs text-fg-muted">{t.description}</p>
                </div>
                <Toggle
                  on={toggles[t.key]}
                  label={t.label}
                  onToggle={() =>
                    setToggles((s) => ({ ...s, [t.key]: !s[t.key] }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-cloud px-4 py-3 focus-within:border-lime-400">
        <span className="text-fg-muted">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full p-0 transition-colors",
        on ? "bg-lime-400" : "bg-ink-900/15",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ease-out",
          on ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}
