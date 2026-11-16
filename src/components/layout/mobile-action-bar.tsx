"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Phone-only sticky bar: the three ways to start (call, WhatsApp, book).
 *  Slides in after the hero, and stays out of the way on the booking page. */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book") return null;
  const item = "flex h-12 items-center justify-center gap-2 text-[0.9375rem] font-medium";

  return (
    <div
      className={cn(
        "on-deep fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.35fr] border-t border-rule-deep bg-deep pb-[env(safe-area-inset-bottom)] text-chalk transition-transform duration-500 ease-[var(--ease-out)] lg:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <a href={SITE_CONFIG.contact.phoneHref} className={cn(item, "border-r border-rule-deep")} tabIndex={show ? 0 : -1}>
        <Phone className="h-4 w-4" aria-hidden="true" /> Call
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={cn(item, "border-r border-rule-deep")} tabIndex={show ? 0 : -1}>
        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
      </a>
      <Link href="/book" className={cn(item, "bg-patina font-semibold")} tabIndex={show ? 0 : -1}>
        Book inspection
      </Link>
    </div>
  );
}
