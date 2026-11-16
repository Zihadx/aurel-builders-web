"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { INSPECTION_GROUPS } from "@/data/inspection";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shows exactly what the free inspection covers, 45 points in five groups. */
export function InspectionSection() {
  const [activeId, setActiveId] = useState(INSPECTION_GROUPS[0].id);
  const reduce = useReducedMotion();
  const group = INSPECTION_GROUPS.find((g) => g.id === activeId) ?? INSPECTION_GROUPS[0];
  const offset = INSPECTION_GROUPS.slice(0, INSPECTION_GROUPS.indexOf(group)).reduce((n, g) => n + g.points.length, 0);

  return (
    <section id="inspection" aria-labelledby="inspection-title" className="section bg-chalk">
      <div className="wrap">
        <SectionHeader
          id="inspection-title"
          eyebrow="The free inspection"
          title="Forty-five checks. Nothing skipped."
          intro="Every inspection follows the same written checklist, so you always know what was looked at, and what wasn't needed."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div role="tablist" aria-label="Inspection areas" className="border-t border-ink lg:col-span-4">
            {INSPECTION_GROUPS.map((g, i) => {
              const selected = g.id === activeId;
              return (
                <button
                  key={g.id}
                  role="tab"
                  id={`insp-${g.id}`}
                  aria-selected={selected}
                  aria-controls="insp-panel"
                  onClick={() => setActiveId(g.id)}
                  className="group flex w-full cursor-pointer items-baseline gap-4 border-b border-rule py-5 text-left"
                >
                  <span className={cn("w-6 text-[0.8125rem] tabular-nums transition-colors", selected ? "text-patina" : "text-lead")}>0{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("t-h3 block transition-colors", selected ? "text-patina" : "group-hover:text-patina")}>{g.title}</span>
                    <span className="t-meta mt-1 block text-lead">{g.summary}</span>
                  </span>
                  <span className="t-meta shrink-0 text-lead">{g.points.length} checks</span>
                </button>
              );
            })}
          </div>

          <div id="insp-panel" role="tabpanel" aria-labelledby={`insp-${group.id}`} className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ol
                key={group.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-10"
              >
                {group.points.map((pt, i) => (
                  <li key={pt} className="flex items-baseline gap-4 border-b border-rule py-3.5 text-[0.9375rem]">
                    <span className="w-7 shrink-0 text-[0.8125rem] tabular-nums text-patina">{String(offset + i + 1).padStart(2, "0")}</span>
                    {pt}
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/book">Book this inspection, free</Button>
              <p className="t-meta text-lead">Takes 60 to 90 minutes. You get the photos and the written report.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
