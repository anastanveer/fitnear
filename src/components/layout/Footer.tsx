import Link from "next/link";
import { Globe, Send, AtSign, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const columns = [
  {
    title: "For clients",
    links: [
      { href: "/search", label: "Find a trainer" },
      { href: "/search?today=1", label: "Available today" },
      { href: "/trust", label: "Trust & Safety" },
      { href: "/dashboard/client", label: "Client dashboard" },
    ],
  },
  {
    title: "For trainers",
    links: [
      { href: "/join", label: "Join as a trainer" },
      { href: "/promote", label: "Get featured" },
      { href: "/dashboard/trainer", label: "Trainer dashboard" },
      { href: "/#business", label: "How earnings work" },
      { href: "/#verified", label: "Get verified" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/trust", label: "Trust & Safety" },
      { href: "/#business", label: "Business model" },
      { href: "/#reviews", label: "Reviews" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-dark grain relative overflow-hidden pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 glow-lime opacity-30" />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-invert-muted">
              A location-based marketplace connecting clients with verified
              fitness trainers across the UAE. Find the right trainer, closer to
              you.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-fg-invert-muted">
              <MapPin className="h-4 w-4 text-lime-300" /> Dubai · Abu Dhabi ·
              UAE
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, Send, AtSign].map((Icon, i) => (
                <span
                  key={i}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-fg-invert-muted transition-colors hover:border-lime-300/40 hover:text-lime-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-fg-invert">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-invert-muted transition-colors hover:text-lime-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-fg-invert-muted sm:flex-row sm:items-center">
          <p>© 2026 FitNear. Concept prototype — mock data for demonstration.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-lime-300">
              Privacy
            </Link>
            <Link href="#" className="hover:text-lime-300">
              Terms
            </Link>
            <Link href="#" className="hover:text-lime-300">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
