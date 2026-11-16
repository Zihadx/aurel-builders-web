"use client";

import React, { useState } from "react";
import { PROJECTS_DATA } from "@/data/projects";
import { IMAGES } from "@/data/images";
import { ProjectItem } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImageComparison } from "@/components/ui/image-comparison";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { scrollToSection } from "@/lib/utils";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(
    PROJECTS_DATA[0]
  );

  const beforeImg =
    IMAGES[selectedProject.beforeImageKey] || IMAGES.project1Before;
  const afterImg =
    IMAGES[selectedProject.afterImageKey] || IMAGES.project1After;

  return (
    <section
      id="work"
      className="py-24 lg:py-32 dark-mesh-surface text-ivory"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <SectionHeading
          label="Our Work"
          heading="Real Transformations."
          serifAccent="Lasting Results."
          description="Drag the comparison handle across the photograph to inspect distinct before-and-after sample transformations."
          theme="dark"
          align="split"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Interactive Comparison Canvas */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal mode="clip-curtain">
              <ImageComparison
                beforeUrl={beforeImg.url}
                beforeAlt={beforeImg.alt}
                afterUrl={afterImg.url}
                afterAlt={afterImg.alt}
                beforeLabel={selectedProject.beforeLabel}
                afterLabel={selectedProject.afterLabel}
              />
            </Reveal>

            {/* Selected Project Editorial Story Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-graphite/80 border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-medium text-copperLight">
                    {selectedProject.category} • {selectedProject.yearSample}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-ivory mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="btn-beveled-primary px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide cursor-pointer"
                >
                  Inquire About Similar Scope ↗
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-obsidian/60 border border-white/[0.07]">
                  <div className="text-ivory/50 mb-1">District (Editable)</div>
                  <div className="text-ivory font-medium text-sm">
                    {selectedProject.locationSample}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian/60 border border-white/[0.07]">
                  <div className="text-ivory/50 mb-1">Roof Footprint</div>
                  <div className="text-ivory font-medium text-sm">
                    {selectedProject.squareFootageSample}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian/60 border border-white/[0.07]">
                  <div className="text-ivory/50 mb-1">Project Timeline</div>
                  <div className="text-ivory font-medium text-sm">
                    Completed in {selectedProject.completionDurationSample}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div>
                  <h4 className="font-serif italic text-lg text-copperLight mb-1.5">
                    Previous Condition
                  </h4>
                  <p className="text-sm text-ivory/75 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-serif italic text-lg text-copperLight mb-1.5">
                    Architectural Resolution
                  </h4>
                  <p className="text-sm text-ivory/75 leading-relaxed">
                    {selectedProject.resolution}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Curated Case Study Switcher */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-ivory/60 px-1 pb-1">
              <span>Select a Sample Portfolio Transformation</span>
              <span className="text-copperLight font-serif italic text-sm">
                {PROJECTS_DATA.length} Case Studies
              </span>
            </div>
            {PROJECTS_DATA.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={project.id === selectedProject.id}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
