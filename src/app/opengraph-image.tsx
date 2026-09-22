import { ImageResponse } from "next/og";

import { OG_SIZE, OgChip, OgFrame, OgMark } from "@/lib/og";
import { getHubStats } from "@/lib/scrapers";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const stats = getHubStats();

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <OgMark />
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 30, color: "rgba(244,244,246,0.7)", lineHeight: 1.35, maxWidth: 960 }}>
            Explore, understand and access every scraper: what it collects, where the data goes,
            and where to find the live tool and code.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          <OgChip>{stats.total} scrapers</OgChip>
          <OgChip>{stats.categories} categories</OgChip>
          <OgChip>{stats.live} live tools</OgChip>
        </div>
      </OgFrame>
    ),
    size,
  );
}
