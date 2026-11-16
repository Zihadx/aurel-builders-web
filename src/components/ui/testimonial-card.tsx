import React from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types";
import { IMAGES } from "@/data/images";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatar = IMAGES[testimonial.avatarKey] || IMAGES.avatar1;

  return (
    <article className="flex flex-col justify-between rounded-3xl bg-white border border-stone p-8 sm:p-9 shadow-sm hover:shadow-xl transition-shadow h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-copper tracking-widest text-sm">★★★★★</div>
          <span className="px-3 py-1 rounded-full bg-ivory text-[11px] font-medium text-charcoal/75">
            {testimonial.projectYearSample}
          </span>
        </div>
        <blockquote className="font-serif italic text-xl sm:text-2xl text-obsidian leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="px-3.5 py-2 rounded-xl bg-ivory text-xs font-medium text-charcoal">
          ✦ {testimonial.architecturalDetail}
        </div>
      </div>

      <div className="mt-7 pt-5 border-t border-stone flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-copper/40 shrink-0">
          <Image
            src={avatar.url}
            alt={avatar.alt}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-display text-sm font-semibold text-obsidian">
            {testimonial.clientNameSample}
          </div>
          <div className="text-xs text-charcoal/70">
            {testimonial.propertyLocationSample} • {testimonial.serviceReceived}
          </div>
        </div>
      </div>
    </article>
  );
}
