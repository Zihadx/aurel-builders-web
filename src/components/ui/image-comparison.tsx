"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
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

const MIN = 3;
const MAX = 97;
const START = 94;
const clamp = (v: number) => Math.max(MIN, Math.min(MAX, v));

/**
 * Before/after photo slider.
 *
 * Built for feel: the divider position lives in a CSS variable that is written
 * straight to the DOM from a spring-smoothed animation loop, so dragging never
 * triggers a React re-render. Native image dragging is disabled (it was
 * hijacking the pointer), the whole frame is the drag surface, and the pointer
 * is captured so you can keep dragging outside the frame. Click to jump, drag
 * to scrub, arrow keys / Home / End for keyboard.
 */
export function ImageComparison({ before, after, beforeLabel, afterLabel, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const cur = useRef(START); // what is drawn
  const target = useRef(START); // where it is heading
  const raf = useRef(0);
  const intro = useRef<{ stop: () => void } | null>(null);
  const pointerId = useRef<number | null>(null);

  const apply = useCallback(
    (v: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--pos", `${v}%`);
      const n = Math.round(v);
      el.setAttribute("aria-valuenow", String(n));
      el.setAttribute("aria-valuetext", `${n}% ${beforeLabel}, ${100 - n}% ${afterLabel}`);
    },
    [beforeLabel, afterLabel]
  );

  // Spring-like smoothing toward the target, frame-rate independent
  const last = useRef(0);
  const loop = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    loop.current = (now: number) => {
      const dt = Math.min((now - (last.current || now - 16)) / 1000, 0.05);
      last.current = now;
      cur.current += (target.current - cur.current) * (1 - Math.exp(-dt * 16));
      if (Math.abs(target.current - cur.current) < 0.02) {
        cur.current = target.current;
        apply(cur.current);
        raf.current = 0;
        last.current = 0;
        return;
      }
      apply(cur.current);
      raf.current = requestAnimationFrame((t) => loop.current(t));
    };
  }, [apply]);

  const setTarget = useCallback(
    (v: number, instant = false) => {
      intro.current?.stop();
      target.current = clamp(v);
      if (reduce || instant) {
        cur.current = target.current;
        apply(cur.current);
        return;
      }
      if (!raf.current) raf.current = requestAnimationFrame((t) => loop.current(t));
    },
    [apply, reduce]
  );

  // First paint position, then the intro sweep once it is on screen
  useEffect(() => {
    if (reduce) cur.current = target.current = 50;
    apply(cur.current);
    return () => {
      cancelAnimationFrame(raf.current);
      intro.current?.stop();
    };
  }, [apply, reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    intro.current = animate(94, 50, {
      duration: 1.9,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        cur.current = target.current = v;
        apply(v);
      },
    });
    return () => intro.current?.stop();
  }, [inView, reduce, apply]);

  const fromEvent = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * 100;
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={START}
      style={{ "--pos": `${START}%` } as CSSProperties}
      onPointerDown={(e) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        pointerId.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.dataset.drag = "true";
        setTarget(fromEvent(e.clientX));
      }}
      onPointerMove={(e) => {
        if (pointerId.current === e.pointerId) setTarget(fromEvent(e.clientX));
      }}
      onPointerUp={(e) => {
        if (pointerId.current === e.pointerId) pointerId.current = null;
        delete e.currentTarget.dataset.drag;
      }}
      onPointerCancel={(e) => {
        pointerId.current = null;
        delete e.currentTarget.dataset.drag;
      }}
      onLostPointerCapture={(e) => {
        pointerId.current = null;
        delete e.currentTarget.dataset.drag;
      }}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 15 : 5;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") setTarget(target.current - step);
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") setTarget(target.current + step);
        else if (e.key === "Home") setTarget(MIN);
        else if (e.key === "End") setTarget(MAX);
        else return;
        e.preventDefault();
      }}
      className="group relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-rule-deep bg-deeper data-[drag=true]:cursor-grabbing sm:aspect-[16/10] [&_img]:pointer-events-none [&_img]:select-none"
    >
      <Photo image={after} sizes="(max-width:1024px) 100vw, 65vw" className="pointer-events-none absolute inset-0 h-full w-full" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.03]" />
      <div className="pointer-events-none absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}>
        <Photo image={before} sizes="(max-width:1024px) 100vw, 65vw" className="absolute inset-0 h-full w-full" imgClassName="saturate-[0.85] transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.03]" />
      </div>

      <span className="t-meta pointer-events-none absolute left-3 top-3 bg-deep/90 px-2.5 py-1 text-chalk">
        Before<span className="hidden sm:inline"> · {beforeLabel}</span>
      </span>
      <span className="t-meta pointer-events-none absolute right-3 top-3 bg-patina px-2.5 py-1 text-chalk">
        After<span className="hidden sm:inline"> · {afterLabel}</span>
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-chalk shadow-[0_0_14px_rgb(0_0_0/0.45)] will-change-[left]" style={{ left: "var(--pos)" }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-chalk bg-deep/90 text-chalk shadow-[0_6px_20px_rgb(0_0_0/0.4)] transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-data-[drag=true]:scale-90">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
