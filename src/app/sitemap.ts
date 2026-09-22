import type { MetadataRoute } from "next";

import { getAllScrapers } from "@/lib/scrapers";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const scrapers = getAllScrapers();
  const newest = scrapers
    .map((scraper) => scraper.lastUpdated)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  return [
    {
      url: site.url,
      lastModified: newest ? new Date(newest) : undefined,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...scrapers.map((scraper) => ({
      url: `${site.url}/scrapers/${scraper.slug}`,
      lastModified: scraper.lastUpdated ? new Date(scraper.lastUpdated) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
