import { Hero } from "@/components/home/hero/Hero";
import { Categories } from "@/components/home/Categories";
import { TrainersNearYou } from "@/components/home/TrainersNearYou";
import { UrgentSession } from "@/components/home/UrgentSession";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GoalDiscovery } from "@/components/home/GoalDiscovery";
import { ExploreFeatures } from "@/components/home/ExploreFeatures";
import { SmartMatch } from "@/components/home/SmartMatch";
import { WhyGrid } from "@/components/home/WhyGrid";
import { Verified } from "@/components/home/Verified";
import { Metrics } from "@/components/home/Metrics";
import { Community } from "@/components/home/Community";
import { Testimonials } from "@/components/home/Testimonials";
import { BusinessModel } from "@/components/home/BusinessModel";
import { MobilePreview } from "@/components/home/MobilePreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <TrainersNearYou />
      <UrgentSession />
      <HowItWorks />
      <GoalDiscovery />
      <ExploreFeatures />
      <SmartMatch />
      <WhyGrid />
      <Verified />
      <Metrics />
      <Community />
      <Testimonials />
      <BusinessModel />
      <MobilePreview />
      <FinalCTA />
    </>
  );
}
