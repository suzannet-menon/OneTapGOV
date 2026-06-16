import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import WhyItMatters from "../components/sections/WhyItMatters";
import HowRecommendationsWork from "../components/sections/HowRecommendationsWork";
import Sectors from "../components/sections/Sectors";
import EligibilityPreview from "../components/sections/EligibilityPreview";
import WhyOneTapGOV from "../components/sections/WhyOneTapGOV";
import FinalCTA from "../components/sections/FinalCTA";

export const metadata = {
  title: "OneTapGOV — Find Government Schemes Without the Confusion",
  description:
    "Discover benefits you may qualify for, understand eligibility requirements, and prepare applications through one guided experience.",
};

export default function HomePage() {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyItMatters />
      <HowRecommendationsWork />
      <Sectors />
      <EligibilityPreview />
      <WhyOneTapGOV />
      <FinalCTA />
      <Footer />
    </main>
  );
}
