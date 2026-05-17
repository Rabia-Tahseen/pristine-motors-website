import Hero from "@/components/Hero";

import HeroCarousel from "@/components/HeroCarousel";
import BrowseByCategory from "@/components/BrowseByCategory";
import FeaturedParts from "@/components/FeaturedParts";
import FeaturedCars from "@/components/FeaturedCars"; 
import TrustIndicators from "@/components/TrustIndicators";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <main>
    <Hero />
    <BrowseByCategory />
    <HeroCarousel />
    <FeaturedParts />
    <FeaturedCars />
    <TrustIndicators />
    <ContactSection />
  </main>
);

export default Index;
