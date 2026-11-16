"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  heading: string;
  serifAccent?: string;
  description?: string;
  theme?: "dark" | "light";
  align?: "left" | "split";
  className?: string;
}

export function SectionHeading({
  label,
  heading,
  serifAccent,
  description,
  theme = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const words = heading.split(" ");

  const renderAnimatedWords = () => (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-1 mr-[0.26em]"
        >
          <motion.span
            initial={{ y: "110%", rotateZ: 2.5, opacity: 0 }}
            whileInView={{ y: "0%", rotateZ: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.85,
              delay: i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
      {serifAccent && (
        <span className="inline-block overflow-hidden align-bottom pb-1">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.95,
              delay: words.length * 0.055 + 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block font-serif italic font-normal text-[#C87D4B]"
          >
            {serifAccent}
          </motion.span>
        </span>
      )}
    </>
  );

  if (align === "split") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14 lg:mb-20",
          className
        )}
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-[#C87D4B]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C87D4B]">
              {label}
            </span>
          </motion.div>
          <h2
            className={cn(
              "font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-semibold tracking-tight leading-[1.06]",
              isDark ? "text-[#F4F1EA]" : "text-[#0A0D12]"
            )}
          >
            {renderAnimatedWords()}
          </h2>
        </div>
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p
              className={cn(
                "text-base sm:text-lg leading-relaxed",
                isDark ? "text-[#DDD7CC]/80" : "text-[#131820]/80"
              )}
            >
              {description}
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl mb-14 lg:mb-16", className)}>
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="h-[1px] w-8 bg-[#C87D4B]" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C87D4B]">
          {label}
        </span>
      </div>
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-semibold tracking-tight leading-[1.06]",
          isDark ? "text-[#F4F1EA]" : "text-[#0A0D12]"
        )}
      >
        {renderAnimatedWords()}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed",
            isDark ? "text-[#DDD7CC]/80" : "text-[#131820]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
