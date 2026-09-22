import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

function PagerLink({
  scraper,
  direction,
}: {
  scraper: Scraper;
  direction: "previous" | "next";
}) {
  const next = direction === "next";
  return (
    <Link
      href={`/scrapers/${scraper.slug}`}
      className={cn(
        "group flex flex-col gap-1.5 rounded-2xl border bg-card/60 p-5 transition-[border-color,background-color,box-shadow] outline-none hover:border-brand/50 hover:bg-card hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50",
        next ? "text-right sm:col-start-2" : "text-left",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
          next && "justify-end",
        )}
      >
        {!next ? <ArrowLeft className="size-3 transition-transform motion-safe:group-hover:-translate-x-0.5" /> : null}
        {direction}
        {next ? <ArrowRight className="size-3 transition-transform motion-safe:group-hover:translate-x-0.5" /> : null}
      </span>
      <span className="text-base font-semibold tracking-tight">{scraper.name}</span>
      <span className="line-clamp-1 text-sm text-muted-foreground">{scraper.tagline}</span>
    </Link>
  );
}

export function ScraperPager({
  previous,
  next,
}: {
  previous?: Scraper;
  next?: Scraper;
}) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="More scrapers" className="grid gap-4 sm:grid-cols-2">
      {previous ? <PagerLink scraper={previous} direction="previous" /> : null}
      {next ? <PagerLink scraper={next} direction="next" /> : null}
    </nav>
  );
}
