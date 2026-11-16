"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

export function FinalCtaSection() {
  const { finalCta, contact } = SITE_CONFIG;

  return (
    <section className="py-16 lg:py-24 bg-ivory px-4 sm:px-8">
      <Reveal>
        <div className="mx-auto max-w-[1380px] relative rounded-[32px] overflow-hidden bg-obsidian text-ivory shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0">
            <Image
              src={IMAGES.finalCtaBackdrop.url}
              alt={IMAGES.finalCtaBackdrop.alt}
              fill
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/60" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-copperLight">
              ✦ {finalCta.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.03] text-ivory">
              Your Home Deserves a{" "}
              <span className="font-serif italic font-normal text-copperLight">
                Stronger Roof.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-ivory/80 leading-relaxed max-w-2xl">
              {finalCta.supportingCopy}
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn-beveled-primary inline-flex items-center gap-3 h-14 px-8 rounded-full text-white font-semibold text-sm md:text-base cursor-pointer"
              >
                <span>{finalCta.primaryCta}</span>
                <span>↗</span>
              </button>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-white/10 hover:bg-white/15 text-ivory border border-white/20 font-semibold text-sm md:text-base"
              >
                <span>
                  {finalCta.secondaryCta}: {contact.phoneDisplay}
                </span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
