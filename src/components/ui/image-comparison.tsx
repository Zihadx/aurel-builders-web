"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { ImageAsset } from "@/data/images";
import { Photo } from "@/components/ui/photo";

interface Props {
  before: ImageAsset;
  after: ImageAsset;
  beforeLabel: string;
  afterLabel: string;
  label: string;
}

const MIN = 4;
const MAX = 96;

/** Before/after photo slider. Drag (pointer capture), arrow keys, Home/End.
 *  On first view the divider sweeps in from the edge to the middle. */
export function ImageComparison({ before, after, beforeLabel, afterLabel, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [pos, setPos] = useState(reduce ? 50 : 92);
  const swept = useRef(false);

  useEffect(() => {
    if (!inView || swept.current || reduce) return;
    swept.current = true;
    const controls = animate(92, 50, {
      duration: 1.8,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => !dragging.current && setPos(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    swept.current = true;
    setPos(Math.max(MIN, Math.min(MAX, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% ${beforeLabel}, ${Math.round(100 - pos)}% ${afterLabel}`}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 15 : 5;
        swept.current = true;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(MIN, p - step));
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(MAX, p + step));
        else if (e.key === "Home") setPos(MIN);
        else if (e.key === "End") setPos(MAX);
        else return;
        e.preventDefault();
      }}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-rule-deep bg-deeper sm:aspect-[16/10]"
    >
      <Photo image={after} sizes="(max-width:1024px) 100vw, 65vw" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo image={before} sizes="(max-width:1024px) 100vw, 65vw" className="absolute inset-0 h-full w-full" imgClassName="saturate-[0.85]" />
      </div>

      <span className="t-meta pointer-events-none absolute left-3 top-3 bg-deep/90 px-2.5 py-1 text-chalk">
        Before<span className="hidden sm:inline"> · {beforeLabel}</span>
      </span>
      <span className="t-meta pointer-events-none absolute right-3 top-3 bg-patina px-2.5 py-1 text-chalk">
        After<span className="hidden sm:inline"> · {afterLabel}</span>
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-chalk shadow-[0_0_12px_rgb(0_0_0/0.4)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-chalk bg-deep text-chalk">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
