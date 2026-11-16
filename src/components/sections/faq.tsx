"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-ivory paper-grain text-obsidian"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              label="Common Questions"
              heading="Good Questions Deserve"
              serifAccent="Clear Answers."
              description="Straightforward, practical answers about roof replacements, storm damage, timelines, and warranties."
              theme="light"
              className="mb-8"
            />
            <div className="p-7 rounded-3xl bg-obsidian text-ivory space-y-4 shadow-xl">
              <div className="font-serif italic text-xl text-copperLight">
                Have a specific question about your roofline?
              </div>
              <p className="text-sm text-ivory/75 leading-relaxed">
                Every home’s pitch, valley geometry, and attic ventilation is
                unique. Speak directly with an estimator or request a
                complimentary inspection.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn-beveled-primary w-full h-12 rounded-full text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
              >
                Ask Our Team Directly ↗
              </button>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-4">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <Reveal key={faq.id} delay={idx * 0.05}>
                  <div
                    className={`rounded-3xl border transition-all overflow-hidden ${
                      isOpen
                        ? "bg-white border-copper shadow-md"
                        : "bg-white/80 border-stone"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((prev) => (prev === faq.id ? null : faq.id))
                      }
                      aria-expanded={isOpen}
                      className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-medium text-copper block mb-1">
                          {faq.category}
                        </span>
                        <span className="font-display text-lg sm:text-xl font-semibold text-obsidian block">
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className={`h-9 w-9 rounded-full border flex items-center justify-center shrink-0 text-sm ${
                          isOpen
                            ? "bg-copper border-copper text-white"
                            : "border-stone text-obsidian"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-7 pt-2 border-t border-stone/60 space-y-3">
                        <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="p-4 rounded-2xl bg-ivory text-xs font-medium text-obsidian">
                          <strong className="text-copper">Key Takeaway:</strong>{" "}
                          {faq.keyTakeaway}
                        </div>
                      </div>
                    )}
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
