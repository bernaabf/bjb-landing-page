import { ScrollProgressOrchestrator } from "@/components/motion/ScrollProgressOrchestrator";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MethodAndAudienceSection } from "@/components/MethodAndAudienceSection";
import { MonumentalFooter } from "@/components/MonumentalFooter";
import { PipelineSection } from "@/components/PipelineSection";
import { ProblemsSection } from "@/components/ProblemsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { ConversionSection, ValueSection } from "@/components/ValueAndConversionSection";

export default function HomePage() {
  return (
    <>
      <ScrollProgressOrchestrator />
      <Navbar />
      <main className="relative w-full overflow-x-clip bg-[#281918]">
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <PipelineSection />
        <MethodAndAudienceSection />
        <ValueSection />
        <TeamSection />
        <ConversionSection />
        <MonumentalFooter />
      </main>
    </>
  );
}
