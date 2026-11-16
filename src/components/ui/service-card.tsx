"use client";

import React from "react";
import Image from "next/image";
import { ServiceItem } from "@/types";
import { IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (serviceTitle: string) => void;
  className?: string;
}

export function ServiceCard({
  service,
  onSelectService,
  className,
}: ServiceCardProps) {
  const imageAsset = IMAGES[service.imageKey] || IMAGES.serviceReplacement;

  if (service.styleVariant === "dark-overlay") {
    return (
      <article
        className={cn(
          "group relative rounded-3xl overflow-hidden min-h-[460px] flex flex-col justify-end p-7 sm:p-10 text-ivory shadow-xl",
          className
        )}
      >
        <Image
          src={imageAsset.url}
          alt={imageAsset.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/65 to-obsidian/15" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-copperLight">
              {service.shortCategory}
            </span>
            <span className="font-serif italic text-3xl text-ivory/80">
              {service.number}
            </span>
          </div>
          <h3 className="font-display text-3xl font-semibold text-ivory">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-ivory/80 max-w-xl leading-relaxed">
            {service.description}
          </p>
          <div className="pt-3 flex flex-wrap gap-2">
            {service.architecturalSpecs.map((sp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-obsidian/70 border border-white/15 text-xs text-ivory/85"
              >
                ✓ {sp}
              </span>
            ))}
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => onSelectService(service.title)}
              className="btn-beveled-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide cursor-pointer"
            >
              <span>Explore {service.title}</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (service.styleVariant === "horizontal-feature") {
    return (
      <article
        className={cn(
          "group rounded-3xl overflow-hidden bg-obsidian text-ivory border border-white/10 grid grid-cols-1 lg:grid-cols-12 shadow-xl",
          className
        )}
      >
        <div className="relative h-64 lg:h-auto lg:col-span-6 overflow-hidden">
          <Image
            src={imageAsset.url}
            alt={imageAsset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-7 sm:p-10 lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-copperLight">
                {service.shortCategory}
              </span>
              <span className="font-serif italic text-3xl text-copperLight">
                {service.number}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory mb-3">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-ivory/75 leading-relaxed mb-5">
              {service.description}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ivory/80">
              {service.architecturalSpecs.map((sp, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-copperLight">✦</span>
                  <span>{sp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-ivory/60">
              Timeline: {service.estimatedTimelineSample}
            </span>
            <button
              type="button"
              onClick={() => onSelectService(service.title)}
              className="btn-beveled-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold cursor-pointer"
            >
              <span>Request Exterior Scope ↗</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (service.styleVariant === "obsidian-card") {
    return (
      <article
        className={cn(
          "group rounded-3xl overflow-hidden bg-obsidian text-ivory p-7 flex flex-col justify-between shadow-xl",
          className
        )}
      >
        <div>
          <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
            <Image
              src={imageAsset.url}
              alt={imageAsset.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md text-[11px] text-copperLight">
              {service.estimatedTimelineSample}
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-medium text-copperLight">
              {service.shortCategory}
            </span>
            <span className="font-serif italic text-2xl text-ivory/60">
              {service.number}
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-ivory mb-2.5">
            {service.title}
          </h3>
          <p className="text-sm text-ivory/75 leading-relaxed mb-5">
            {service.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSelectService(service.title)}
          className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-copper text-ivory text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>Request Storm Assessment</span>
          <span>↗</span>
        </button>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group rounded-3xl overflow-hidden bg-white border border-stone p-7 flex flex-col justify-between hover:border-copper transition-all duration-500 shadow-sm hover:shadow-xl",
        className
      )}
    >
      <div>
        <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-6 bg-obsidian">
          <Image
            src={imageAsset.url}
            alt={imageAsset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian/75 backdrop-blur-md text-[11px] text-ivory">
            {service.estimatedTimelineSample}
          </span>
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-copper">
            {service.shortCategory}
          </span>
          <span className="font-serif italic text-2xl text-charcoal/50">
            {service.number}
          </span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-obsidian mb-2.5">
          {service.title}
        </h3>
        <p className="text-sm text-charcoal/80 leading-relaxed mb-5">
          {service.description}
        </p>
        <ul className="space-y-1.5 border-t border-stone/70 pt-4 mb-6 text-xs text-obsidian/80">
          {service.architecturalSpecs.map((sp, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-copper font-bold">✓</span>
              <span>{sp}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => onSelectService(service.title)}
        className="w-full pt-3 border-t border-stone/70 flex items-center justify-between text-xs font-semibold text-obsidian group-hover:text-copper transition-colors cursor-pointer"
      >
        <span>Explore {service.title}</span>
        <span className="h-8 w-8 rounded-full bg-ivory group-hover:bg-copper group-hover:text-white flex items-center justify-center transition-colors">
          ↗
        </span>
      </button>
    </article>
  );
}
