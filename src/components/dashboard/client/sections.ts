import {
  LayoutDashboard,
  Heart,
  Search,
  Calendar,
  History,
  MessageCircle,
  Star,
  CreditCard,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type SectionKey =
  | "overview"
  | "saved"
  | "searches"
  | "upcoming"
  | "history"
  | "messages"
  | "reviews"
  | "payments"
  | "recommended"
  | "settings";

export interface SectionDef {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
  /** Optional small count badge in the sidebar. */
  badge?: number;
}

export const sections: SectionDef[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "saved", label: "Saved trainers", icon: Heart, badge: 6 },
  { key: "searches", label: "Recent searches", icon: Search },
  { key: "upcoming", label: "Upcoming sessions", icon: Calendar, badge: 3 },
  { key: "history", label: "Booking history", icon: History },
  { key: "messages", label: "Messages", icon: MessageCircle, badge: 1 },
  { key: "reviews", label: "Reviews to submit", icon: Star, badge: 3 },
  { key: "payments", label: "Payment history", icon: CreditCard },
  { key: "recommended", label: "Recommended", icon: Sparkles },
  { key: "settings", label: "Profile settings", icon: Settings },
];
