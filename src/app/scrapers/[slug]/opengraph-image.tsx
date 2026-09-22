import { ImageResponse } from "next/og";

import { CATEGORIES, STATUSES } from "@/data/categories";
import { OG_SIZE, OgChip, OgFrame, OgMark } from "@/lib/og";
import { getAllScrapers, getScraperBySlug } from "@/lib/scrapers";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllScrapers().map((scraper) => ({ slug: scraper.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scraper = getScraperBySlug(slug);
  const title = scraper?.name ?? site.name;
  const tagline = scraper?.tagline ?? site.tagline;

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <OgMark size={56} />
            <div style={{ fontSize: 28, fontWeight: 600, color: "rgba(244,244,246,0.8)" }}>
              {site.name}
            </div>
          </div>
          {scraper ? (
            <div style={{ display: "flex", gap: 12 }}>
              <OgChip>{CATEGORIES[scraper.category].label}</OgChip>
              <OgChip>{STATUSES[scraper.status].label}</OgChip>
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(244,244,246,0.72)",
              lineHeight: 1.35,
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 24, color: "rgba(244,244,246,0.7)" }}>
          {scraper ? (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 504 }}>
                <div style={{ fontSize: 16, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6 }}>
                  Source
                </div>
                <div style={{ color: "#f4f4f6", lineHeight: 1.3 }}>{scraper.source.summary}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 504 }}>
                <div style={{ fontSize: 16, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6 }}>
                  Destination
                </div>
                <div style={{ color: "#f4f4f6", lineHeight: 1.3 }}>{scraper.destination.summary}</div>
              </div>
            </>
          ) : null}
        </div>
      </OgFrame>
    ),
    size,
  );
}
