"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageComparisonProps {
  beforeUrl: string;
  beforeAlt: string;
  afterUrl: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageComparison({
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
  beforeLabel = "Before — Weathered Shingle Envelope (Sample)",
  afterLabel = "After — Standing-Seam Architectural System (Sample)",
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={(e) => {
        if (isDragging) handleMove(e.clientX);
      }}
      onClick={(e) => handleMove(e.clientX)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setSliderPosition((prev) => Math.max(5, prev - 5));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setSliderPosition((prev) => Math.min(95, prev + 5));
        }
      }}
      className="group relative w-full h-[340px] sm:h-[460px] lg:h-[520px] overflow-hidden rounded-3xl select-none cursor-ew-resize border border-white/15 bg-graphite shadow-2xl"
      role="slider"
      aria-label="Before and after roof transformation comparison slider"
      aria-valuemin={5}
      aria-valuemax={95}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
    >
      {/* After Image */}
      <Image
        src={afterUrl}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 65vw"
        className="object-cover object-center pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-5 right-5 z-10 px-4 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/15 text-xs font-medium text-ivory">
        {afterLabel}
      </div>

      {/* Before Image Clipped */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeUrl}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover object-center sepia-[0.2] contrast-[0.95] brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-black/35" />
        <div className="absolute bottom-5 left-5 z-10 px-4 py-1.5 rounded-full bg-obsidian/85 backdrop-blur-md border border-copper/40 text-xs font-medium text-copperLight">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Divider & Tactile Pill Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-copperLight shadow-[0_0_24px_rgba(200,125,75,0.9)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-obsidian/90 backdrop-blur-md border-2 border-copperLight flex items-center justify-center text-ivory shadow-2xl transition-transform duration-200 group-hover:scale-110">
          ↔
        </div>
      </div>
    </div>
  );
}
