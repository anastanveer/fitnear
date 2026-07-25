"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  if (pathname.startsWith("/reels")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-900/8 bg-white/85 backdrop-blur-xl lg:hidden"
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
                className="group flex flex-col items-center gap-0.5 py-1.5 active:scale-95 transition-transform"
              >
                <span className="relative flex h-8 w-12 items-center justify-center">
                  {active && (
                    <motion.span
                      layoutId="tab-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-lime-300/30"
                    />
                  )}
                  <Icon
                    className={cn(
                      "relative h-[22px] w-[22px] transition-colors",
                      active ? "text-lime-700" : "text-fg-muted group-active:text-fg",
                    )}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold transition-colors",
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
