import type { Trainer } from "./types";

/**
 * Derives trust & safety signals from a trainer's verified attributes.
 * Kept deterministic (no RNG) so a trainer always shows the same badges.
 */

export interface TrustSignal {
  key: string;
  label: string;
  icon: string; // lucide icon name
  active: boolean;
  note: string;
}

function fastResponder(t: Trainer) {
  return /within 1 hour|within 2 hours/i.test(t.responseTime);
}

export function trustSignals(t: Trainer): TrustSignal[] {
  return [
    {
      key: "id",
      label: "ID verified",
      icon: "BadgeCheck",
      active: t.verified,
      note: "Government ID checked against this profile.",
    },
    {
      key: "certs",
      label: "Certified",
      icon: "GraduationCap",
      active: t.certifications.length > 0,
      note: "Coaching qualifications reviewed by our team.",
    },
    {
      key: "background",
      label: "Background checked",
      icon: "ShieldCheck",
      active: t.verified,
      note: "Cleared for in-person and home sessions.",
    },
    {
      key: "insured",
      label: "Insured",
      icon: "Umbrella",
      active: t.verified && t.experienceYears >= 5,
      note: "Carries professional liability insurance.",
    },
    {
      key: "fast",
      label: "Fast responder",
      icon: "Zap",
      active: fastResponder(t),
      note: t.responseTime,
    },
    {
      key: "experienced",
      label: `${t.experienceYears}+ yrs experience`,
      icon: "Briefcase",
      active: t.experienceYears >= 5,
      note: `${t.sessionsCompleted.toLocaleString()} sessions completed.`,
    },
    {
      key: "toprated",
      label: "Top rated",
      icon: "Star",
      active: t.rating >= 4.8,
      note: `${t.rating.toFixed(1)} from ${t.reviewCount} verified reviews.`,
    },
  ];
}

/** A 0–100 trust score used for ranking and the trust meter. */
export function trustScore(t: Trainer): number {
  let s = 0;
  if (t.verified) s += 30;
  if (t.certifications.length > 0) s += 12;
  if (t.experienceYears >= 5) s += 14;
  s += Math.min(20, Math.round((t.rating - 4) * 20)); // rating quality
  s += Math.min(14, Math.round(t.reviewCount / 10)); // review volume
  if (fastResponder(t)) s += 6;
  if (t.featured) s += 4;
  return Math.max(0, Math.min(100, s));
}

/** Platform-wide safety guarantees shown to every client. */
export const safetyGuarantees = [
  {
    icon: "Wallet",
    title: "Secure payments",
    text: "Your payment is held safely and only released to the trainer after your session.",
  },
  {
    icon: "RefreshCcw",
    title: "First-session guarantee",
    text: "Not happy after your first session? Get your money back — no questions asked.",
  },
  {
    icon: "MapPin",
    title: "Session safety",
    text: "Share your live session location with a trusted contact and reach support anytime.",
  },
  {
    icon: "Lock",
    title: "Private & protected",
    text: "Your data is encrypted. Contact details are shared only after you book.",
  },
];
