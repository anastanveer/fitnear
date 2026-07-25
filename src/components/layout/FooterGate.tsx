"use client";

import { usePathname } from "next/navigation";

/** Hides the site footer on fully-immersive routes (e.g. Reels). */
export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/reels")) return null;
  return <>{children}</>;
}
