"use client";

import { LayoutGroup, motion } from "framer-motion";

import { CATEGORIES, STATUSES, TONES } from "@/data/categories";
import {
  SCRAPER_CATEGORIES,
  SCRAPER_STATUSES,
  type ScraperCategory,
  type ScraperStatus,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export type CategoryFilter = ScraperCategory | "all";
export type StatusFilter = ScraperStatus | "all";

type PillProps = {
  active: boolean;
  onClick: () => void;
  layoutId: string;
  children: React.ReactNode;
  count?: number;
  dotClass?: string;
};

function Pill({ active, onClick, layoutId, children, count, dotClass }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors outline-none select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        active ? "text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-foreground shadow-sm"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      ) : null}
      {dotClass ? (
        <span className={cn("relative z-10 size-1.5 rounded-full", dotClass)} />
      ) : null}
      <span className="relative z-10">{children}</span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "relative z-10 rounded-full px-1.5 font-mono text-[11px] tabular-nums",
            active ? "bg-background/20" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

type Props = {
  category: CategoryFilter;
  status: StatusFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
  categoryCounts: Record<CategoryFilter, number>;
  statusCounts: Record<StatusFilter, number>;
};

export function FilterBar({
  category,
  status,
  onCategoryChange,
  onStatusChange,
  categoryCounts,
  statusCounts,
}: Props) {
  return (
    <LayoutGroup id="scraper-filters">
      <div className="flex flex-col gap-3">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-1 flex gap-1 overflow-x-auto px-1 py-0.5 scrollbar-none sm:flex-wrap sm:overflow-visible"
        >
          <Pill
            layoutId="category"
            active={category === "all"}
            onClick={() => onCategoryChange("all")}
            count={categoryCounts.all}
          >
            All
          </Pill>
          {SCRAPER_CATEGORIES.filter((key) => categoryCounts[key] > 0).map((key) => (
            <Pill
              key={key}
              layoutId="category"
              active={category === key}
              onClick={() => onCategoryChange(key)}
              count={categoryCounts[key]}
              dotClass={TONES[CATEGORIES[key].tone].dot}
            >
              {CATEGORIES[key].label}
            </Pill>
          ))}
        </div>

        <div
          role="group"
          aria-label="Filter by status"
          className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 py-0.5 scrollbar-none sm:flex-wrap sm:overflow-visible"
        >
          <span className="mr-1 shrink-0 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Status
          </span>
          <Pill
            layoutId="status"
            active={status === "all"}
            onClick={() => onStatusChange("all")}
          >
            Any
          </Pill>
          {SCRAPER_STATUSES.filter((key) => statusCounts[key] > 0).map((key) => (
            <Pill
              key={key}
              layoutId="status"
              active={status === key}
              onClick={() => onStatusChange(key)}
              count={statusCounts[key]}
              dotClass={TONES[STATUSES[key].tone].dot}
            >
              {STATUSES[key].label}
            </Pill>
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
}
