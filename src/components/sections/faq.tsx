"use client";

import { WordsReveal } from "@/components/ui/motion";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS_DATA } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <WordsReveal id="faq-title" className="t-h2" text={"Questions we hear most."} />
          <p className="t-body mt-5 text-lead">
            Can’t find yours? Call {" "}
            <a href="tel:+18005550194" className="text-patina underline underline-offset-4">
              (800) 555-0194
            </a>{" "}
            and we’ll answer it directly.
          </p>
        </div>

        <ul className="border-t border-ink lg:col-span-8">
          {FAQS_DATA.map((f) => {
            const open = openId === f.id;
            const panel = `${uid}-${f.id}`;
            return (
              <li key={f.id} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panel}
                    onClick={() => setOpenId(open ? null : f.id)}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                  >
                    <span>
                      <span className="t-meta block text-lead">{f.category}</span>
                      <span className="t-h3 mt-1 block">{f.question}</span>
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-patina transition-transform duration-300 ease-[var(--ease-out)]",
                        open && "rotate-45"
                      )}
                    />
                  </button>
                </h3>
                <div id={panel} className="rows" data-open={open}>
                  <div>
                    <p className="t-body pb-7 text-lead">{f.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
