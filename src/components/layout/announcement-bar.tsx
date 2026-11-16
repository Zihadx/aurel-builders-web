"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { ThemeId } from "@/types";
import { scrollToSection } from "@/lib/utils";

const THEME_OPTIONS: Array<{
  id: ThemeId;
  title: string;
  gradientClass: string;
}> = [
  {
    id: "royal-gold",
    title: "Combo 1: Architectural Slate Carbon, Limestone & Copper-Bronze",
    gradientClass: "from-[#0A0D12] via-[#C87D4B] to-[#2E6F65]",
  },
  {
    id: "cobalt-slate",
    title: "Combo 2: Nordic Titanium, Klein Cobalt Blue & Champagne Brass",
    gradientClass: "from-[#080D17] via-[#2563EB] to-[#D4A853]",
  },
  {
    id: "emerald-bronze",
    title: "Combo 3: Alpine Obsidian Pine, Burnished Terracotta & Eucalyptus",
    gradientClass: "from-[#09120F] via-[#D95D39] to-[#4E6E5D]",
  },
  {
    id: "onyx-terracotta",
    title: "Combo 4: Swiss Monochrome Carbon & International Orange",
    gradientClass: "from-[#0B0B0C] via-[#FF4400] to-[#52525B]",
  },
];

export function AnnouncementBar() {
  const { announcement } = SITE_CONFIG;
  const [activeTheme, setActiveTheme] = useState<ThemeId>("royal-gold");

  const handleSelectTheme = (theme: ThemeId) => {
    setActiveTheme(theme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  return (
    <div className="relative z-50 bg-obsidian text-ivory/90 border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-copper/20 text-copperLight font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-copperLight animate-pulse" />
            {announcement.badge}
          </span>
          <p className="text-ivory/80 font-normal">{announcement.text}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Live Multi-Color Combination Switcher */}
          <div
            className="flex items-center gap-2 bg-white/[0.08] border border-white/15 rounded-full px-3.5 py-1"
            role="group"
            aria-label="Theme Color Palette Switcher"
          >
            <span className="text-[11px] font-semibold text-ivory/90 mr-1">
              Color Combo:
            </span>
            {THEME_OPTIONS.map((t) => {
              const isSelected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  title={t.title}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`h-4 w-4 rounded-full bg-gradient-to-tr ${
                    t.gradientClass
                  } transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-white scale-110 opacity-100"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  aria-label={t.title}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection(announcement.ctaHref)}
            className="inline-flex items-center gap-1.5 font-medium text-copperLight hover:text-white transition-colors cursor-pointer group"
          >
            <span>{announcement.ctaLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
