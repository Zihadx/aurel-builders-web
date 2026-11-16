"use client";

import React, { useEffect } from "react";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site";
import { scrollToSection } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => scrollToSection(href), 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-y-3 right-3 w-[calc(100%-1.5rem)] max-w-sm rounded-3xl bg-obsidian border border-white/10 p-7 flex flex-col justify-between overflow-y-auto shadow-2xl text-ivory">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="font-display text-lg font-bold tracking-widest block">
                {SITE_CONFIG.shortName}
              </span>
              <span className="font-serif italic text-sm text-copperLight">
                Architectural Roofing
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-ivory hover:bg-copper cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="mt-7 space-y-1.5">
            {NAVIGATION_LINKS.map((item, idx) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl text-left font-display text-lg font-medium text-ivory hover:bg-white/5 cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="font-serif italic text-copperLight">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 space-y-1">
            <div className="text-xs text-copperLight font-medium">
              Direct Architectural Desk
            </div>
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="block font-display text-lg font-semibold text-ivory"
            >
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="block text-xs text-ivory/60"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </div>
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="btn-beveled-primary w-full h-12 rounded-full text-white font-semibold text-sm cursor-pointer"
          >
            Get Your Free Estimate ↗
          </button>
        </div>
      </div>
    </div>
  );
}
