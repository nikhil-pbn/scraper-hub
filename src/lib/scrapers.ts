import { CATEGORIES, STATUSES } from "@/data/categories";
import { scrapers } from "@/data/scrapers";
import {
  SCRAPER_CATEGORIES,
  SCRAPER_STATUSES,
  type Scraper,
  type ScraperCategory,
  type ScraperStatus,
} from "@/lib/types";

export function getAllScrapers(): Scraper[] {
  return scrapers;
}

export function getScraperBySlug(slug: string): Scraper | undefined {
  return scrapers.find((scraper) => scraper.slug === slug);
}

/** Previous and next entries in data order, for the detail-page pager. */
export function getAdjacentScrapers(slug: string) {
  const index = scrapers.findIndex((scraper) => scraper.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? scrapers[index - 1] : undefined,
    next: index < scrapers.length - 1 ? scrapers[index + 1] : undefined,
  };
}

export function getHubStats(list: Scraper[] = scrapers) {
  return {
    total: list.length,
    live: list.filter((scraper) => Boolean(scraper.liveUrl)).length,
    categories: new Set(list.map((scraper) => scraper.category)).size,
    active: list.filter((scraper) => scraper.status === "active").length,
  };
}

function normalise(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/\p{Diacritic}/gu, "");
}

/** Everything a person might type to find a scraper, flattened once per entry. */
function searchText(scraper: Scraper) {
  return normalise(
    [
      scraper.name,
      scraper.tagline,
      CATEGORIES[scraper.category].label,
      STATUSES[scraper.status].label,
      scraper.source.summary,
      scraper.destination.summary,
      scraper.runsOn ?? "",
      ...scraper.keyData,
      ...(scraper.technologies?.map((tech) => tech.name) ?? []),
      ...(scraper.dataCollected?.map((field) => field.name) ?? []),
    ].join(" "),
  );
}

export type ScraperFilters = {
  query?: string;
  category?: ScraperCategory | "all";
  status?: ScraperStatus | "all";
};

export function filterScrapers(list: Scraper[], filters: ScraperFilters): Scraper[] {
  const terms = normalise(filters.query ?? "")
    .split(/\s+/)
    .filter(Boolean);

  return list.filter((scraper) => {
    if (filters.category && filters.category !== "all" && scraper.category !== filters.category) {
      return false;
    }
    if (filters.status && filters.status !== "all" && scraper.status !== filters.status) {
      return false;
    }
    if (terms.length === 0) return true;
    const haystack = searchText(scraper);
    return terms.every((term) => haystack.includes(term));
  });
}

export function countByCategory(list: Scraper[]) {
  const counts = Object.fromEntries(SCRAPER_CATEGORIES.map((key) => [key, 0])) as Record<
    ScraperCategory | "all",
    number
  >;
  counts.all = list.length;
  for (const scraper of list) counts[scraper.category] += 1;
  return counts;
}

export function countByStatus(list: Scraper[]) {
  const counts = Object.fromEntries(SCRAPER_STATUSES.map((key) => [key, 0])) as Record<
    ScraperStatus | "all",
    number
  >;
  counts.all = list.length;
  for (const scraper of list) counts[scraper.status] += 1;
  return counts;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
