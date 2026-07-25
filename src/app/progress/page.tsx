import { ProgressClient } from "@/components/progress/ProgressClient";

export const metadata = {
  title: "Your progress",
  description:
    "Track your workouts, streaks, weight trend and achievements — your personal FitNear progress tracker.",
};

export default function ProgressPage() {
  return <ProgressClient />;
}
