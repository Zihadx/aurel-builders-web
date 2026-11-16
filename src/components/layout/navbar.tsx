"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { scrollToSection } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-3 z-40 mx-auto max-w-[1380px] px-4 sm:px-8 transition-all duration-500"
      >
        <div className="rounded-full bg-obsidian/85 backdrop-blur-2xl border border-white/10 px-5 sm:px-7 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center justify-between gap-4">
          {/* Sculptural Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="group flex items-center gap-3.5 focus:outline-none"
          >
            <div className="h-9 w-9 rounded-full bg-copper/15 border border-copper/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M5 24L18 10L31 24"
                  stroke="var(--hex-accent)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 24L18 16.5L25 24"
                  stroke="var(--hex-ivory)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold tracking-[0.14em] text-ivory">
                {SITE_CONFIG.shortName}
              </span>
              <span className="hidden sm:inline-block font-serif italic text-sm text-copperLight">
                Roofing Atelier
              </span>
            </div>
          </a>

          {/* Center Editorial Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary Navigation"
          >
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-xs font-medium tracking-wide text-ivory/75 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Direct Call & Pill CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-2 text-xs font-medium text-ivory/85 hover:text-copperLight transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              <Phone className="h-3.5 w-3.5 text-copperLight" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="btn-beveled-primary inline-flex items-center gap-2 h-10 px-5 rounded-full text-white text-xs font-semibold tracking-wide transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get Free Estimate</span>
              <span>↗</span>
            </button>
          </div>

          {/* Mobile Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-copperLight"
              aria-label="Call team"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="h-9 px-3.5 rounded-full bg-white/10 text-xs font-medium text-ivory hover:bg-white/20 cursor-pointer"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
