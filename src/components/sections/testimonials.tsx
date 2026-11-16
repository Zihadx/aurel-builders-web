"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Reveal } from "@/components/ui/reveal";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-ivory paper-grain text-obsidian border-b border-stone"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            label="Client Experiences"
            heading="Good Work"
            serifAccent="Speaks for Itself."
            theme="light"
            className="mb-0"
          />
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone/70 text-xs font-medium text-charcoal">
            ✦ Illustrative Sample Reviews — Clearly Labeled Demo Content
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <TestimonialCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
