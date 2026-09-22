/** Site-wide identity used by metadata, header and footer. */
export const site = {
  name: "Scraper Hub",
  tagline: "All my scrapers. One place.",
  description:
    "A central place to explore, understand and access every scraper: what it does, what data it collects, where that data goes, and where to find the live tool and the code.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/nikhil-pbn",
} as const;
