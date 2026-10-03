import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import BrandStatement from "@/components/sections/BrandStatement";
import ConsultingSection from "@/components/sections/ConsultingSection";
import BrandDevelopmentSection from "@/components/sections/BrandDevelopmentSection";
import DigitalPresenceSection from "@/components/sections/DigitalPresenceSection";
import MarketingSection from "@/components/sections/MarketingSection";
import ContentCreationSection from "@/components/sections/ContentCreationSection";
import DubaiSection from "@/components/sections/DubaiSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <BrandStatement />
      
      {/* 5 Core Service Sections */}
      <div id="services">
        <ConsultingSection />
        <BrandDevelopmentSection />
        <DigitalPresenceSection />
        <MarketingSection />
        <ContentCreationSection />
      </div>

      <DubaiSection />
      <StatsSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
