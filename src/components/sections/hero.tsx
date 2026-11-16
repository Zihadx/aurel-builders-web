"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { scrollToSection } from "@/lib/utils";
import { prefersReducedMotion, registerGsapPlugins } from "@/lib/animations";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { hero } = SITE_CONFIG;
  const [activeHotspotIdx, setActiveHotspotIdx] = useState(0);
  const currentHotspot = hero.hotspots[activeHotspotIdx] || hero.hotspots[0];

  useEffect(() => {
    registerGsapPlugins();
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim-item",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: "expo.out",
        }
      );
      gsap.fromTo(
        ".hero-hotspot-pin",
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          delay: 0.45,
          ease: "back.out(1.8)",
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative -mt-20 pt-28 pb-16 lg:pt-36 lg:pb-24 dark-mesh-surface text-ivory overflow-hidden"
    >
      {/* Ambient Warm Glow */}
      <div className="absolute -top-40 right-1/4 w-[620px] h-[620px] rounded-full bg-copper/15 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-8">
        {/* Top Editorial Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 lg:mb-14">
          <div className="lg:col-span-8">
            <div className="hero-anim-item inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-copperLight" />
              <span className="text-xs font-medium tracking-wide text-ivory/85">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="hero-anim-item font-display hero-title font-semibold text-ivory">
              {hero.headlineLines[0]}
              <br />
              <span className="font-serif italic font-normal text-copperLight">
                {hero.headlineLines[1]}
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:pb-2">
            <p className="hero-anim-item text-base sm:text-lg text-ivory/75 leading-relaxed font-normal">
              {hero.subheadline}
            </p>
            <div className="hero-anim-item flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn-beveled-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{hero.primaryCta}</span>
                <span>↗</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#work")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.07] hover:bg-white/12 text-ivory border border-white/15 font-medium text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{hero.secondaryCta}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Panoramic Architectural Photography Showcase Frame with Interactive Anatomy Hotspots */}
        <div className="hero-anim-item relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-graphite">
          <div className="relative h-[460px] sm:h-[560px] lg:h-[640px] w-full">
            <Image
              src={IMAGES.heroArchitecture.url}
              alt={IMAGES.heroArchitecture.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-[1.01] transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/25 to-obsidian/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/35" />

            {/* Interactive Architectural Roof Anatomy Hotspots */}
            <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
              {hero.hotspots.map((spot, idx) => {
                const isSelected = idx === activeHotspotIdx;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotIdx(idx)}
                    style={{ top: spot.topPercent, left: spot.leftPercent }}
                    className={`hero-hotspot-pin pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-xl border text-ivory shadow-2xl cursor-pointer transition-transform hover:scale-105 ${
                      isSelected
                        ? "bg-obsidian/90 border-copperLight"
                        : "bg-obsidian/75 border-white/25 hover:border-copperLight"
                    }`}
                  >
                    <span className="relative h-3 w-3 rounded-full bg-copperLight hotspot-ring" />
                    <span className="text-[11px] font-semibold tracking-wide">
                      {spot.shortPinLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Hotspot Telemetry Readout Pill */}
            <div className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-md z-20 rounded-2xl bg-obsidian/80 backdrop-blur-2xl border border-white/15 p-4 shadow-2xl">
              <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-widest text-copperLight font-semibold">
                <span>{currentHotspot.tag}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-ivory/80">
                  Click Pins on Roof
                </span>
              </div>
              <div className="font-display text-sm sm:text-base font-semibold text-ivory mt-1">
                {currentHotspot.title}
              </div>
              <p className="text-xs text-ivory/75 mt-1 leading-relaxed">
                {currentHotspot.description}
              </p>
            </div>
          </div>

          {/* Bottom Inside-Frame Editorial Overlay Bar */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian/70 backdrop-blur-md border border-white/15 text-xs text-copperLight">
                <span>✦ Featured Residence — Standing-Seam &amp; Natural Slate</span>
              </div>
              <p className="text-sm sm:text-base text-ivory/90 font-medium">
                {hero.trustIndicator}
              </p>
            </div>

            {/* Floating Glassmorphic Protection Card */}
            <div className="w-full sm:w-auto sm:min-w-[380px] max-w-md rounded-2xl bg-obsidian/75 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-copperLight font-semibold block">
                    Architectural Guarantee
                  </span>
                  <h2 className="font-display text-lg font-semibold text-ivory mt-1">
                    {hero.floatingCard.title}
                  </h2>
                  <p className="mt-1 text-xs text-ivory/70 leading-relaxed">
                    {hero.floatingCard.subtitle}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-copper/20 border border-copper/40 flex flex-col items-center justify-center shrink-0 text-copperLight">
                  <span className="font-serif italic text-lg leading-none">
                    {hero.floatingCard.metricValue}
                  </span>
                  <span className="text-[9px] uppercase">Audit</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-ivory/75">
                  {hero.floatingCard.metricLabel}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="font-semibold text-copperLight hover:text-white transition-colors cursor-pointer"
                >
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="mt-8 flex items-center justify-between text-xs text-ivory/50">
          <span>Sample Architectural Showcase — Editable Brand Content</span>
          <button
            type="button"
            onClick={() => scrollToSection("#services")}
            className="inline-flex items-center gap-2 text-ivory/75 hover:text-copperLight transition-colors cursor-pointer"
          >
            <span>Scroll to explore our craft</span>
            <span className="animate-bounce text-copperLight">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
