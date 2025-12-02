import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SkillTracksSection from "@/components/SkillTracksSection";
import UserTypesSection from "@/components/UserTypesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SkillTracksSection />
      <UserTypesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
