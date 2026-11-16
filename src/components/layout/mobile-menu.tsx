"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onHome: boolean;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu({ isOpen, onClose, onHome }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Keep Tab inside the dialog
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-deep fixed inset-0 z-50 flex flex-col bg-deep text-chalk lg:hidden"
    >
      <div className="wrap flex h-16 items-center justify-between">
        <span className="font-sans text-lg font-semibold tracking-[0.04em] [font-stretch:115%]">
          {SITE_CONFIG.shortName}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Primary" className="wrap flex-1 overflow-y-auto pt-6">
        <ul className="divide-y divide-rule-deep border-y border-rule-deep">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={onHome ? link.href : `/${link.href}`}
                onClick={(e) => {
                  onClose();
                  if (onHome) {
                    e.preventDefault();
                    setTimeout(() => scrollToSection(link.href), 60);
                  }
                }}
                className="t-h3 block py-5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap space-y-4 pb-8 pt-6">
        <Button href="/book" size="lg" className="w-full" onClick={onClose}>
          Book a free inspection
        </Button>
        <Button href={whatsappUrl()} variant="outline-deep" size="lg" className="w-full">
          Chat on WhatsApp
        </Button>
        <a
          href={SITE_CONFIG.contact.phoneHref}
          className="block text-center text-[0.9375rem] text-mist"
        >
          Or call {SITE_CONFIG.contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
