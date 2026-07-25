"use client";

import { motion } from "framer-motion";
import { MapPin, UserSearch, CalendarCheck, Trophy } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

const steps = [
  {
    icon: MapPin,
    title: "Share your location",
    text: "Enter your area or use your current location to see trainers genuinely close to you.",
  },
  {
    icon: UserSearch,
    title: "Filter & compare",
    text: "Narrow by sport, price, gender, rating, availability and training format — home, gym, outdoor or online.",
  },
  {
    icon: CalendarCheck,
    title: "Book or message",
    text: "Contact instantly on WhatsApp, or book a session with a transparent price and clear cancellation policy.",
  },
  {
    icon: Trophy,
    title: "Train & review",
    text: "Meet your trainer, hit your goals, and leave a review to help the next person find their match.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">How it works</Eyebrow>
            <h2 className="display-2 font-display mx-auto mt-3 max-w-2xl font-bold text-balance">
              From search to first session in four simple steps
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-ink-900/12 to-transparent md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 text-lime-300 shadow-[0_16px_40px_-16px_rgba(11,13,11,0.6)]">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-xs font-bold text-ink-900">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-fg-muted">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
