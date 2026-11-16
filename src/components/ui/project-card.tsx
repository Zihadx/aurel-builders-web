"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/types";
import { IMAGES } from "@/data/images";

interface ProjectCardProps {
  project: ProjectItem;
  isActive: boolean;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, isActive, onSelect }: ProjectCardProps) {
  const afterImage = IMAGES[project.afterImageKey] || IMAGES.project1After;

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`w-full text-left rounded-3xl overflow-hidden border transition-all cursor-pointer p-5 sm:p-6 ${
        isActive
          ? "bg-graphite border-copperLight shadow-xl"
          : "bg-graphite/40 border-white/10 hover:border-white/25"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-24 rounded-2xl overflow-hidden shrink-0">
          <Image
            src={afterImage.url}
            alt={afterImage.alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-copperLight mb-1">
            <span>{project.category}</span>
            <span>{isActive ? "● Viewing" : "Compare ↗"}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-ivory truncate">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-ivory/65 line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>
    </button>
  );
}
