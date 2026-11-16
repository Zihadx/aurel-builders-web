import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scroll to an in-page section, respecting reduced-motion, and move
 *  keyboard focus there so assistive tech follows the jump. */
export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;
  const id = href.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).__lenis;
  if (lenis && !reduce) {
    lenis.scrollTo(el, { offset: -72, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}
