"use client";

import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { Photo } from "@/components/ui/photo";
import { FadeUp, ImageReveal, Parallax, WordsReveal } from "@/components/ui/motion";

export function ApproachSection() {
  const { approach } = SITE_CONFIG;
  return (
    <section id="approach" aria-labelledby="approach-title" className="section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <WordsReveal id="approach-title" className="t-h2" text={approach.heading} />
            <FadeUp delay={0.2}>
              <p className="t-lede mt-6">{approach.lead}</p>
              <p className="t-body mt-5 text-lead">{approach.body}</p>
            </FadeUp>
          </div>

          <div className="relative lg:col-span-6">
            <ImageReveal className="aspect-[4/3] w-full lg:aspect-square">
              <Parallax className="h-full w-full" distance={40}>
                <Photo image={IMAGES.craft} sizes="(max-width:1024px) 100vw, 50vw" className="h-full w-full" />
              </Parallax>
            </ImageReveal>
            <ImageReveal delay={0.25} className="absolute -bottom-8 -left-4 hidden aspect-[4/3] w-[44%] border-[6px] border-paper sm:block lg:-left-12">
              <Photo image={IMAGES.materials} sizes="25vw" className="h-full w-full" />
            </ImageReveal>
          </div>
        </div>

        <ul className="mt-20 grid border-t border-ink sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {approach.standards.map((s, i) => (
            <li key={s.title} className="border-b border-rule py-8 sm:pr-8 lg:border-b-0 lg:pb-0">
              <FadeUp delay={i * 0.08}>
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-body mt-3 text-lead">{s.description}</p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
