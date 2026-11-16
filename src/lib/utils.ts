import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;
  const id = href.replace(/^#/, "");
  const element = document.getElementById(id);
  if (element) {
    const offset = 88;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}
