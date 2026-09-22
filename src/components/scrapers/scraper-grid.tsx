"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ScraperCard } from "@/components/scrapers/scraper-card";
import type { Scraper } from "@/lib/types";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function ScraperGrid({ scrapers }: { scrapers: Scraper[] }) {
  return (
    <motion.ul
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {scrapers.map((scraper, index) => (
          <motion.li
            key={scraper.slug}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
            transition={{
              duration: 0.45,
              ease: EASE,
              delay: Math.min(index, 8) * 0.05,
            }}
            className="h-full min-w-0"
          >
            <ScraperCard scraper={scraper} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
