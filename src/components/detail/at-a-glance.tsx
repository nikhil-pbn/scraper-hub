import { ArrowUpRight, Lock } from "lucide-react";

import { CategoryBadge } from "@/components/scrapers/category-badge";
import { StatusBadge } from "@/components/scrapers/status-badge";
import { formatDate, hostname } from "@/lib/scrapers";
import type { Scraper } from "@/lib/types";

type SectionRef = { id: string; title: string };

export function AtAGlance({
  scraper,
  sections,
}: {
  scraper: Scraper;
  sections: SectionRef[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border bg-card/60 p-5">
        <h2 className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          At a glance
        </h2>
        <dl className="mt-4 flex flex-col gap-3.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <StatusBadge status={scraper.status} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Category</dt>
            <dd>
              <CategoryBadge category={scraper.category} />
            </dd>
          </div>
          {scraper.runsOn ? (
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted-foreground">Runs on</dt>
              <dd className="text-right font-medium">{scraper.runsOn}</dd>
            </div>
          ) : null}
          {scraper.lastUpdated ? (
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted-foreground">Updated</dt>
              <dd className="font-medium tabular-nums">{formatDate(scraper.lastUpdated)}</dd>
            </div>
          ) : null}
          {scraper.liveUrl ? (
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted-foreground">Live</dt>
              <dd>
                <a
                  href={scraper.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
                >
                  {hostname(scraper.liveUrl)}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </dd>
            </div>
          ) : null}
          {scraper.githubUrl ? (
            <div className="flex items-start justify-between gap-3">
              <dt className="text-muted-foreground">Code</dt>
              <dd>
                <a
                  href={scraper.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
                >
                  GitHub
                  {scraper.githubPrivate ? (
                    <Lock className="size-3" aria-label="Private repository" />
                  ) : (
                    <ArrowUpRight className="size-3.5" />
                  )}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <nav aria-label="On this page" className="rounded-2xl border bg-card/60 p-5">
        <h2 className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          On this page
        </h2>
        <ol className="mt-3 flex flex-col gap-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-baseline gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted/60 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="font-mono text-[11px] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
