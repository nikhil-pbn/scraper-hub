import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, FileOutput } from "lucide-react";

import { CategoryBadge } from "@/components/scrapers/category-badge";
import { ScraperVisual } from "@/components/scrapers/scraper-visual";
import { StatusBadge } from "@/components/scrapers/status-badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TONES } from "@/data/categories";
import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAX_CHIPS = 4;

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Database;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/80" />
      <div className="min-w-0">
        <dt className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {label}
        </dt>
        <dd className="truncate text-sm text-foreground/90" title={value}>
          {value}
        </dd>
      </div>
    </div>
  );
}

export function ScraperCard({ scraper }: { scraper: Scraper }) {
  const tone = TONES[CATEGORIES[scraper.category].tone];
  const extra = scraper.keyData.length - MAX_CHIPS;
  const href = `/scrapers/${scraper.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-xs transition-[border-color,box-shadow,transform] duration-300",
        "hover:shadow-lg hover:shadow-black/5 motion-safe:hover:-translate-y-0.5 dark:hover:shadow-black/40",
        "focus-within:ring-3 focus-within:ring-ring/40",
        tone.border,
      )}
    >
      <div className="relative aspect-video overflow-hidden border-b border-border/70">
        <ScraperVisual scraper={scraper} variant="card" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={scraper.category} />
          <StatusBadge status={scraper.status} />
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {/* Stretched link: the whole card is clickable while keeping one focus target. */}
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:z-0 after:content-['']"
            >
              {scraper.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {scraper.tagline}
          </p>
        </div>

        <dl className="grid min-w-0 grid-cols-1 gap-2.5 rounded-xl border border-border/70 bg-muted/30 p-3">
          <MetaRow icon={Database} label="Source" value={scraper.source.summary} />
          <MetaRow
            icon={FileOutput}
            label="Destination"
            value={scraper.destination.summary}
          />
        </dl>

        <ul className="flex flex-wrap gap-1.5" aria-label="Key data collected">
          {scraper.keyData.slice(0, MAX_CHIPS).map((item) => (
            <li
              key={item}
              className="rounded-md border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground/80"
            >
              {item}
            </li>
          ))}
          {extra > 0 ? (
            <li className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              +{extra} more
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-brand">
            View details
            <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </span>
          {scraper.liveUrl ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="relative z-10 gap-1"
            >
              <a href={scraper.liveUrl} target="_blank" rel="noreferrer">
                Live
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only">(opens {scraper.name} in a new tab)</span>
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
