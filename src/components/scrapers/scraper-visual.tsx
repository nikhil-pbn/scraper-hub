import Image from "next/image";

import { ScraperIcon } from "@/components/scrapers/scraper-icon";
import { CATEGORIES, TONES } from "@/data/categories";
import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  scraper: Pick<Scraper, "slug" | "name" | "icon" | "category" | "image">;
  variant?: "card" | "hero";
  className?: string;
  /** Passed to next/image `sizes` when a real screenshot is available. */
  sizes?: string;
};

/** Small deterministic hash so placeholder rows differ per scraper but never between renders. */
function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function widths(seed: string, count: number) {
  const out: number[][] = [];
  for (let row = 0; row < count; row += 1) {
    const h = hash(`${seed}:${row}`);
    out.push([28 + (h % 20), 18 + ((h >> 5) % 26), 12 + ((h >> 11) % 16)]);
  }
  return out;
}

/**
 * Scraper artwork. Renders the real screenshot when `image` is set; otherwise a
 * tasteful generated placeholder tinted by category, so a screenshot can be dropped
 * into /public later without touching any component.
 */
export function ScraperVisual({ scraper, variant = "card", className, sizes }: Props) {
  const tone = TONES[CATEGORIES[scraper.category].tone];
  const hero = variant === "hero";

  if (scraper.image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={scraper.image.src}
          alt={scraper.image.alt}
          fill
          sizes={sizes ?? (hero ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw")}
          priority={hero}
          className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const rows = widths(scraper.slug, hero ? 7 : 4);

  return (
    <div
      aria-hidden
      className={cn(
        "relative h-full w-full overflow-hidden bg-linear-to-br",
        tone.gradient,
        "bg-muted/40 dark:bg-muted/20",
        className,
      )}
    >
      <div className="absolute inset-0 bg-dots opacity-70 mask-fade-b" />
      <div
        className={cn(
          "absolute -top-16 -right-16 rounded-full blur-3xl",
          hero ? "size-72" : "size-40",
          tone.glow,
        )}
      />

      {/* Mock data panel */}
      <div
        className={cn(
          "absolute inset-x-[10%] -bottom-2 top-[30%] flex flex-col overflow-hidden rounded-t-xl border border-border/70 bg-card/90 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.25)] backdrop-blur transition-transform duration-500 ease-out",
          "motion-safe:group-hover:-translate-y-1.5",
          hero && "inset-x-[8%] top-[22%]",
        )}
      >
        <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2">
          <span className="size-1.5 rounded-full bg-foreground/15" />
          <span className="size-1.5 rounded-full bg-foreground/15" />
          <span className="size-1.5 rounded-full bg-foreground/15" />
          <span className="ml-2 h-1.5 w-16 rounded-full bg-foreground/10" />
        </div>
        <div className={cn("grid gap-2 p-3", hero && "gap-2.5 p-4")}>
          <div className="flex gap-2">
            {[36, 24, 18].map((w, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full bg-foreground/20"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          {rows.map((cells, r) => (
            <div key={r} className="flex items-center gap-2">
              <span className={cn("size-1.5 shrink-0 rounded-full", tone.dot, "opacity-70")} />
              {cells.map((w, c) => (
                <span
                  key={c}
                  className="h-1.5 rounded-full bg-foreground/10"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Icon tile */}
      <div
        className={cn(
          "absolute top-[12%] left-[8%] flex items-center justify-center rounded-xl border border-border/70 bg-background/90 shadow-md backdrop-blur transition-transform duration-500 ease-out motion-safe:group-hover:scale-105",
          hero ? "size-16 rounded-2xl" : "size-11",
        )}
      >
        <ScraperIcon
          icon={scraper.icon}
          className={cn(tone.icon, hero ? "size-7" : "size-5")}
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}
