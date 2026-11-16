"use client";

import React from "react";
import { SERVICES_DATA } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

interface ServicesSectionProps {
  onSelectServiceForEstimate?: (serviceTitle: string) => void;
}

export function ServicesSection({
  onSelectServiceForEstimate,
}: ServicesSectionProps) {
  const handleSelect = (serviceTitle: string) => {
    if (onSelectServiceForEstimate) {
      onSelectServiceForEstimate(serviceTitle);
    }
    scrollToSection("#contact");
  };

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-ivory paper-grain text-obsidian"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <SectionHeading
          label="What We Do"
          heading="Everything Your Roof Needs."
          serifAccent="Nothing It Doesn't."
          description="From a subtle flashing leak to a complete architectural roof transformation, we deliver bespoke exterior solutions tailored to the character of your home."
          theme="light"
          align="split"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            let colSpanClass = "lg:col-span-4";
            if (idx === 0) colSpanClass = "lg:col-span-7";
            else if (idx === 1) colSpanClass = "lg:col-span-5";
            else if (idx === 2) colSpanClass = "lg:col-span-4";
            else if (idx === 3) colSpanClass = "lg:col-span-4";
            else if (idx === 4) colSpanClass = "lg:col-span-4";
            else if (idx === 5) colSpanClass = "md:col-span-2 lg:col-span-12";

            return (
              <Reveal
                key={service.id}
                delay={idx * 0.06}
                className={colSpanClass}
              >
                <ServiceCard
                  service={service}
                  onSelectService={handleSelect}
                  className="h-full"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
