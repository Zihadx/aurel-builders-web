"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

/** Floating WhatsApp shortcut. Opens a chat with a prefilled message. */
export function WhatsAppButton() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 2.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      className="group fixed max-lg:hidden bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 items-center gap-0 rounded-full bg-[#1d9e55] p-0 text-white shadow-[0_8px_30px_rgb(0_0_0/0.28)] transition-colors hover:bg-[#178a49] focus-visible:gap-2"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center">
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-medium opacity-0 transition-all duration-300 group-hover:max-w-[11rem] group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-[11rem] group-focus-visible:pr-5 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
