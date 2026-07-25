"use client";

import { motion } from "framer-motion";
import { IdCard, GraduationCap, Award, ShieldCheck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";

const stages = [
  {
    icon: IdCard,
    title: "Identity check",
    text: "Government ID verified against the trainer's profile before they go live.",
  },
  {
    icon: GraduationCap,
    title: "Certification review",
    text: "Coaching qualifications and first-aid credentials are checked by our team.",
  },
  {
    icon: Award,
    title: "Experience validation",
    text: "Work history and specialisations confirmed through references and portfolio.",
  },
  {
    icon: ShieldCheck,
    title: "Verified badge issued",
    text: "Approved trainers earn the FitNear badge and priority in trust-ranked results.",
  },
];

export function Verified() {
  return (
    <section id="verified" className="relative py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Trust &amp; safety</Eyebrow>
            <h2 className="display-2 font-display mt-3 font-bold text-balance">
              A verification system clients can trust
            </h2>
            <p className="mt-4 max-w-md text-fg-muted">
              Anyone can call themselves a trainer. On FitNear, the verified
              badge means real checks have happened — so clients book with
              confidence and great trainers stand out.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-lime-300/40 bg-lime-50 p-4">
              <ShieldCheck className="h-10 w-10 shrink-0 text-lime-600" />
              <p className="text-sm text-fg">
                <span className="font-semibold">92% of clients</span> say a
                verified badge makes them more likely to book — so verification
                is free for every trainer who qualifies.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-lime-300 via-ink-900/12 to-transparent" />
            <ul className="space-y-4">
              {stages.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex gap-5 rounded-2xl border border-ink-900/8 bg-white p-5 pl-6"
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-lime-300">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-lime-600">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-lg font-semibold">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
