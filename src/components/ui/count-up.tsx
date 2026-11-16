"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `value` once, when it scrolls into view. Shows the final
 *  number straight away for reduced-motion users and before hydration. */
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
