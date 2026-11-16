import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AssurancesSection } from "@/components/sections/assurances";
import { ServicesSection } from "@/components/sections/services";
import { MaterialsSection } from "@/components/sections/materials";
import { ApproachSection } from "@/components/sections/approach";
import { ProcessSection } from "@/components/sections/process";
import { WorkSection } from "@/components/sections/work";
import { ReviewsSection } from "@/components/sections/reviews";
import { ServiceAreasSection } from "@/components/sections/service-areas";
import { InspectionSection } from "@/components/sections/inspection";
import { HealthCheckSection } from "@/components/sections/health-check";
import { CarePlansSection } from "@/components/sections/care-plans";
import { TeamSection } from "@/components/sections/team";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <HeroSection />
        <AssurancesSection />
        <ServicesSection />
        <MaterialsSection />
        <ApproachSection />
        <InspectionSection />
        <ProcessSection />
        <WorkSection />
        <HealthCheckSection />
        <ReviewsSection />
        <TeamSection />
        <CarePlansSection />
        <ServiceAreasSection />
        <JournalTeaser />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
