import type { Project } from "@/lib/types";

/**
 * Non-scraper work shown in the "More projects" section, in display order.
 *
 * Facts were taken from each project's README, metadata and git history on
 * 2026-09-22; live URLs were supplied by the owner and verified the same day.
 * Repositories that return 404 to anonymous visitors are marked `repoPrivate`.
 */
export const projects: Project[] = [
  {
    slug: "proposal-builder",
    name: "PBN Proposal Builder",
    description:
      "A sales rep pastes a call transcript, a model turns it into a structured proposal, the rep edits it section by section, publishes, and shares a landing page with the prospect. The published link can be pushed onto the matching HubSpot contact.",
    kind: "internal-tool",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Prisma 7",
      "PostgreSQL",
      "Claude & OpenAI",
      "Google OAuth",
      "HubSpot CRM",
    ],
    liveUrl: "https://sales.practicenumbers.com/",
    repoUrl: "https://github.com/practicenumbers/pbn-sales-proposal",
    repoPrivate: true,
    lastUpdated: "2026-09-14",
  },
  {
    slug: "pbn-prospects",
    name: "PbN Prospects",
    description:
      "After an outbound call, an SDR enters who they spoke with, picks the solutions the prospect asked about or the pain points they raised, and publishes a shareable prospect page assembled from predefined sections. No AI involved; the link can be attached to the HubSpot contact.",
    kind: "internal-tool",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Prisma 7",
      "Google OAuth",
      "HubSpot CRM",
      "AWS EC2",
    ],
    liveUrl: "https://sdr-prospect.practicenumbers.com/",
    repoUrl: "https://github.com/practicenumbers/pbn-sdr-prospect",
    repoPrivate: true,
    lastUpdated: "2026-09-17",
  },
  {
    slug: "marketing-scorecard",
    name: "Marketing Scorecard",
    description:
      "Demand generation performance by activity, period over period, for quarterly leadership meetings. Reads the marketing metrics workbook from Google Drive on every request and renders funnel, web, paid, email, events, social, podcast, SEO and blog tiles and charts.",
    kind: "dashboard",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "ExcelJS", "Google Drive API", "Recharts"],
    liveUrl: "https://pbn-marketing-scorecard.vercel.app/",
    repoUrl: "https://github.com/nikhil-pbn/pbn-marketing-scorecard",
    repoPrivate: true,
    lastUpdated: "2026-09-21",
  },
];
