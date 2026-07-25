import { Sparkles, Zap, Target, ShieldCheck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { AiCoach } from "@/components/ai/AiCoach";

export const metadata = {
  title: "AI Coach — find your perfect trainer",
  description:
    "Chat with the FitNear AI coach. Answer a few questions and get matched with the ideal trainer near you, plus a personalised starter plan.",
};

const perks = [
  { icon: Target, title: "Goal-aware", text: "Matches on your goal, not ads." },
  { icon: Zap, title: "Instant", text: "Your match in under a minute." },
  { icon: ShieldCheck, title: "Verified only", text: "Every trainer is checked." },
];

export default function AiCoachPage() {
  return (
    <div className="bg-cloud pb-24 pt-28 sm:pt-32">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* copy */}
          <Reveal>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" /> FitNear AI
            </Eyebrow>
            <h1 className="display-1 font-display mt-4 font-bold text-balance">
              Meet your AI fitness concierge.
            </h1>
            <p className="mt-5 max-w-md text-lg text-fg-muted">
              Not sure who to train with? Tell the AI your goal, budget and
              location — it reads every verified trainer near you and hands you
              the perfect match with a plan to start.
            </p>

            <div className="mt-8 space-y-4">
              {perks.map((p) => (
                <div key={p.title} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300/20 text-lime-600">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-fg-muted">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-md text-xs text-fg-muted">
              Prototype note: the concierge runs on smart rule-based matching
              over mock data. A production version would plug into the Claude API
              for full free-form conversation.
            </p>
          </Reveal>

          {/* chat */}
          <Reveal delay={0.1}>
            <AiCoach />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
