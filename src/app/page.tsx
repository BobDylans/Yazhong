import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PromotionBanner } from "@/components/PromotionBanner";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CustomSection } from "@/components/CustomSection";
import { StatsSection } from "@/components/StatsSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { InstagramSection } from "@/components/InstagramSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PromotionBanner />
        <FeaturesSection />
        <CustomSection />
        <StatsSection />
        <ComparisonSection />
        <InstagramSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
