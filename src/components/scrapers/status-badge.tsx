import { STATUSES, TONES } from "@/data/categories";
import type { ScraperStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: ScraperStatus;
  className?: string;
}) {
  const meta = STATUSES[status];
  const tone = TONES[meta.tone];

  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ring-1 ring-inset",
        tone.chip,
        className,
      )}
    >
      <span className="relative flex size-1.5">
        {meta.pulse ? (
          <span
            className={cn(
              "absolute inline-flex size-full rounded-full opacity-70 motion-safe:animate-ping",
              tone.dot,
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex size-1.5 rounded-full", tone.dot)} />
      </span>
      {meta.label}
    </span>
  );
}
