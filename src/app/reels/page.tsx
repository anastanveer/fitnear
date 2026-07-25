import { ReelsFeed } from "@/components/reels/ReelsFeed";

export const metadata = {
  title: "Reels",
  description:
    "Trainer Reels — short, full-screen clips from the UAE's top verified fitness coaches. Swipe, like, save and book in a tap.",
};

export default function ReelsPage() {
  return (
    <div className="bg-ink-950">
      <ReelsFeed />
    </div>
  );
}
