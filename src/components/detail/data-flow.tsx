import { ArrowDown, ArrowRight, Database, FileOutput, type LucideProps } from "lucide-react";

import { ScraperIcon } from "@/components/scrapers/scraper-icon";
import { CATEGORIES, TONES } from "@/data/categories";
import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

function FlowCard({
  eyebrow,
  icon: Icon,
  summary,
  details,
}: {
  eyebrow: string;
  icon: React.ComponentType<LucideProps>;
  summary: string;
  details?: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card/60 p-5">
      <div className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3.5" />
        {eyebrow}
      </div>
      <p className="mt-3 text-base font-medium leading-snug text-pretty">{summary}</p>
      {details && details.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2 border-t border-border/70 pt-4 text-sm text-muted-foreground">
          {details.map((detail) => (
            <li key={detail} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
              <span className="leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-muted-foreground/70 lg:flex-col">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}

/** Source → scraper → destination, laid out as a row on desktop and a column on mobile. */
export function DataFlow({ scraper }: { scraper: Scraper }) {
  const tone = TONES[CATEGORIES[scraper.category].tone];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_minmax(0,1fr)] lg:items-stretch">
      <FlowCard
        eyebrow="Data source"
        icon={Database}
        summary={scraper.source.summary}
        details={scraper.source.details}
      />
      <Connector />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 rounded-2xl border bg-background px-5 py-4 text-center shadow-xs">
          <span className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-xs">
            <ScraperIcon icon={scraper.icon} className={cn("size-5", tone.icon)} />
          </span>
          <span className="max-w-[9rem] text-xs font-medium leading-tight">{scraper.name}</span>
        </div>
      </div>
      <Connector />
      <FlowCard
        eyebrow="Data destination"
        icon={FileOutput}
        summary={scraper.destination.summary}
        details={scraper.destination.details}
      />
    </div>
  );
}
