"use client";

import React, { useEffect, useState } from "react";
import { registerGsapPlugins, prefersReducedMotion } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    registerGsapPlugins();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    if (prefersReducedMotion()) {
      gsap.globalTimeline.timeScale(10);
      return () => window.removeEventListener("scroll", onScroll);
    }

    const ctx = gsap.context(() => {
      // 1. Scrubbed Vertical Photo Parallax on Hero & About Images
      document.querySelectorAll("#home img, #about img").forEach((img) => {
        gsap.to(img, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      // 2. Animated Counter Roll-Up on About Section Metrics (1,400+, 99.4%, 48 hrs)
      document
        .querySelectorAll("#about .font-serif.text-5xl")
        .forEach((span) => {
          const raw = (span.textContent || "").trim();
          const numMatch = raw.match(/([0-9,.]+)/);
          if (!numMatch) return;
          const targetVal = parseFloat(numMatch[1].replace(/,/g, ""));
          const suffix = raw.replace(numMatch[1], "");
          const isDecimal = numMatch[1].includes(".");
          const hasComma = numMatch[1].includes(",");

          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: targetVal,
            duration: 2.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: span,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              let formatted = isDecimal
                ? counterObj.val.toFixed(1)
                : Math.round(counterObj.val).toString();
              if (hasComma && !isDecimal) {
                formatted = Math.round(counterObj.val).toLocaleString();
              }
              span.textContent = formatted + suffix;
            },
          });
        });

      // 3. Interactive Magnetic Cursor Pull Physics on Primary Buttons
      const magneticButtons = document.querySelectorAll(
        ".btn-beveled-primary, .btn-magnetic"
      );
      magneticButtons.forEach((btn) => {
        const el = btn as HTMLElement;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, {
            x: relX * 0.22,
            y: relY * 0.28,
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
          });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-[3px] z-[100] btn-beveled-primary transition-[width] duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />
      {children}
    </>
  );
}
