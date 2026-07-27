import { Hero } from "@/components/home/hero/Hero";
import { BrowseByLocation } from "@/components/home/BrowseByLocation";
import { TrainersNearYou } from "@/components/home/TrainersNearYou";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyGrid } from "@/components/home/WhyGrid";
import { Verified } from "@/components/home/Verified";
import { Metrics } from "@/components/home/Metrics";
import { Testimonials } from "@/components/home/Testimonials";
import { BusinessModel } from "@/components/home/BusinessModel";
import { MobilePreview } from "@/components/home/MobilePreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseByLocation />
      <TrainersNearYou />
      <Categories />
      <HowItWorks />
      <WhyGrid />
      <Verified />
      <Metrics />
      <Testimonials />
      <BusinessModel />
      <MobilePreview />
      <FinalCTA />
    </>
  );
}
