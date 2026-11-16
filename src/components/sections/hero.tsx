"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { FadeUp, Parallax, WordsReveal } from "@/components/ui/motion";
import { RoofViewer } from "@/components/graphics/roof-viewer";
import { cn } from "@/lib/utils";
import type { RoofPart } from "@/types";

export function HeroSection() {
  const { hero } = SITE_CONFIG;
  const [activeId, setActiveId] = useState<RoofPart["id"]>(hero.parts[0].id);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="on-deep relative isolate -mt-16 overflow-hidden bg-deeper text-chalk lg:-mt-[4.5rem]"
    >
      {/* Photograph, graded into the palette and drifting slowly on scroll */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Parallax className="h-full w-full" distance={50}>
          <Photo image={IMAGES.hero} sizes="100vw" priority className="h-full w-full" imgClassName="opacity-60 saturate-[0.7]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-deeper via-deeper/85 to-deeper/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-deeper via-transparent to-deeper/60" />
      </div>

      <div className="wrap grid items-center gap-8 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-32">
        <div className="lg:col-span-5">
          <WordsReveal as="h1" id="hero-title" text={hero.headline} className="t-display text-chalk" delay={0.15} />
          <FadeUp delay={0.7}>
            <p className="t-lede mt-6 text-mist">{hero.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book" size="lg">
                {hero.primaryCta}
              </Button>
              <Button href="#work" variant="outline-deep" size="lg">
                {hero.secondaryCta}
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.9} className="mt-10 hidden lg:block">
            <PartList parts={hero.parts} activeId={activeId} onSelect={setActiveId} />
          </FadeUp>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[380px] sm:h-[480px] lg:h-[min(760px,calc(100svh-8rem))]">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(42_114_98/0.35),transparent)] blur-2xl"
            />
            <RoofViewer activeId={activeId} onSelect={setActiveId} />
            <p className="t-meta pointer-events-none absolute bottom-1 left-1 text-mist">
              Drag to rotate · Select a layer to take it apart
            </p>
          </div>
          <FadeUp className="mt-6 lg:hidden">
            <PartList parts={hero.parts} activeId={activeId} onSelect={setActiveId} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function PartList({
  parts,
  activeId,
  onSelect,
}: {
  parts: RoofPart[];
  activeId: RoofPart["id"];
  onSelect: (id: RoofPart["id"]) => void;
}) {
  return (
    <div>
      <h2 className="t-label mb-2 text-mist">What’s under the surface</h2>
      <ol className="divide-y divide-rule-deep border-y border-rule-deep">
        {parts.map((part, i) => {
          const selected = part.id === activeId;
          return (
            <li key={part.id}>
              <button
                type="button"
                aria-expanded={selected}
                onClick={() => onSelect(part.id)}
                className="flex w-full cursor-pointer items-start gap-4 py-3.5 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.8125rem] font-semibold transition-colors duration-300",
                    selected ? "border-patina-hi bg-patina-hi text-deep" : "border-mist text-mist"
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-[0.9375rem] font-medium transition-colors", selected ? "text-chalk" : "text-mist")}>
                    {part.title}
                  </span>
                  <span className="rows" data-open={selected}>
                    <span className="block">
                      <span className="t-body mt-2 block text-[0.9375rem] leading-[1.6] text-mist">{part.description}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
