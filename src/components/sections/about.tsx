"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

export function AboutSection() {
  const { about } = SITE_CONFIG;

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-alabaster text-obsidian border-t border-stone/80 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Layered Architectural Collage */}
          <Reveal mode="clip-curtain" className="lg:col-span-6 relative">
            <div className="relative pr-0 sm:pr-14 pb-12 sm:pb-16">
              <div className="relative h-[440px] sm:h-[560px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.aboutPrimaryCraft.url}
                  alt={IMAGES.aboutPrimaryCraft.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory">
                  <div>
                    <span className="font-serif italic text-lg text-copperLight block">
                      Field Craftsmanship
                    </span>
                    <span className="text-sm font-medium">
                      Precision substrate &amp; valley metalwork
                    </span>
                  </div>
                </div>
              </div>

              {/* Overlapping Material Palette Card */}
              <div className="hidden sm:block absolute -bottom-2 right-0 w-72 rounded-3xl overflow-hidden bg-obsidian text-ivory p-5 shadow-2xl border border-white/10">
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={IMAGES.aboutSecondaryMaterial.url}
                    alt={IMAGES.aboutSecondaryMaterial.alt}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>
                <div className="font-serif italic text-base text-copperLight">
                  Unseen Integrity
                </div>
                <p className="text-xs text-ivory/75 mt-1 leading-relaxed">
                  Every hidden ice-barrier lap, baffle vent, and deck fastener
                  is photographed for your home’s permanent archive.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Editorial Narrative */}
          <Reveal delay={0.12} className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper block">
              {about.label}
            </span>
            <h2 className="font-display editorial-h2 font-semibold text-obsidian">
              {about.heading}
              <br />
              <span className="font-serif italic font-normal text-copper">
                {about.highlightSerif}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-obsidian/90 leading-relaxed font-medium">
              {about.leadParagraph}
            </p>

            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
              {about.philosophyParagraph}
            </p>

            <blockquote className="p-6 sm:p-7 rounded-2xl bg-ivory border border-stone text-lg sm:text-xl font-serif italic text-obsidian leading-relaxed">
              &ldquo;{about.craftsmanshipStatement}&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-obsidian font-medium">
              {about.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-copper/15 text-copper flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => scrollToSection("#process")}
                className="inline-flex items-center gap-3 h-12 px-7 rounded-full bg-obsidian text-ivory font-semibold text-xs uppercase tracking-wider hover:bg-charcoal transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{about.ctaLabel}</span>
                <span>→</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Sculptural Editorial Figures */}
        <Reveal delay={0.18}>
          <div className="mt-20 pt-12 border-t border-stone grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.demoMetrics.map((m, idx) => (
              <div key={idx} className="flex items-baseline gap-5">
                <span className="font-serif italic text-5xl sm:text-6xl text-copper leading-none">
                  {m.value}
                  {m.suffix}
                </span>
                <div>
                  <div className="font-display text-base font-semibold text-obsidian">
                    {m.label}
                  </div>
                  <p className="text-xs text-charcoal/65 mt-0.5">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
