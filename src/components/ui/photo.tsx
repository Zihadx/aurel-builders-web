"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/data/images";
import { cn } from "@/lib/utils";

interface PhotoProps {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/** Photo with a graceful tonal fallback if the image can't load, so layout
 *  never shows a broken-image icon. Parent controls the aspect/size. */
export function Photo({ image, sizes, priority, className, imgClassName }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-rule-deep via-deep to-deeper", className)}>
      {!failed && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
