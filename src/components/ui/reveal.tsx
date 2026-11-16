"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsapPlugins } from "@/lib/animations";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  mode?: "spring" | "clip-curtain" | "gsap-fade";
  className?: string;
}

/**
 * Hybrid Framer Motion + GSAP ScrollTrigger Reveal Primitive
 * Combines Framer Motion spring physics with GSAP ScrollTrigger clip-path curtains.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  mode = "spring",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (mode === "spring") return;
    registerGsapPlugins();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (mode === "clip-curtain") {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 6% 12% 6% round 24px)", scale: 1.04, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            scale: 1,
            opacity: 1,
            duration: 1.2,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, y, mode]);

  if (mode === "spring") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y, scale: 0.98 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y, scale: 0.98 }
        }
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          mass: 0.9,
          delay,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
