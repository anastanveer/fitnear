"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

const navLinks = [
  { href: "/search", label: "Find a trainer" },
  { href: "/ai-coach", label: "AI Coach" },
  { href: "/reels", label: "Reels" },
  { href: "/community", label: "Community" },
  { href: "/join", label: "Become a trainer" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Pages whose very top is a dark hero band — the transparent bar sits over
  // dark pixels there, so its contents need light styling until it scrolls
  // into the white pill. On light-topped pages (search, dashboards, etc.) the
  // default dark-on-light styling is correct.
  const darkHeroPages = ["/", "/community", "/promote"];
  const darkNav = darkHeroPages.includes(pathname) && !scrolled;

  // Reels is a fully immersive TikTok-style experience — no site chrome.
  if (pathname.startsWith("/reels")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {darkNav && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950/70 via-ink-950/25 to-transparent"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled
              ? "mt-2 rounded-full border border-ink-900/8 bg-white/80 px-5 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              : "px-1 py-4",
          )}
        >
        <Logo dark={darkNav} />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                darkNav
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-fg-muted hover:bg-ink-900/[0.05] hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink
            href="/dashboard/client"
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1.5",
              darkNav && "text-white/85 hover:bg-white/10 hover:text-white",
            )}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </ButtonLink>
          <ButtonLink href="/search" variant="primary" size="sm">
            Find a trainer
          </ButtonLink>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
            darkNav ? "border-white/25 text-white" : "border-ink-900/10",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-3xl border border-ink-900/8 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-fg hover:bg-mist"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <ButtonLink href="/dashboard/client" variant="outline" size="md">
                Dashboard
              </ButtonLink>
              <ButtonLink href="/search" variant="primary" size="md">
                Find a trainer
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
