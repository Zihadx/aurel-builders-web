import React from "react";
import { ShieldCheck, Compass, Layers, Award, Hammer } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

const ICON_MAP = {
  ShieldCheck,
  Compass,
  Layers,
  Award,
  Hammer,
};

export function TrustStripSection() {
  const repeatedSpecs = [
    ...SITE_CONFIG.marqueeSpecs,
    ...SITE_CONFIG.marqueeSpecs,
  ];

  return (
    <section
      aria-label="Trust and Credibility"
      className="bg-obsidian text-ivory border-t border-white/10"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {SITE_CONFIG.trustStrip.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="h-11 w-11 rounded-xl bg-copper/15 text-copperLight flex items-center justify-center shrink-0">
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-semibold text-ivory">
                    {item.title}
                  </h2>
                  <p className="text-xs text-ivory/60 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Architectural Specification Marquee Ticker */}
      <div className="border-t border-white/[0.07] bg-obsidian/90 py-3.5 overflow-hidden select-none">
        <div className="animate-marquee items-center gap-10 text-xs font-medium tracking-widest uppercase text-ivory/60">
          {repeatedSpecs.map((spec, idx) => (
            <span key={idx} className="inline-flex items-center gap-3">
              <span className="text-copperLight">✦</span>
              {spec}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
