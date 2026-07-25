"use client";

import { Eye, Wallet, PieChart as PieIcon } from "lucide-react";
import { aed } from "@/lib/utils";
import {
  viewsSeries,
  earningsSeries,
  enquirySources,
} from "@/data/trainerDashboard";
import { Card, PanelHeader } from "./_shared";
import { AreaChart } from "../charts/AreaChart";
import { BarChart } from "../charts/BarChart";
import { DonutChart } from "../charts/DonutChart";

function ChartHead({
  icon: Icon,
  title,
  value,
  sub,
}: {
  icon: typeof Eye;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-300/20 text-lime-700">
          <Icon className="h-4.5 w-4.5" aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-fg">{title}</h3>
          <p className="text-xs text-fg-muted">{sub}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-xl font-bold text-fg">{value}</div>
      </div>
    </div>
  );
}

export function AnalyticsPanel() {
  const totalEnquiries = enquirySources.reduce((s, d) => s + d.value, 0);
  const peakViews = Math.max(...viewsSeries.map((v) => v.value));

  return (
    <div>
      <PanelHeader
        title="Analytics"
        subtitle="Track how clients discover and engage with your profile over time."
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Profile views — area chart */}
        <Card>
          <ChartHead
            icon={Eye}
            title="Profile views"
            sub="Last 8 weeks"
            value={peakViews.toLocaleString("en-US")}
          />
          <AreaChart data={viewsSeries} valueFormat={(v) => v.toLocaleString("en-US")} />
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          {/* Earnings — bar chart */}
          <Card className="xl:col-span-3">
            <ChartHead
              icon={Wallet}
              title="Earnings per month"
              sub="Gross, last 7 months"
              value={aed(earningsSeries[earningsSeries.length - 1].value)}
            />
            <BarChart data={earningsSeries} valueFormat={(v) => aed(v)} />
          </Card>

          {/* Enquiry sources — donut */}
          <Card className="xl:col-span-2">
            <ChartHead
              icon={PieIcon}
              title="Enquiry sources"
              sub="Where clients find you"
              value={String(totalEnquiries)}
            />
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              <DonutChart
                data={enquirySources}
                centerLabel={String(totalEnquiries)}
                centerSub="enquiries"
              />
              <ul className="w-full space-y-2.5">
                {enquirySources.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5 text-sm">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="flex-1 text-fg-muted">{s.label}</span>
                    <span className="font-semibold text-fg">
                      {Math.round((s.value / totalEnquiries) * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
