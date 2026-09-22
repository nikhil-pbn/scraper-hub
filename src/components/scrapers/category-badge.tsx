import { CATEGORIES, TONES } from "@/data/categories";
import type { ScraperCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryBadge({
  category,
  className,
}: {
  category: ScraperCategory;
  className?: string;
}) {
  const meta = CATEGORIES[category];
  const tone = TONES[meta.tone];

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ring-1 ring-inset",
        tone.chip,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
