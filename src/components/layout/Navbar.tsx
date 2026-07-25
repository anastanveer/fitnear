"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

type NavUser = { name: string; email: string; role: string } | null;

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
  const [user, setUser] = useState<NavUser>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
    // Refresh the session view on every navigation (covers login/logout).
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => setUser(null));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref =
    user?.role === "trainer" ? "/dashboard/trainer" : "/dashboard/client";

  // Pages whose very top is a dark hero band — the transparent bar sits over
  // dark pixels there, so its contents need light styling until it scrolls
  // into the white pill. On light-topped pages (search, dashboards, etc.) the
  // default dark-on-light styling is correct.
  const darkHeroPages = ["/", "/community", "/promote", "/trust"];
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
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-semibold transition-colors",
                  darkNav
                    ? "text-white hover:bg-white/10"
                    : "text-fg hover:bg-ink-900/[0.05]",
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 text-sm font-bold text-ink-900">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[7rem] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-1.5 shadow-xl"
                  >
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-fg">{user.name}</p>
                      <p className="truncate text-xs text-fg-muted">{user.email}</p>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-fg hover:bg-mist"
                    >
                      <LayoutDashboard className="h-4 w-4 text-fg-muted" /> Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-500/5"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <ButtonLink
              href="/login"
              variant="ghost"
              size="sm"
              className={cn(darkNav && "text-white/85 hover:bg-white/10 hover:text-white")}
            >
              Log in
            </ButtonLink>
          )}
          <ButtonLink href={user ? "/search" : "/register"} variant="primary" size="sm">
            {user ? "Find a trainer" : "Join free"}
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
            {user && (
              <div className="mt-2 flex items-center gap-3 rounded-2xl bg-mist px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-sm font-bold text-ink-900">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-fg-muted">{user.email}</p>
                </div>
              </div>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {user ? (
                <>
                  <ButtonLink href={dashboardHref} variant="outline" size="md">
                    Dashboard
                  </ButtonLink>
                  <button
                    onClick={logout}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-5 text-sm font-semibold text-fg-invert"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </>
              ) : (
                <>
                  <ButtonLink href="/login" variant="outline" size="md">
                    Log in
                  </ButtonLink>
                  <ButtonLink href="/register" variant="primary" size="md">
                    Join free
                  </ButtonLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
