"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SERVICES_DATA } from "@/data/services";
import { SERVICE_AREAS_DATA } from "@/data/service-areas";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="bg-obsidian text-ivory border-t border-white/10">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8 pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-copper/20 border border-copper/50 flex items-center justify-center">
                <svg viewBox="0 0 36 36" fill="none" className="h-5 w-5">
                  <path
                    d="M5 24L18 10L31 24"
                    stroke="var(--hex-accent)"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M11 24L18 16.5L25 24"
                    stroke="var(--hex-ivory)"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold tracking-[0.14em] text-ivory">
                  {SITE_CONFIG.shortName}
                </span>
                <span className="font-serif italic text-sm text-copperLight">
                  Roofing Co.
                </span>
              </div>
            </div>
            <p className="text-sm text-ivory/65 leading-relaxed max-w-sm">
              Architectural roofing systems, precision leak remediation, storm
              restoration, and custom exterior envelopes crafted for lasting
              residential protection.
            </p>
            <div className="text-xs text-ivory/75 space-y-1.5">
              <div>Direct Desk: {SITE_CONFIG.contact.phoneDisplay}</div>
              <div>Email: {SITE_CONFIG.contact.email}</div>
              <div>{SITE_CONFIG.contact.headquartersSample}</div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-copperLight mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-copperLight mb-4">
              Craft &amp; Services
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#services");
                    }}
                    className="hover:text-copperLight"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-copperLight">
              Sample Service Corridors
            </h3>
            <ul className="space-y-2 text-xs text-ivory/65">
              {SERVICE_AREAS_DATA.map((r) => (
                <li key={r.id} className="flex justify-between">
                  <span>{r.hubCitySample}</span>
                  <span className="font-serif italic text-copperLight">
                    Sample
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ivory/55">
          <p>{SITE_CONFIG.legalNote}</p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="underline hover:text-copperLight cursor-pointer"
            >
              Privacy Policy (Sample)
            </button>
            <button
              type="button"
              onClick={() => setLegalModal("terms")}
              className="underline hover:text-copperLight cursor-pointer"
            >
              Terms (Sample)
            </button>
          </div>
        </div>
      </div>

      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-lg w-full rounded-3xl bg-graphite border border-white/15 p-7 sm:p-9 text-ivory shadow-2xl">
            <h4 className="font-display text-xl font-semibold mb-3">
              {legalModal === "privacy"
                ? "Privacy Policy Placeholder"
                : "Terms of Service Placeholder"}
            </h4>
            <p className="text-sm text-ivory/75 leading-relaxed mb-6">
              This is an editable legal policy placeholder for{" "}
              <strong>{SITE_CONFIG.companyName}</strong>. Before deploying this
              website for commercial lead generation, replace this notice with
              your company&apos;s verified privacy policy and state contractor
              licensing terms in{" "}
              <code className="text-copperLight">src/data/site.ts</code>.
            </p>
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="px-6 py-2.5 rounded-full bg-copper text-white text-xs font-semibold cursor-pointer"
            >
              Close Notice
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
