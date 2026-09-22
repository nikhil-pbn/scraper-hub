"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EmptyState } from "@/components/scrapers/empty-state";
import {
  FilterBar,
  type CategoryFilter,
  type StatusFilter,
} from "@/components/scrapers/filter-bar";
import { ScraperGrid } from "@/components/scrapers/scraper-grid";
import { SearchBar } from "@/components/scrapers/search-bar";
import { Button } from "@/components/ui/button";
import { countByCategory, countByStatus, filterScrapers } from "@/lib/scrapers";
import type { Scraper } from "@/lib/types";

export function ScraperExplorer({ scrapers }: { scrapers: Scraper[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const results = useMemo(
    () => filterScrapers(scrapers, { query, category, status }),
    [scrapers, query, category, status],
  );

  // Counts reflect the other active filters so the numbers stay honest as you narrow down.
  const categoryCounts = useMemo(
    () => countByCategory(filterScrapers(scrapers, { query, status })),
    [scrapers, query, status],
  );
  const statusCounts = useMemo(
    () => countByStatus(filterScrapers(scrapers, { query, category })),
    [scrapers, query, category],
  );

  const filtered = query !== "" || category !== "all" || status !== "all";

  function reset() {
    setQuery("");
    setCategory("all");
    setStatus("all");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border bg-card/60 p-3 shadow-xs backdrop-blur-sm sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-6">
          <SearchBar value={query} onChange={setQuery} className="lg:w-80 lg:shrink-0" />
          <div className="min-w-0 flex-1">
            <FilterBar
              category={category}
              status={status}
              onCategoryChange={setCategory}
              onStatusChange={setStatus}
              categoryCounts={categoryCounts}
              statusCounts={statusCounts}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <p aria-live="polite">
          Showing{" "}
          <span className="font-medium text-foreground tabular-nums">
            {results.length}
          </span>{" "}
          of {scrapers.length} scrapers
        </p>
        <AnimatePresence initial={false}>
          {filtered ? (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="ghost" size="sm" onClick={reset}>
                Clear filters
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {results.length > 0 ? (
        <ScraperGrid scrapers={results} />
      ) : (
        <EmptyState query={query} onReset={reset} />
      )}
    </div>
  );
}
