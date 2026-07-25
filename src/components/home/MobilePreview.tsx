"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bell, MapPin, Search, Star, MessageCircle, Zap } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

const highlights = [
  { icon: MapPin, text: "Live map of trainers around you" },
  { icon: Zap, text: "“Available today” for urgent sessions" },
  { icon: MessageCircle, text: "One-tap WhatsApp contact" },
  { icon: Bell, text: "Booking reminders and updates" },
];

export function MobilePreview() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>On the go</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              The whole marketplace, in your pocket
            </h2>
            <p className="mt-4 max-w-md text-fg-muted">
              FitNear is built mobile-first. Discover trainers nearby, compare
              and book from your phone in under a minute — wherever you are in
              the UAE.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h.text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300/20 text-lime-600">
                    <h.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-medium">{h.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Phone mockup */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto flex justify-center">
              <div className="pointer-events-none absolute inset-0 m-auto h-72 w-72 glow-lime opacity-50" />
              <motion.div
                initial={{ rotate: -4 }}
                whileInView={{ rotate: -4 }}
                className="relative w-[18rem] rounded-[2.75rem] border-[10px] border-ink-900 bg-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
              >
                {/* notch */}
                <div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-ink-900" />
                <div className="relative overflow-hidden rounded-[2.1rem] bg-cloud">
                  {/* app header */}
                  <div className="flex items-center justify-between bg-ink-900 px-4 pb-3 pt-8 text-white">
                    <div>
                      <p className="text-[10px] text-white/60">Trainers near</p>
                      <p className="flex items-center gap-1 text-sm font-semibold">
                        <MapPin className="h-3.5 w-3.5 text-lime-300" /> Dubai
                        Marina
                      </p>
                    </div>
                    <Bell className="h-4 w-4 text-white/70" />
                  </div>
                  {/* search */}
                  <div className="px-3 pt-3">
                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
                      <Search className="h-3.5 w-3.5 text-fg-muted" />
                      <span className="text-xs text-fg-muted">
                        Search sport or area
                      </span>
                    </div>
                  </div>
                  {/* mini map */}
                  <div className="relative mx-3 mt-3 h-24 overflow-hidden rounded-2xl bg-ink-800">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(194,242,42,0.25),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(194,242,42,0.2),transparent_40%)]" />
                    {[
                      { x: "28%", y: "38%" },
                      { x: "62%", y: "55%" },
                      { x: "45%", y: "70%" },
                    ].map((p, i) => (
                      <span
                        key={i}
                        className="absolute h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_0_4px_rgba(194,242,42,0.25)]"
                        style={{ left: p.x, top: p.y }}
                      />
                    ))}
                  </div>
                  {/* cards */}
                  <div className="space-y-2 p-3">
                    {[
                      {
                        name: "Layla Hassan",
                        role: "Yoga",
                        img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=80&q=80",
                        rate: "180",
                        dist: "3.4",
                      },
                      {
                        name: "Omar Al Rashid",
                        role: "Strength",
                        img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=80&q=80",
                        rate: "220",
                        dist: "1.8",
                      },
                    ].map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-sm"
                      >
                        <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                          <Image src={c.img} alt={c.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold">
                            {c.name}
                          </p>
                          <p className="flex items-center gap-1 text-[10px] text-fg-muted">
                            <Star className="h-2.5 w-2.5 fill-lime-400 text-lime-400" />{" "}
                            {c.role} · {c.dist} km
                          </p>
                        </div>
                        <span className="text-xs font-bold">
                          {c.rate}
                          <span className="text-[9px] font-normal text-fg-muted">
                            /hr
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 pb-4">
                    <div className="flex items-center justify-center gap-1.5 rounded-full bg-lime-300 py-2.5 text-xs font-bold text-ink-900">
                      <MessageCircle className="h-3.5 w-3.5" /> Book a session
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
