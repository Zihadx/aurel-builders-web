"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ProcessSection() {
  const { processSteps } = SITE_CONFIG;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-ivory paper-grain text-obsidian border-t border-stone"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <SectionHeading
          label="How It Works"
          heading="A Better Roofing Experience,"
          serifAccent="From Start to Finish."
          description="Select any stage below to explore how we guide your project from initial conversation to final walkthrough."
          theme="light"
          align="split"
        />

        <div className="relative mt-10">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-stone">
            <div
              className="h-full bg-copper transition-all duration-500"
              style={{
                width: `${((activeStep + 1) / processSteps.length) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => {
              const isSelected = idx === activeStep;
              const isDone = idx <= activeStep;

              return (
                <Reveal key={step.number} delay={idx * 0.08}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(idx);
                      }
                    }}
                    className="relative pt-0 lg:pt-16 cursor-pointer h-full"
                  >
                    <div
                      className={`lg:absolute lg:top-0 lg:left-0 h-14 w-14 rounded-2xl flex items-center justify-center font-serif italic text-2xl transition-all mb-4 lg:mb-0 ${
                        isSelected
                          ? "bg-copper text-white shadow-lg scale-105"
                          : isDone
                          ? "bg-obsidian text-ivory"
                          : "bg-white text-charcoal border border-stone"
                      }`}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`p-7 rounded-3xl border transition-all h-full flex flex-col justify-between ${
                        isSelected
                          ? "bg-obsidian text-ivory border-obsidian shadow-xl"
                          : "bg-white text-obsidian border-stone hover:border-copper"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-xs font-medium block mb-2 ${
                            isSelected ? "text-copperLight" : "text-copper"
                          }`}
                        >
                          {step.durationSample}
                        </span>
                        <h3 className="font-display text-xl font-semibold mb-3">
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            isSelected ? "text-ivory/75" : "text-charcoal/80"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                      <div
                        className={`mt-6 pt-4 border-t text-xs ${
                          isSelected
                            ? "border-white/10 text-copperLight"
                            : "border-stone text-charcoal/70"
                        }`}
                      >
                        <strong>Outcome:</strong> {step.deliverable}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
