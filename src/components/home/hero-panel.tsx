"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ScraperIcon } from "@/components/scrapers/scraper-icon";
import { StatusBadge } from "@/components/scrapers/status-badge";
import { CATEGORIES, TONES } from "@/data/categories";
import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Decorative but functional: a glass "console" listing every scraper with its
 * destination and status. Each row links to the detail page.
 */
export function HeroPanel({ scrapers }: { scrapers: Scraper[] }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-linear-to-br from-brand/20 via-transparent to-violet-500/20 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-md dark:shadow-black/40">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/15" />
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            scraper-hub · {scrapers.length} tools
          </p>
        </div>

        <ul className="divide-y divide-border/60">
          {scrapers.map((scraper, index) => {
            const tone = TONES[CATEGORIES[scraper.category].tone];
            return (
              <motion.li
                key={scraper.slug}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.35 + index * 0.07 }}
              >
                <Link
                  href={`/scrapers/${scraper.slug}`}
                  className="group flex items-center gap-3.5 px-4 py-3 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background shadow-xs",
                    )}
                  >
                    <ScraperIcon icon={scraper.icon} className={cn("size-4", tone.icon)} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{scraper.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {scraper.source.summary}
                      <span className="mx-1.5 text-foreground/30">→</span>
                      {scraper.destination.summary}
                    </span>
                  </span>
                  <StatusBadge status={scraper.status} className="hidden xl:inline-flex" />
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground/60 transition-transform duration-300 group-hover:text-foreground motion-safe:group-hover:translate-x-0.5" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
