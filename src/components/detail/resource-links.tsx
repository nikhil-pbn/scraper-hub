import { ArrowUpRight, BookOpen, FileSpreadsheet, Globe, Link2, Lock, type LucideProps } from "lucide-react";

import { GitHubIcon } from "@/components/layout/github-icon";
import { hostname } from "@/lib/scrapers";
import type { ResourceLink, Scraper } from "@/lib/types";

const ICONS: Record<NonNullable<ResourceLink["kind"]>, React.ComponentType<LucideProps>> = {
  live: Globe,
  github: GitHubIcon as React.ComponentType<LucideProps>,
  docs: BookOpen,
  sheet: FileSpreadsheet,
  other: Link2,
};

/** Flattens live URL, repository and extra resources into one list. */
export function collectLinks(scraper: Scraper): ResourceLink[] {
  const links: ResourceLink[] = [];
  if (scraper.liveUrl) {
    links.push({
      label: "Live scraper",
      href: scraper.liveUrl,
      description: hostname(scraper.liveUrl),
      kind: "live",
    });
  }
  if (scraper.githubUrl) {
    links.push({
      label: scraper.githubPrivate ? "GitHub repository (private)" : "GitHub repository",
      href: scraper.githubUrl,
      description: scraper.githubPrivate
        ? "Requires access to the repository"
        : scraper.githubUrl.replace(/^https?:\/\/github\.com\//, ""),
      kind: "github",
    });
  }
  for (const link of scraper.resources ?? []) links.push({ kind: "other", ...link });
  return links;
}

export function ResourceLinks({ links }: { links: ResourceLink[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => {
        const Icon = ICONS[link.kind ?? "other"];
        const isPrivate = link.kind === "github" && link.label.includes("private");
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-start gap-3.5 rounded-xl border bg-card/60 p-4 transition-[border-color,background-color,box-shadow] outline-none hover:border-brand/50 hover:bg-card hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground/80 shadow-xs">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {link.label}
                  {isPrivate ? <Lock className="size-3 text-muted-foreground" /> : null}
                </span>
                {link.description ? (
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {link.description}
                  </span>
                ) : null}
              </span>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground/60 transition-[color,transform] group-hover:text-brand motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
