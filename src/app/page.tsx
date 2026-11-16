"use client";

import React, { useState } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { TrustStripSection } from "@/components/sections/trust-strip";
import { MaterialStudioSection } from "@/components/sections/material-studio";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { ProcessSection } from "@/components/sections/process";
import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ServiceAreasSection } from "@/components/sections/service-areas";
import { FaqSection } from "@/components/sections/faq";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );
  const [configuredScope, setConfiguredScope] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* SECTION 01 — Announcement Bar + Live 4-Combo Theme Switcher */}
      <AnnouncementBar />

      {/* SECTION 02 — Floating Frosted-Glass Capsule Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 03 — Sculptural Hero + Interactive Roof Anatomy Hotspots */}
        <HeroSection />

        {/* SECTION 04 — Trust Strip + Infinite Architectural Spec Marquee */}
        <TrustStripSection />

        {/* INTERACTIVE ROOF MATERIAL STUDIO & SCOPE CONFIGURATOR */}
        <MaterialStudioSection onApplyConfiguredScope={setConfiguredScope} />

        {/* SECTION 05 — Curated Editorial Bento Services */}
        <ServicesSection onSelectServiceForEstimate={setSelectedService} />

        {/* SECTION 06 — Magazine Brand Story & Unseen Integrity */}
        <AboutSection />

        {/* SECTION 07 — The AUREL Difference (Roman Numeral Pillars) */}
        <WhyChooseUsSection />

        {/* SECTION 08 — 4-Step Roofing Journey */}
        <ProcessSection />

        {/* SECTION 09 — Selected Works & Interactive Before/After Slider */}
        <ProjectsSection />

        {/* SECTION 10 — Client Experiences */}
        <TestimonialsSection />

        {/* SECTION 11 — Interactive Topographic Service Areas */}
        <ServiceAreasSection />

        {/* SECTION 12 — FAQ Accordion */}
        <FaqSection />

        {/* SECTION 13 — Final Conversion CTA */}
        <FinalCtaSection />

        {/* SECTION 14 — Estimate Request Form */}
        <ContactSection
          preselectedService={selectedService}
          prefilledScopeDescription={configuredScope}
        />
      </main>

      {/* SECTION 15 — Architectural Footer */}
      <Footer />
    </div>
  );
}
