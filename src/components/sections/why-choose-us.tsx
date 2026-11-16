"use client";

import React from "react";
import { SITE_CONFIG } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function WhyChooseUsSection() {
  const { whyChooseUs } = SITE_CONFIG;

  return (
    <section
      id="why-aurel"
      className="py-24 lg:py-32 dark-mesh-surface text-ivory relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <SectionHeading
          label={whyChooseUs.label}
          heading="Quality You Can See."
          serifAccent="Confidence You Can Feel."
          description={whyChooseUs.subheading}
          theme="dark"
          align="split"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {whyChooseUs.principles.map((p, idx) => (
            <Reveal key={p.number} delay={idx * 0.08}>
              <div className="group rounded-3xl bg-graphite/70 border border-white/10 p-8 sm:p-10 hover:border-copper/60 transition-all duration-500 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif italic text-4xl sm:text-5xl text-copperLight">
                      {p.roman}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-ivory/70">
                      {p.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ivory mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ivory/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-copperLight">
                  <span>{p.specificationTag}</span>
                  <span>✦</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
