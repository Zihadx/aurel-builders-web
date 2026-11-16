import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.companyName,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#12202a",
    theme_color: "#12202a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
