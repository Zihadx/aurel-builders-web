"use client";

import { useState } from "react";
import { SERVICES_DATA } from "@/data/services";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";
import { PhotoFade } from "@/components/ui/photo-fade";
import { useEstimate } from "@/lib/estimate-context";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id);
  const { setService } = useEstimate();
  const active = SERVICES_DATA.find((s) => s.id === activeId) ?? SERVICES_DATA[0];

  return (
    <section id="services" aria-labelledby="services-title" className="section bg-chalk">
      <div className="wrap">
        <SectionHeader id="services-title" eyebrow="Services" title={"Six services, one standard of work."} intro={"From a single leak to a full tear-off, each job follows the same process: inspect, document, scope, build, walk through."} tone="light" />

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
                    <span className="shrink-0 text-right">
                      <span className={cn("block text-[0.9375rem] font-semibold transition-colors", selected ? "text-patina" : "text-ink")}>{s.from}</span>
                      <span className="t-meta block text-lead">{s.timeline}</span>
                    </span>
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

              <dl className="mt-6 grid grid-cols-2 gap-6 text-[0.9375rem]">
                <div>
                  <dt className="text-lead">Starting at</dt>
                  <dd className="mt-0.5 font-semibold">{active.from}</dd>
                </div>
                <div>
                  <dt className="text-lead">Typical timeline</dt>
                  <dd className="mt-0.5 font-semibold">{active.timeline}</dd>
                </div>
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
