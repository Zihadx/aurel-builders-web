import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/data/site";

export const alt = `${SITE_CONFIG.companyName}: ${SITE_CONFIG.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#12202a", color: "#f5f7f6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, letterSpacing: 4 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke="#86c5b2" strokeWidth="2.4">
            <path d="M3 21L16 8L29 21" />
            <path d="M3 27H29" />
          </svg>
          {SITE_CONFIG.shortName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2, maxWidth: 980 }}>{SITE_CONFIG.hero.headline}</div>
          <div style={{ fontSize: 30, color: "#9fb0b6" }}>Free 45-point inspections · Itemized written scopes</div>
        </div>
      </div>
    ),
    size
  );
}
