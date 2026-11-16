"use client";

import React, { useState } from "react";
import { SERVICE_AREAS_DATA } from "@/data/service-areas";
import { ServiceAreaRegion } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

export function ServiceAreasSection() {
  const [activeRegion, setActiveRegion] = useState<ServiceAreaRegion>(
    SERVICE_AREAS_DATA[0]
  );

  return (
    <section
      id="service-areas"
      className="py-24 lg:py-32 bg-alabaster text-obsidian border-b border-stone"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <SectionHeading
          label="Where We Work"
          heading="Local Expertise."
          serifAccent="Dependable Service."
          description="Explore our editable sample service corridors below to check typical inspection scheduling windows for your neighborhood."
          theme="light"
          align="split"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Topographic Architectural Map Card */}
          <Reveal className="lg:col-span-6">
            <div className="h-full rounded-3xl bg-obsidian text-ivory p-7 sm:p-9 border border-graphite flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between text-xs text-ivory/60 mb-2">
                <span>Interactive Regional Coverage Map (Sample)</span>
                <span className="text-copperLight font-serif italic text-sm">
                  Click any pin
                </span>
              </div>

              <svg
                viewBox="0 0 500 320"
                className="w-full h-64 select-none my-2"
                aria-label="Service coverage map"
              >
                <defs>
                  <radialGradient id="copperGlow" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="var(--hex-accent)"
                      stopOpacity="0.32"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--hex-obsidian)"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>
                <path
                  d="M 30 260 Q 180 180 320 240 T 480 190"
                  fill="none"
                  stroke="#2E312E"
                  strokeWidth="1.2"
                />
                <path
                  d="M 20 140 Q 200 70 350 130 T 490 90"
                  fill="none"
                  stroke="#2E312E"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="250"
                  cy="165"
                  rx="185"
                  ry="125"
                  fill="url(#copperGlow)"
                  stroke="#7F8877"
                  strokeOpacity="0.25"
                  strokeDasharray="5 5"
                />
                <ellipse
                  cx="250"
                  cy="165"
                  rx="115"
                  ry="78"
                  fill="none"
                  stroke="var(--hex-accent)"
                  strokeOpacity="0.3"
                />

                {SERVICE_AREAS_DATA.map((region) => {
                  const cx = (region.coordinatesSample.xPercent / 100) * 500;
                  const cy = (region.coordinatesSample.yPercent / 100) * 320;
                  const isSelected = region.id === activeRegion.id;
                  return (
                    <g
                      key={region.id}
                      onClick={() => setActiveRegion(region)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="24"
                          fill="var(--hex-accent)"
                          fillOpacity="0.25"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 9 : 6}
                        fill={
                          isSelected ? "var(--hex-accent)" : "var(--hex-ivory)"
                        }
                        stroke="var(--hex-obsidian)"
                        strokeWidth="2"
                      />
                      <text
                        x={cx + 14}
                        y={cy + 4}
                        fill={
                          isSelected ? "var(--hex-accent-light)" : "#E2DDD2"
                        }
                        fontSize="12"
                        fontWeight={isSelected ? "600" : "400"}
                      >
                        {region.hubCitySample}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-copperLight">
                    Selected Corridor
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ivory mt-0.5">
                    {activeRegion.regionName}
                  </h3>
                  <p className="text-xs text-ivory/70 mt-1">
                    {activeRegion.architecturalNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="btn-beveled-primary px-5 py-2.5 rounded-full text-white text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Confirm Availability ↗
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right: Corridor Cards & Communities */}
          <Reveal
            delay={0.1}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_AREAS_DATA.map((region) => {
                const isSelected = region.id === activeRegion.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    className={`p-6 rounded-3xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-obsidian text-ivory border-obsidian shadow-xl"
                        : "bg-white text-obsidian border-stone hover:border-copper"
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 ${
                        isSelected ? "text-copperLight" : "text-copper"
                      }`}
                    >
                      {region.hubCitySample}
                    </div>
                    <div className="font-display text-base font-semibold">
                      {region.regionName}
                    </div>
                    <div
                      className={`mt-2 text-xs ${
                        isSelected ? "text-ivory/70" : "text-charcoal/70"
                      }`}
                    >
                      {region.responseWindowSample}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-7 rounded-3xl bg-white border border-stone shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone">
                <h4 className="font-display text-lg font-semibold text-obsidian">
                  Supported Sample Communities — {activeRegion.hubCitySample}
                </h4>
                <span className="text-xs font-serif italic text-copper">
                  Editable Locations
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm font-medium text-obsidian">
                {activeRegion.municipalities.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="text-copper">✦</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
