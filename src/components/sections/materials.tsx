"use client";

import { useId, useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { PhotoFade } from "@/components/ui/photo-fade";
import { Button } from "@/components/ui/button";
import { useEstimate } from "@/lib/estimate-context";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const PITCHES = [
  { label: "Standard (4:12 to 6:12)", value: "Standard pitch (4:12 to 6:12)", extraDays: 0, factor: 1 },
  { label: "Steep gable (7:12 to 9:12)", value: "Steep gable (7:12 to 9:12)", extraDays: 1, factor: 1.12 },
  { label: "Complex, multi-valley (10:12+)", value: "Complex multi-valley (10:12+)", extraDays: 2, factor: 1.28 },
];

const usd = (n: number) => `$${(Math.round(n / 100) * 100).toLocaleString("en-US")}`;

export function MaterialsSection() {
  const { materials } = SITE_CONFIG;
  const { setScope, setService } = useEstimate();
  const sizeId = useId();
  const pitchId = useId();

  const [activeIdx, setActiveIdx] = useState(0);
  const [sqft, setSqft] = useState(3400);
  const [pitchIdx, setPitchIdx] = useState(0);

  const material = materials.items[activeIdx];
  const pitch = PITCHES[pitchIdx];

  const squares = Math.round(sqft / 100);
  const minDays = Math.max(2, Math.round(sqft / 1200)) + pitch.extraDays;
  const low = squares * material.priceSquare[0] * pitch.factor;
  const high = squares * material.priceSquare[1] * pitch.factor;
  const monthly = Math.round(low / 120 / 5) * 5; // MOCK sample financing: ~10 years

  const sendToForm = () => {
    setService("Roof Replacement");
    setScope(
      `Configured scope: about ${sqft.toLocaleString()} sq ft (${squares} squares). Material: ${material.title}. Roof pitch: ${pitch.value}. Indicative range shown: ${usd(low)} to ${usd(high)}. Please schedule a free 45-point inspection.`
    );
  };

  return (
    <section id="materials" aria-labelledby="materials-title" className="section on-deep bg-deep text-chalk">
      <div className="wrap">
        <SectionHeader id="materials-title" eyebrow="Materials and pricing" title={materials.heading} intro={"Each material has its own fastening rules, underlayment and ventilation needs. Pick one, size your roof, and see a typical installed price range straight away."} tone="dark" />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Controls */}
          <div className="space-y-10 lg:col-span-5">
            <fieldset>
              <legend className="t-label mb-3 text-mist">Material</legend>
              <div className="border-t border-rule-deep">
                {materials.items.map((m, i) => {
                  const selected = i === activeIdx;
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-start justify-between gap-4 border-b border-rule-deep py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-patina-hi",
                        selected ? "text-chalk" : "text-mist hover:text-chalk"
                      )}
                    >
                      <input
                        type="radio"
                        name="material"
                        className="sr-only"
                        checked={selected}
                        onChange={() => setActiveIdx(i)}
                      />
                      <span className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-1.5 h-3 w-3 shrink-0 rounded-full border",
                            selected ? "border-patina-hi bg-patina-hi" : "border-mist"
                          )}
                        />
                        <span>
                          <span className="t-h3 block">{m.title}</span>
                          <span className="t-meta mt-1 block text-mist">{m.subtitle}</span>
                        </span>
                      </span>
                      <span className="t-meta shrink-0 pt-1 text-patina-hi">{m.lifespan}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor={sizeId} className="t-label text-mist">
                  Roof size
                </label>
                <output htmlFor={sizeId} className="font-sans text-lg font-semibold">
                  {sqft.toLocaleString()} sq ft
                </output>
              </div>
              <input
                id={sizeId}
                type="range"
                min={1200}
                max={8000}
                step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="range mt-4"
                aria-valuetext={`${sqft.toLocaleString()} square feet`}
              />
            </div>

            <div>
              <label htmlFor={pitchId} className="t-label text-mist">
                Roof pitch
              </label>
              <select
                id={pitchId}
                value={pitchIdx}
                onChange={(e) => setPitchIdx(Number(e.target.value))}
                className="mt-2 h-12 w-full cursor-pointer rounded-[2px] border border-rule-deep bg-deep px-3 text-[0.9375rem] text-chalk"
              >
                {PITCHES.map((p, i) => (
                  <option key={p.label} value={i}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-7">
            <div className="relative">
              <PhotoFade image={IMAGES[material.image]} sizes="(max-width:1024px) 100vw, 55vw" className="aspect-[2/1] w-full" />
              <p className="t-meta absolute bottom-0 left-0 bg-deep px-4 py-2 text-chalk">{material.title}</p>
            </div>

            <div
              className="mt-6 border border-rule-deep p-6 sm:p-8"
              aria-live="polite"
            >
              <p className="t-label text-mist">Your estimate at a glance</p>
              <p className="mt-3 font-sans text-3xl font-semibold tabular-nums [font-stretch:108%] sm:text-4xl">
                {usd(low)} – {usd(high)}
              </p>
              <p className="t-meta mt-2 text-patina-hi">Financing from about {usd(monthly)} a month (sample terms)</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-rule-deep pt-5 text-[0.9375rem]">
                <div><dt className="t-meta text-mist">Roof size</dt><dd className="mt-0.5 font-medium">{squares} squares</dd></div>
                <div><dt className="t-meta text-mist">Build time</dt><dd className="mt-0.5 font-medium">{minDays}–{minDays + 1} days</dd></div>
                <div><dt className="t-meta text-mist">Crew</dt><dd className="mt-0.5 font-medium">{sqft > 4500 ? "8 + director" : "6 + director"}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="#contact" onClick={sendToForm} size="lg">
                  Get an exact quote for this roof
                </Button>
              </div>
              <p className="t-meta mt-5 max-w-[60ch] text-mist">{materials.note}</p>
            </div>
            <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {[
                ["Wind and impact", material.wind],
                ["Underlayment", material.underlayment],
                ["Thermal behavior", material.thermal],
                ["Typical lifespan", material.lifespan],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-rule-deep pt-3">
                  <dt className="t-meta text-mist">{k}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium">{v}</dd>
                </div>
              ))}
            </dl>

          </div>
        </div>
      </div>
    </section>
  );
}
