"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ImageAsset } from "@/data/images";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/utils";

/** Cross-fades between photos with a gentle settle, for tab/list selections. */
export function PhotoFade({
  image,
  sizes,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("relative overflow-hidden bg-deeper", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={image.url}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Photo image={image} sizes={sizes} className="h-full w-full" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
