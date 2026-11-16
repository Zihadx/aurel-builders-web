import { SITE_CONFIG } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";

/** Safe to embed in a <script type="application/ld+json"> tag: "<" is escaped so
 *  content can never close the tag early. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function localBusinessLd() {
  const { contact, companyName, tagline } = SITE_CONFIG;
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: companyName,
    description: tagline,
    url: SITE_URL,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: { "@type": "PostalAddress", streetAddress: contact.headquartersSample, addressCountry: "US" },
    openingHours: contact.officeHours,
    priceRange: "$$",
  };
}
