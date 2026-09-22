"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({
  query,
  onReset,
}: {
  query: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      className="flex flex-col items-center rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl border bg-background shadow-xs">
        <SearchX className="size-5 text-muted-foreground" />
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">
        No scrapers match
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {query ? (
          <>
            Nothing matches <span className="font-medium text-foreground">“{query}”</span>{" "}
            with the current filters. Try a different term or clear the filters.
          </>
        ) : (
          "Nothing matches the current filters. Try widening the category or status."
        )}
      </p>
      <Button variant="outline" size="sm" className="mt-6" onClick={onReset}>
        Clear filters
      </Button>
    </motion.div>
  );
}
