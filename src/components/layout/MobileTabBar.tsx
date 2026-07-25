"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Play, Users, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/search", label: "Search", icon: Search, match: (p: string) => p.startsWith("/search") },
  { href: "/reels", label: "Reels", icon: Play, match: (p: string) => p.startsWith("/reels") },
  { href: "/community", label: "Community", icon: Users, match: (p: string) => p.startsWith("/community") },
  { href: "/dashboard/client", label: "You", icon: LayoutGrid, match: (p: string) => p.startsWith("/dashboard") },
];

export function MobileTabBar() {
  const pathname = usePathname();
  // Hide on the immersive reels experience
  if (pathname.startsWith("/reels")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-900/8 bg-white/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-1">
        {tabs.map((t) => {
          const active = t.match(pathname);
          const Icon = t.icon;
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-0.5 py-2"
              >
                <span
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                    active ? "bg-lime-300/25 text-lime-700" : "text-fg-muted",
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "scale-110")} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold",
                    active ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {t.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
