import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { AnimationProvider } from "@/components/providers/animation-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.companyName} — Architectural Roofing & Exterior Craftsmanship`,
  description:
    "Bespoke residential roofing, standing-seam metal, natural slate, storm restoration, and architectural exterior envelopes.",
  alternates: {
    canonical: "https://aurelroofing.example.com",
  },
  openGraph: {
    title: `${SITE_CONFIG.companyName} — Built to Protect. Designed to Last.`,
    description:
      "Architectural roofing systems, precision craftsmanship, and transparent roof assessments for discerning homeowners.",
    url: "https://aurelroofing.example.com",
    siteName: SITE_CONFIG.companyName,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPlaceholder = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: SITE_CONFIG.companyName,
    description: SITE_CONFIG.tagline,
    url: "https://aurelroofing.example.com",
    telephone: SITE_CONFIG.contact.phoneDisplay,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.headquartersSample,
      addressCountry: "US",
    },
    openingHours: SITE_CONFIG.contact.officeHours,
  };

  return (
    <html
      lang="en"
      data-theme="royal-gold"
      className={`${jakarta.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="bg-ivory text-obsidian selection:bg-copper selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPlaceholder),
          }}
        />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
