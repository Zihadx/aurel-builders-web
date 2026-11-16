"use client";

import { useState } from "react";
import { SERVICE_AREAS_DATA } from "@/data/service-areas";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function ServiceAreasSection() {
  const [activeId, setActiveId] = useState(SERVICE_AREAS_DATA[0].id);
  const active = SERVICE_AREAS_DATA.find((r) => r.id === activeId) ?? SERVICE_AREAS_DATA[0];

  return (
    <section id="areas" aria-labelledby="areas-title" className="section bg-chalk">
      <div className="wrap">
        <SectionHeader id="areas-title" eyebrow="Service areas" title={"Where we work, and how quickly we get there."} intro={"Choose a region to see typical inspection response times and the neighborhoods we cover."} tone="light" />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Schematic map */}
          <div className="sheet border border-ink/80 lg:col-span-7">
            <svg
              viewBox="0 0 500 340"
              className="block h-auto w-full text-ink"
              role="group"
              aria-label="Schematic map of service regions"
              fill="none"
              stroke="currentColor"
            >
              {/* roads / river as simple structure lines */}
              <path d="M0 250C120 190 230 270 350 215S470 190 500 200" strokeOpacity={0.35} strokeWidth={1.2} />
              <path d="M0 110C110 70 220 140 330 100S450 60 500 80" strokeOpacity={0.35} strokeWidth={1.2} />
              <path d="M240 0C250 90 230 170 250 340" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="4 5" />
              <ellipse cx="250" cy="170" rx="190" ry="130" strokeOpacity={0.3} strokeDasharray="3 5" />

              {SERVICE_AREAS_DATA.map((r) => {
                const cx = (r.x / 100) * 500;
                const cy = (r.y / 100) * 340;
                const selected = r.id === activeId;
                return (
                  <g key={r.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={selected ? 10 : 7}
                      className="transition-all duration-300"
                      fill={selected ? "var(--color-patina)" : "var(--color-chalk)"}
                      stroke={selected ? "var(--color-patina)" : "currentColor"}
                      strokeWidth={1.6}
                    />
                    <text
                      x={cx + 16}
                      y={cy + 4}
                      fontSize="13"
                      fontFamily="var(--font-sans)"
                      fontWeight={selected ? 600 : 500}
                      fill="currentColor"
                      stroke="none"
                    >
                      {r.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-5">
            <div role="tablist" aria-label="Service regions" className="flex flex-wrap gap-2">
              {SERVICE_AREAS_DATA.map((r) => {
                const selected = r.id === activeId;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={selected}
                    aria-controls="area-panel"
                    id={`area-${r.id}`}
                    onClick={() => setActiveId(r.id)}
                    className={cn(
                      "h-10 cursor-pointer rounded-[2px] border px-4 text-[0.9375rem] font-medium transition-colors",
                      selected
                        ? "border-ink bg-ink text-chalk"
                        : "border-rule text-ink hover:border-ink"
                    )}
                  >
                    {r.name}
                  </button>
                );
              })}
            </div>

            <div id="area-panel" role="tabpanel" aria-labelledby={`area-${active.id}`} className="mt-8">
              <h3 className="t-h3">{active.hub}</h3>
              <p className="mt-2 text-[0.9375rem] font-medium text-patina">{active.response}</p>
              <p className="t-body mt-4 text-lead">{active.note}</p>

              <h4 className="mt-8 t-label text-lead">Neighborhoods</h4>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 border-t border-rule">
                {active.municipalities.map((m) => (
                  <li key={m} className="border-b border-rule py-2.5 text-[0.9375rem]">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
