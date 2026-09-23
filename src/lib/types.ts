/**
 * Central typed data structure for every scraper shown in Scraper Hub.
 *
 * Content lives in `src/data/scrapers.ts`; UI components only read these types.
 * Everything beyond the identity block is optional so a partially documented
 * scraper can be added now and completed later. Sections without data are hidden.
 */

export const SCRAPER_STATUSES = ["active", "testing", "prototype", "deprecated"] as const;
export type ScraperStatus = (typeof SCRAPER_STATUSES)[number];

export const SCRAPER_CATEGORIES = [
  "lead-generation",
  "seo",
  "monitoring",
  "tech-detection",
  "data-extraction",
] as const;
export type ScraperCategory = (typeof SCRAPER_CATEGORIES)[number];

/** Icon keys resolved to Lucide icons in `components/scrapers/scraper-icon.tsx`. */
export type ScraperIcon =
  | "map-pinned"
  | "radar"
  | "messages-square"
  | "search"
  | "waypoints"
  | "map-pin"
  | "database"
  | "globe";

export type ResourceLink = {
  label: string;
  href: string;
  /** Short hint shown under the label, for example "Engineering guide". */
  description?: string;
  kind?: "live" | "docs" | "sheet" | "other";
};

export type InputField = {
  label: string;
  description?: string;
};

export type DataField = {
  name: string;
  description?: string;
  /** Optional grouping label used to cluster fields, for example "Contact details". */
  group?: string;
};

export type WorkflowStep = {
  title: string;
  description?: string;
};

export type TechKind = "framework" | "language" | "library" | "api" | "infra" | "technique";

export type Technology = {
  name: string;
  kind: TechKind;
};

export type ExampleTable = {
  title: string;
  caption?: string;
  columns: string[];
  /** Real or fixture rows. Leave empty when only the column shape is known. */
  rows: string[][];
};

export type Scraper = {
  slug: string;
  name: string;
  /** One-sentence summary used on cards and in metadata. */
  tagline: string;
  /** "What it does" paragraphs. */
  description: string[];
  category: ScraperCategory;
  status: ScraperStatus;
  icon: ScraperIcon;
  /** Optional screenshot in /public. When absent a generated placeholder is shown. */
  image?: { src: string; alt: string };

  /** Where the scraper runs, for example "Vercel" or "Local · Next.js". */
  runsOn?: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful change. */
  lastUpdated?: string;

  liveUrl?: string;
  /** Extra links such as public documentation. Repository links are intentionally not shown. */
  resources?: ResourceLink[];

  source: { summary: string; details?: string[] };
  destination: { summary: string; details?: string[] };
  /** Short list of the most important fields, shown as chips on the card. */
  keyData: string[];

  input?: InputField[];
  dataCollected?: DataField[];
  howItWorks?: WorkflowStep[];
  output?: string[];
  technologies?: Technology[];
  exampleOutputs?: ExampleTable[];
  limitations?: string[];
};

/**
 * Non-scraper work shown in the "More projects" section: internal tools,
 * dashboards and websites. Deliberately light, with no detail page.
 */
export const PROJECT_KINDS = ["internal-tool", "dashboard", "website"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

export type Project = {
  slug: string;
  name: string;
  /** One or two sentences. */
  description: string;
  kind: ProjectKind;
  stack?: string[];
  liveUrl?: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful change. */
  lastUpdated?: string;
};
