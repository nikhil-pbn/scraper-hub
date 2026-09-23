import { ArrowUpRight, Gauge, Globe, Wrench, type LucideProps } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PROJECT_KINDS_META, TONES } from "@/data/categories";
import { formatDate, hostname } from "@/lib/scrapers";
import type { Project, ProjectKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_ICONS: Record<ProjectKind, React.ComponentType<LucideProps>> = {
  "internal-tool": Wrench,
  dashboard: Gauge,
  website: Globe,
};

const MAX_STACK = 4;

export function ProjectCard({ project }: { project: Project }) {
  const meta = PROJECT_KINDS_META[project.kind];
  const tone = TONES[meta.tone];
  const Icon = KIND_ICONS[project.kind];
  const extraStack = (project.stack?.length ?? 0) - MAX_STACK;

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs transition-[border-color,box-shadow,transform] duration-300",
        "hover:shadow-lg hover:shadow-black/5 motion-safe:hover:-translate-y-0.5 dark:hover:shadow-black/40",
        tone.border,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-xs">
          <Icon className={cn("size-4.5", tone.icon)} strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ring-1 ring-inset",
            tone.chip,
          )}
        >
          {meta.label}
        </span>
      </div>

      <div>
        <h3 className="text-base font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>

      {project.stack && project.stack.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.slice(0, MAX_STACK).map((item) => (
            <li
              key={item}
              className="rounded-md border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground/80"
            >
              {item}
            </li>
          ))}
          {extraStack > 0 ? (
            <li className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              +{extraStack} more
            </li>
          ) : null}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
        {project.liveUrl ? (
          <Button asChild size="sm" className="gap-1">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live
              <ArrowUpRight className="size-3.5" />
              <span className="sr-only">(opens {hostname(project.liveUrl)} in a new tab)</span>
            </a>
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">No public link yet</span>
        )}
        {project.lastUpdated ? (
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {formatDate(project.lastUpdated)}
          </span>
        ) : null}
      </div>
    </article>
  );
}
