import Hero from "@/components/Hero";
import QuickSearch from "@/components/QuickSearch";
import BrowseByCategory from "@/components/BrowseByCategory";
import FeaturedCars from "@/components/FeaturedCars";
import FeaturedParts from "@/components/FeaturedParts";
import TrustIndicators from "@/components/TrustIndicators";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <main>
    <Hero />
    <QuickSearch />
    <SuggestedCarousel />
    <BrowseByCategory />
    <FeaturedCars />
    <FeaturedParts />
    <TrustIndicators />
    <ContactSection />
  </main>
);

export default Index;
