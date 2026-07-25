"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Re-mounts on every route change, giving a subtle cross-page fade.
 * Opacity-only (no transform) so nothing breaks position: sticky / fixed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
