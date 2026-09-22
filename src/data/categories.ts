import type { ScraperCategory, ScraperStatus } from "@/lib/types";

/**
 * Visual tone per category and status. Complete Tailwind class strings live here so
 * the compiler can see them; components only pick a tone and apply the strings.
 */
export type Tone = "emerald" | "violet" | "orange" | "sky" | "teal" | "amber" | "zinc";

export type ToneClasses = {
  /** Soft chip: tinted background, readable text, faint ring. */
  chip: string;
  /** Icon colour on tinted surfaces. */
  icon: string;
  /** Solid dot used in status badges and legends. */
  dot: string;
  /** Gradient stops for placeholder art backgrounds. */
  gradient: string;
  /** Blurred glow used behind artwork. */
  glow: string;
  /** Border tint when the parent `.group` is hovered. */
  border: string;
};

export const TONES: Record<Tone, ToneClasses> = {
  emerald: {
    chip: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
    icon: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    gradient: "from-emerald-500/25 via-emerald-500/5 to-transparent",
    glow: "bg-emerald-500/30",
    border: "hover:border-emerald-500/40",
  },
  violet: {
    chip: "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300",
    icon: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    gradient: "from-violet-500/25 via-violet-500/5 to-transparent",
    glow: "bg-violet-500/30",
    border: "hover:border-violet-500/40",
  },
  orange: {
    chip: "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-300",
    icon: "text-orange-600 dark:text-orange-400",
    dot: "bg-orange-500",
    gradient: "from-orange-500/25 via-orange-500/5 to-transparent",
    glow: "bg-orange-500/30",
    border: "hover:border-orange-500/40",
  },
  sky: {
    chip: "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300",
    icon: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    gradient: "from-sky-500/25 via-sky-500/5 to-transparent",
    glow: "bg-sky-500/30",
    border: "hover:border-sky-500/40",
  },
  teal: {
    chip: "bg-teal-500/10 text-teal-700 ring-teal-500/20 dark:text-teal-300",
    icon: "text-teal-600 dark:text-teal-400",
    dot: "bg-teal-500",
    gradient: "from-teal-500/25 via-teal-500/5 to-transparent",
    glow: "bg-teal-500/30",
    border: "hover:border-teal-500/40",
  },
  amber: {
    chip: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
    icon: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    gradient: "from-amber-500/25 via-amber-500/5 to-transparent",
    glow: "bg-amber-500/30",
    border: "hover:border-amber-500/40",
  },
  zinc: {
    chip: "bg-zinc-500/10 text-zinc-700 ring-zinc-500/20 dark:text-zinc-300",
    icon: "text-zinc-600 dark:text-zinc-400",
    dot: "bg-zinc-400",
    gradient: "from-zinc-500/25 via-zinc-500/5 to-transparent",
    glow: "bg-zinc-500/30",
    border: "hover:border-zinc-500/40",
  },
};

export type CategoryMeta = {
  label: string;
  description: string;
  tone: Tone;
};

export const CATEGORIES: Record<ScraperCategory, CategoryMeta> = {
  "lead-generation": {
    label: "Lead generation",
    description: "Finds businesses and contact details for outbound prospecting.",
    tone: "emerald",
  },
  seo: {
    label: "SEO",
    description: "Keyword, backlink and referring-domain research built on Ahrefs.",
    tone: "violet",
  },
  monitoring: {
    label: "Monitoring",
    description: "Watches communities and channels for mentions that matter.",
    tone: "orange",
  },
  "tech-detection": {
    label: "Tech detection",
    description: "Identifies the software vendors a website points at.",
    tone: "sky",
  },
  "data-extraction": {
    label: "Data extraction",
    description: "Turns unstructured web pages into clean structured tables.",
    tone: "teal",
  },
};

export type StatusMeta = {
  label: string;
  description: string;
  tone: Tone;
  /** Animate the dot to signal a live tool. */
  pulse?: boolean;
};

export const STATUSES: Record<ScraperStatus, StatusMeta> = {
  active: {
    label: "Active",
    description: "In regular use and maintained.",
    tone: "emerald",
    pulse: true,
  },
  testing: {
    label: "Testing",
    description: "Working, still being evaluated.",
    tone: "amber",
  },
  prototype: {
    label: "Prototype",
    description: "Functional build, not yet hardened for regular use.",
    tone: "sky",
  },
  deprecated: {
    label: "Deprecated",
    description: "Kept for reference, no longer used.",
    tone: "zinc",
  },
};
