import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
import { jsonLd, localBusinessLd } from "@/lib/seo";
import { EstimateProvider } from "@/lib/estimate-context";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const archivo = localFont({
  src: "../fonts/Archivo-latin-wdth.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const newsreader = localFont({
  src: "../fonts/Newsreader-latin-opsz.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_CONFIG.companyName} — Roof replacement, repair and inspection`,
  description:
    "Residential roofing done layer by layer: photographed inspections, itemized written scopes, standing-seam metal, slate and Class-4 shingle systems.",
  applicationName: SITE_CONFIG.companyName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: false, address: false },
  twitter: { card: "summary_large_image" },
  openGraph: {
    title: `${SITE_CONFIG.companyName} — A roof is a system`,
    description:
      "Free 45-point roof inspections and itemized written scopes before any work begins.",
    url: SITE_URL,
    siteName: SITE_CONFIG.companyName,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#e8ecea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-chalk"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <EstimateProvider>{children}</EstimateProvider>
          <aside aria-label="Quick contact">
            <WhatsAppButton />
            <MobileActionBar />
          </aside>
        </SmoothScroll>
      </body>
    </html>
  );
}
