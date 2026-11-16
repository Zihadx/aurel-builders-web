"use client";

import { useState } from "react";
import { PROJECTS_DATA } from "@/data/projects";
import dynamic from "next/dynamic";
import { FadeUp, WordsReveal } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RoofCompare = dynamic(() => import("@/components/graphics/roof-compare"), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full animate-pulse bg-deeper sm:aspect-[16/10]" />,
});

export function WorkSection() {
  const [activeId, setActiveId] = useState(PROJECTS_DATA[0].id);
  const project = PROJECTS_DATA.find((p) => p.id === activeId) ?? PROJECTS_DATA[0];

  return (
    <section id="work" aria-labelledby="work-title" className="section on-deep bg-deep text-chalk">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <WordsReveal id="work-title" className="t-h2 lg:col-span-7" text="Recent projects, start to finish." />
          <FadeUp className="lg:col-span-5 lg:pt-2">
            <p className="t-body text-mist">
              Drag the divider across each house to see the old roof and the new one. Sample projects, with the problem we found, what we built and how long it took.
            </p>
          </FadeUp>
        </div>

        <div role="tablist" aria-label="Projects" className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-rule-deep">
          {PROJECTS_DATA.map((p) => {
            const selected = p.id === activeId;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(p.id)}
                onKeyDown={(e) => {
                  const i = PROJECTS_DATA.findIndex((x) => x.id === p.id);
                  const n = PROJECTS_DATA.length;
                  const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
                  if (next >= 0) {
                    e.preventDefault();
                    setActiveId(PROJECTS_DATA[next].id);
                    document.getElementById(`tab-${PROJECTS_DATA[next].id}`)?.focus();
                  }
                }}
                className={cn(
                  "-mb-px cursor-pointer border-b-2 py-4 text-[0.9375rem] font-medium transition-colors",
                  selected ? "border-patina-hi text-chalk" : "border-transparent text-mist hover:text-chalk"
                )}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${project.id}`} aria-labelledby={`tab-${project.id}`} className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <RoofCompare
              key={project.id}
              before={project.before}
              after={project.after}
              beforeLabel={project.beforeLabel}
              afterLabel={project.afterLabel}
              label={`Before and after 3D comparison: ${project.title}. Drag or use arrow keys.`}
            />
            <p className="t-meta mt-3 text-mist">Drag the divider, or use the arrow keys, to compare the same house before and after.</p>
          </div>

          <div className="lg:col-span-4">
            <p className="t-label text-patina-hi">
              {project.category} · {project.location}
            </p>
            <h3 className="t-h3 mt-2">{project.title}</h3>
            <p className="t-body mt-4 text-mist">{project.summary}</p>
            <dl className="mt-6 divide-y divide-rule-deep border-y border-rule-deep text-[0.9375rem]">
              {[
                ["System", project.system],
                ["Roof", project.footprint],
                ["Build time", project.duration],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                  <dt className="text-mist">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Button href="#contact" variant="outline-deep">
                Ask about a similar roof
              </Button>
            </div>
          </div>

          <div className="grid gap-8 border-t border-rule-deep pt-8 sm:grid-cols-2 lg:col-span-12">
            <div>
              <h4 className="t-label text-mist">The problem</h4>
              <p className="t-body mt-2">{project.challenge}</p>
            </div>
            <div>
              <h4 className="t-label text-mist">What we did</h4>
              <p className="t-body mt-2">{project.resolution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
