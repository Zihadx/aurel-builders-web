"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { scrollToSection } from "@/lib/utils";

interface MaterialStudioSectionProps {
  onApplyConfiguredScope?: (summaryText: string) => void;
}

const PITCH_OPTIONS = [
  { label: "Standard Pitch (4/12–6/12)", value: "Low / Standard (4/12 – 6/12)", extraDays: 0 },
  { label: "Steep Gable (7/12–9/12)", value: "Steep Architectural (7/12 – 9/12)", extraDays: 1 },
  { label: "Estate Multi-Valley (10/12+)", value: "Complex Multi-Valley Estate (10/12+)", extraDays: 2 },
];

export function MaterialStudioSection({
  onApplyConfiguredScope,
}: MaterialStudioSectionProps) {
  const { materialStudio } = SITE_CONFIG;
  const [activeIdx, setActiveIdx] = useState(0);
  const [sqft, setSqft] = useState(3400);
  const [pitchIdx, setPitchIdx] = useState(0);

  const currentMaterial = materialStudio[activeIdx] || materialStudio[0];
  const imageAsset = IMAGES[currentMaterial.imageKey] || IMAGES.project1After;
  const currentPitch = PITCH_OPTIONS[pitchIdx];

  const squares = Math.round(sqft / 100);
  const baseDays = Math.max(2, Math.round(sqft / 1200));
  const minDays = baseDays + currentPitch.extraDays;
  const maxDays = minDays + 1;
  const crewSize =
    sqft > 4500
      ? "8-Artisan Master Crew + Site Director"
      : "6-Artisan Specialized Crew + Site Director";

  const handleLoadIntoForm = () => {
    const summary = `Configured Scope: ~${sqft.toLocaleString()} sq. ft. (${squares} squares) | Preferred Assembly: ${currentMaterial.title} | Roof Pitch: ${currentPitch.value}. Please schedule a complimentary 45-point on-site inspection.`;
    if (onApplyConfiguredScope) {
      onApplyConfiguredScope(summary);
    }
    scrollToSection("#contact");
  };

  return (
    <section
      aria-label="Interactive Roof Material Specifier"
      className="py-20 lg:py-28 bg-obsidian text-ivory border-t border-white/10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Material Selector Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-copperLight">
              <span>✦ Interactive Architectural Material Studio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.04]">
              Explore Our Signature{" "}
              <span className="font-serif italic font-normal text-copperLight">
                Roof Assemblies.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-ivory/70 leading-relaxed">
              Every home’s architecture calls for a distinct material language.
              Select an assembly below to inspect its structural profile, wind
              rating, and expected longevity.
            </p>

            <div className="space-y-3 pt-2">
              {materialStudio.map((mat, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-graphite border-copperLight shadow-lg"
                        : "bg-white/[0.03] border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div>
                      <div className="font-display text-base font-semibold text-ivory">
                        {mat.title}
                      </div>
                      <div className="text-xs text-ivory/65 mt-0.5">
                        {mat.subtitle}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isSelected
                          ? "bg-copper/20 text-copperLight"
                          : "bg-white/10 text-ivory/80"
                      }`}
                    >
                      {mat.lifespanBadge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Interactive Visual Showcase Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-graphite shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
              <div className="relative h-[340px] sm:h-[440px] w-full">
                <Image
                  src={imageAsset.url}
                  alt={imageAsset.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-transparent" />
                <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/15 text-xs font-medium text-copperLight">
                  {currentMaterial.badge}
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-obsidian/90 backdrop-blur-xl border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs text-ivory/55">
                    Wind &amp; Impact Rating
                  </div>
                  <div className="font-display text-lg font-semibold text-copperLight mt-1">
                    {currentMaterial.windRating}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-ivory/55">
                    Underlayment Pairing
                  </div>
                  <div className="font-display text-lg font-semibold text-ivory mt-1">
                    {currentMaterial.underlaymentSpec}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-ivory/55">
                    Thermal Reflectivity
                  </div>
                  <div className="font-display text-lg font-semibold text-ivory mt-1">
                    {currentMaterial.thermalSpec}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Architectural Scope & Timeline Configurator Bar */}
        <div className="mt-12 rounded-3xl bg-graphite/90 border border-white/15 p-7 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-copperLight block">
                Interactive Project Configurator
              </span>
              <h3 className="font-display text-2xl font-semibold text-ivory">
                Model Your Roof{" "}
                <span className="font-serif italic font-normal text-copperLight">
                  Footprint &amp; Scope
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
                Adjust your approximate roof area and pitch below to preview
                typical crew sizing, installation duration, and underlayment
                specifications.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <label htmlFor="calc-sqft-range" className="text-ivory/80">
                    Approximate Roof Area (Sq. Ft.)
                  </label>
                  <span className="font-display text-base font-bold text-copperLight">
                    {sqft.toLocaleString()} sq. ft. ({squares} Squares)
                  </span>
                </div>
                <input
                  id="calc-sqft-range"
                  type="range"
                  min={1500}
                  max={8000}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="arch-slider"
                />
                <div className="flex justify-between text-[11px] text-ivory/45 mt-1">
                  <span>1,500 sq. ft.</span>
                  <span>4,500 sq. ft.</span>
                  <span>8,000 sq. ft. Estate</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-ivory/70 mr-2">Roof Pitch:</span>
                {PITCH_OPTIONS.map((p, idx) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPitchIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      idx === pitchIdx
                        ? "bg-copper text-white"
                        : "bg-white/10 text-ivory/80 hover:bg-white/20"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 rounded-2xl bg-obsidian/90 border border-white/10 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ivory/55">
                  Estimated Production Window
                </div>
                <div className="font-serif italic text-3xl text-copperLight mt-0.5">
                  {minDays} – {maxDays} Days (Sample)
                </div>
                <div className="text-xs text-ivory/75 mt-1">{crewSize}</div>
              </div>
              <button
                type="button"
                onClick={handleLoadIntoForm}
                className="btn-beveled-primary w-full py-3 px-4 rounded-full text-xs font-semibold tracking-wide cursor-pointer text-center"
              >
                Load Scope into Estimate Form ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
