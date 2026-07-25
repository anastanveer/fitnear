"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function TransformationGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 0.985 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={`Client transformation ${i + 1}`}
              fill
              sizes="(max-width:640px) 50vw, 260px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink-900/0 transition-colors group-hover:bg-ink-900/20" />
            <span className="absolute bottom-2 left-2 rounded-full bg-ink-900/70 px-2.5 py-1 text-[11px] font-semibold text-lime-300 backdrop-blur">
              12-week result
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[75vh] w-full max-w-2xl overflow-hidden rounded-3xl"
            >
              <Image
                src={images[active]}
                alt={`Client transformation ${active + 1}`}
                fill
                sizes="672px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
