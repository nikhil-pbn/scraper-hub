# Scraper Hub

**All my scrapers. One place.**

An internal showcase and documentation hub for every scraper: what it does, what data it collects, where the data goes, and where to find the live tool and the code. There is no backend, database or auth. Everything is static and data-driven.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 with shadcn/ui primitives (Radix, Nova preset)
- Framer Motion for entrance, stagger, hover and filter animations (respects `prefers-reduced-motion`)
- next-themes for light / dark / system
- Lucide icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript (run `npx next typegen` first on a fresh clone)
npm run build      # production build, prerenders every page and OG image
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so canonical URLs, the sitemap and Open Graph images point at the deployed domain.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero + searchable, filterable scraper grid |
| `/scrapers/[slug]` | Full breakdown of one scraper |
| `/opengraph-image`, `/scrapers/[slug]/opengraph-image` | Generated social cards |
| `/sitemap.xml`, `/robots.txt` | SEO basics |

## Adding a scraper

1. Open `src/data/scrapers.ts` and append an object. The `Scraper` type in `src/lib/types.ts` documents every field; only `slug`, `name`, `tagline`, `description`, `category`, `status`, `icon`, `source`, `destination` and `keyData` are required.
2. Leave out anything you cannot verify. Detail-page sections are hidden when their data is missing, so a partial entry still renders cleanly.
3. To show a real screenshot, drop it into `public/scrapers/` and set `image: { src: "/scrapers/<slug>.png", alt: "…" }`. Until then a generated placeholder tinted by category is shown.
4. New categories or statuses go in `src/lib/types.ts` (the union) and `src/data/categories.ts` (label, description, colour tone).
5. New icons: add a key to `ScraperIcon` and map it in `src/components/scrapers/scraper-icon.tsx`.

## Project layout

```
src/
  app/                 routes, metadata, OG images, sitemap, robots
  components/
    layout/            header, footer, theme toggle, logo, container
    home/              hero and hero panel
    scrapers/          card, grid, search, filters, badges, placeholder art
    detail/            hero, sections, data-field grid, tech stack, output preview, links
    motion/            Reveal wrapper
    ui/                shadcn/ui primitives
  data/                scraper content and category/status metadata
  lib/                 types, data helpers, site config
```
