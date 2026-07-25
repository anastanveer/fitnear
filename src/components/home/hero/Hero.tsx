"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Search, Star, ShieldCheck } from "lucide-react";
import { categories } from "@/data/categories";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Combobox } from "@/components/ui/Combobox";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-ink-900 to-ink-950" />
  ),
});

const areas = [
  "Dubai Marina",
  "JVC",
  "Business Bay",
  "Downtown Dubai",
  "Al Barsha",
  "Dubai Hills",
  "Jumeirah",
  "Abu Dhabi",
];

export function Hero() {
  const router = useRouter();
  const [area, setArea] = useState("");
  const [sport, setSport] = useState("");

  const search = () => {
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (sport) params.set("sport", sport);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink-950 text-fg-invert grain">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <CityScene />
      </div>

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink-950/80 via-ink-950/30 to-ink-950/90" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink-950/85 via-transparent to-transparent" />

      {/* content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-fg-invert-muted backdrop-blur"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-lime-300" />
            Now live across Dubai &amp; Abu Dhabi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 font-display mt-6 font-bold text-balance"
          >
            Find the right trainer,{" "}
            <span className="text-lime-300">closer to you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-fg-invert-muted"
          >
            A location-based marketplace for verified personal trainers,
            swimming instructors, boxing and yoga coaches near you. Search by
            area, sport, price and availability — then book in minutes.
          </motion.p>

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass mt-8 rounded-3xl p-2.5 shadow-2xl"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Combobox
                className="flex-1"
                dark
                ariaLabel="Your area or current location"
                value={area}
                onChange={setArea}
                options={areas}
                placeholder="Your area or current location"
                icon={<MapPin className="h-5 w-5 shrink-0 text-lime-300" />}
              />

              <div className="flex flex-1 items-center rounded-2xl bg-white/5 px-4 py-3">
                <Select
                  className="flex-1"
                  dark
                  ariaLabel="Sport or category"
                  placeholder="Any sport or category"
                  value={sport}
                  onChange={setSport}
                  icon={<Search className="h-5 w-5 shrink-0 text-lime-300" />}
                  options={[
                    { value: "", label: "Any sport or category" },
                    ...categories.map((c) => ({ value: c.slug, label: c.name })),
                  ]}
                />
              </div>

              <Button size="lg" onClick={search} className="sm:w-auto">
                <Search className="h-4 w-4" /> Find a trainer
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/join" variant="dark" size="lg" className="border border-white/10 bg-white/10 hover:bg-white/15">
              Join as a trainer — it&apos;s free
            </ButtonLink>
            <div className="flex items-center gap-4 text-sm text-fg-invert-muted">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-lime-300 text-lime-300" /> 4.9
                average
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-lime-300" /> Verified
                trainers
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating trainer cards (desktop) */}
      <FloatingCard
        className="right-[6%] top-[24%] hidden xl:block"
        delay={0.5}
        name="Layla Hassan"
        role="Yoga & mobility"
        img="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=80"
        rating="5.0"
        area="Jumeirah · 3.4 km"
      />
      <FloatingCard
        className="right-[18%] bottom-[14%] hidden xl:block"
        delay={0.7}
        name="Omar Al Rashid"
        role="Strength & fat-loss"
        img="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=80"
        rating="4.9"
        area="Dubai Marina · 1.8 km"
      />
    </section>
  );
}

function FloatingCard({
  className,
  delay,
  name,
  role,
  img,
  rating,
  area,
}: {
  className?: string;
  delay: number;
  name: string;
  role: string;
  img: string;
  rating: string;
  area: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-20 ${className}`}
    >
      <div className="animate-float glass w-60 rounded-2xl p-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl">
            <Image src={img} alt={name} fill sizes="48px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-white/60">{role}</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-lime-300">
            <Star className="h-3 w-3 fill-lime-300" /> {rating}
          </span>
          <span className="text-white/60">{area}</span>
        </div>
      </div>
    </motion.div>
  );
}
