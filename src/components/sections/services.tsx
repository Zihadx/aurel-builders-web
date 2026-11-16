"use client";

import { useState } from "react";
import { SERVICES_DATA } from "@/data/services";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";
import { PhotoFade } from "@/components/ui/photo-fade";
import { WordsReveal } from "@/components/ui/motion";
import { useEstimate } from "@/lib/estimate-context";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id);
  const { setService } = useEstimate();
  const active = SERVICES_DATA.find((s) => s.id === activeId) ?? SERVICES_DATA[0];

  return (
    <section id="services" aria-labelledby="services-title" className="section bg-chalk">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <WordsReveal id="services-title" className="t-h2 lg:col-span-7" text={"Six services, one standard of work."} />
          <p className="t-body text-lead lg:col-span-5 lg:pt-2">
            From a single leak to a full tear-off, each job follows the same
            process: inspect, document, scope, build, walk through.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <ul className="border-t border-ink lg:col-span-6" role="list">
            {SERVICES_DATA.map((s) => {
              const selected = s.id === activeId;
              return (
                <li key={s.id} className="border-b border-rule">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(s.id)}
                    className="group flex w-full cursor-pointer items-baseline justify-between gap-6 py-5 text-left"
                  >
                    <span>
                      <span
                        className={cn(
                          "t-h3 block transition-colors duration-200",
                          selected ? "text-patina" : "text-ink group-hover:text-patina"
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="t-meta mt-1 block text-lead">{s.summary}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px w-8 shrink-0 origin-right bg-patina transition-transform duration-300 ease-[var(--ease-out)]",
                        selected ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail panel — on large screens it stays in view while the list is browsed */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28" aria-live="polite">
              <PhotoFade image={IMAGES[active.image]} sizes="(max-width:1024px) 100vw, 45vw" className="mb-8 aspect-[16/9] w-full" />
              <h3 className="t-h3">{active.title}</h3>
              <p className="t-body mt-4 text-ink">{active.description}</p>

              <h4 className="mt-8 t-label text-lead">What’s included</h4>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {active.includes.map((item) => (
                  <li key={item} className="py-3 text-[0.9375rem]">
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 flex items-baseline gap-3 text-[0.9375rem]">
                <dt className="text-lead">Typical timeline</dt>
                <dd className="font-semibold">{active.timeline}</dd>
              </dl>

              <div className="mt-8">
                <Button href="#contact" onClick={() => setService(active.formValue)}>
                  Request a {active.title.toLowerCase()} estimate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
