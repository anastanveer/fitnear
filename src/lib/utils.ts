import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as AED currency. */
export function aed(amount: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Platform commission rate used across mock booking flows. */
export const COMMISSION_RATE = 0.12;

/** Split a fee into trainer payout + platform commission. */
export function feeBreakdown(fee: number, rate: number = COMMISSION_RATE) {
  const commission = Math.round(fee * rate);
  return { fee, commission, total: fee, trainerPayout: fee - commission };
}
