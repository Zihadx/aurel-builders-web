"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { RoofPart } from "@/types";
import { Photo } from "@/components/ui/photo";
import { IMAGES } from "@/data/images";

const RoofScene = dynamic(() => import("./roof-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-mist" role="status">
      <span className="t-meta">Loading 3D model…</span>
    </div>
  ),
});

interface Props {
  activeId: RoofPart["id"];
  onSelect: (id: RoofPart["id"]) => void;
}

/** 3D roof model; falls back to a photo if WebGL isn't available. */
export function RoofViewer({ activeId, onSelect }: Props) {
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);

  if (failed) {
    return <Photo image={IMAGES.heroDetail} sizes="50vw" className="h-full w-full" />;
  }
  return (
    <div
      className="h-full w-full roof-mask"
      role="group"
      aria-label="Interactive 3D model of a roof. Drag to rotate. Use the list to focus on each layer."
    >
      <RoofScene activeId={activeId} onSelect={onSelect} onFail={onFail} />
    </div>
  );
}
