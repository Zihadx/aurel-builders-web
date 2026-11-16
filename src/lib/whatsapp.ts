import { SITE_CONFIG } from "@/data/site";

/** wa.me deep link with a prefilled message. */
export function whatsappUrl(message?: string) {
  const { whatsappNumber, whatsappMessage } = SITE_CONFIG.contact;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message ?? whatsappMessage)}`;
}
