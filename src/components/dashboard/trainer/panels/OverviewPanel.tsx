"use client";

import { motion } from "framer-motion";
import {
  Eye,
  MessageSquare,
  Calendar,
  Wallet,
  TrendingUp,
  Check,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  kpis,
  profileStrength,
  profileChecklist,
  trainerPersona,
  type Kpi,
} from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";
import { RadialProgress } from "../charts/RadialProgress";

const ICONS: Record<Kpi["icon"], LucideIcon> = {
  eye: Eye,
  message: MessageSquare,
  calendar: Calendar,
  wallet: Wallet,
};

export function OverviewPanel() {
  const completed = profileChecklist.filter((c) => c.done).length;

  return (
    <div>
      <PanelHeader
        title={`Salaam, ${trainerPersona.firstName} 👋`}
        subtitle="Here's how your coaching business is performing this month across FitNear."
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = ICONS[k.icon];
          return (
            <motion.div
              key={k.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-ink-900/8 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime-300/20 text-lime-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" aria-hidden />
                  {k.delta}%
                </span>
              </div>
              <div className="mt-4 font-display text-3xl font-bold text-fg">
                <Counter to={k.value} prefix={k.prefix} suffix={k.suffix} />
              </div>
              <div className="mt-1 text-sm text-fg-muted">{k.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Profile strength */}
      <Card className="mt-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3 sm:w-48 sm:shrink-0">
            <RadialProgress value={profileStrength} />
            <p className="text-center text-sm text-fg-muted">
              {completed} of {profileChecklist.length} steps complete
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold text-fg">
              Complete your profile to rank higher
            </h3>
            <p className="mt-1 text-sm text-fg-muted">
              Fully completed profiles get up to 3× more enquiries. Finish these to
              boost your visibility in search.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {profileChecklist.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-sm",
                    item.done
                      ? "border-ink-900/8 bg-mist/50 text-fg"
                      : "border-lime-500/30 bg-lime-300/10 font-medium text-fg",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                      item.done
                        ? "bg-lime-400 text-ink-900"
                        : "border-2 border-lime-500/50",
                    )}
                  >
                    {item.done && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className={cn(item.done && "text-fg-muted")}>
                    {item.label}
                  </span>
                  {!item.done && (
                    <ChevronRight className="ml-auto h-4 w-4 text-lime-600" aria-hidden />
                  )}
                </li>
              ))}
            </ul>
            <Button size="sm" className="mt-4">
              Finish profile
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
