"use client";

import Link from "next/link";
import { Clock, MapPin, Search } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { Chip } from "@/components/ui/Badge";
import {
  ClientPanelHeader,
  ClientEmptyState,
} from "@/components/dashboard/shared/client-ui";
import { ButtonLink } from "@/components/ui/Button";
import { recentSearches } from "@/data/clientDashboard";

export function RecentSearchesPanel() {
  return (
    <div className="space-y-6">
      <ClientPanelHeader
        title="Recent searches"
        description="Pick up where you left off. Re-run any search in one tap."
      />

      {recentSearches.length === 0 ? (
        <ClientEmptyState
          icon={<Search className="h-6 w-6" />}
          title="No searches yet"
          description="Your recent searches will appear here so you can quickly run them again."
          action={
            <ButtonLink href="/search" variant="primary" size="sm">
              Start searching
            </ButtonLink>
          }
        />
      ) : (
        <StaggerGroup className="space-y-3">
          {recentSearches.map((q) => {
            const href =
              `/search?area=${encodeURIComponent(q.area)}` +
              (q.sport !== "all" ? `&sport=${q.sport}` : "");
            return (
              <StaggerItem key={q.id}>
                <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-fg-muted">
                      <Search className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip className="bg-lime-300/15 text-lime-700">
                          <MapPin className="mr-1 h-3 w-3" /> {q.area}
                        </Chip>
                        <Chip>{q.sportLabel}</Chip>
                      </div>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-fg-muted">
                        <Clock className="h-3 w-3" /> {q.whenLabel} ·{" "}
                        {q.resultCount} trainers found
                      </p>
                    </div>
                  </div>
                  <Link
                    href={href}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-fg-invert transition-transform hover:-translate-y-0.5"
                  >
                    <Search className="h-4 w-4" /> Search again
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      )}
    </div>
  );
}
