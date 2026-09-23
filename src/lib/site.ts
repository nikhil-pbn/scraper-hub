/**
 * Public origin of the deployed hub. Open Graph and Twitter images, canonical URLs and the
 * sitemap must be absolute, so this has to be the real domain in production.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL, set explicitly (any host)
 * 2. VERCEL_PROJECT_PRODUCTION_URL, provided automatically by Vercel for production builds
 * 3. VERCEL_URL, the per-deployment URL for previews
 * 4. localhost for local development
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production}`;

  const preview = process.env.VERCEL_URL?.trim();
  if (preview) return `https://${preview}`;

  return "http://localhost:3000";
}

/** Site-wide identity used by metadata, header and footer. */
export const site = {
  name: "Scraper Hub",
  tagline: "All the scrapers. One place.",
  description:
    "A central place to explore, understand and access every scraper: what it does, what data it collects, where that data goes, and where to find the live tool.",
  url: resolveSiteUrl(),
} as const;
