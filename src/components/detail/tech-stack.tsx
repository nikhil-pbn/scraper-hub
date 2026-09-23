import type { TechKind, Technology } from "@/lib/types";

const ORDER: TechKind[] = ["framework", "language", "library", "api", "infra", "technique"];

const LABELS: Record<TechKind, string> = {
  framework: "Frameworks",
  language: "Languages",
  library: "Libraries",
  api: "APIs & services",
  infra: "Infrastructure",
  technique: "Techniques",
};

export function TechStack({ technologies }: { technologies: Technology[] }) {
  const groups = ORDER.map((kind) => ({
    kind,
    items: technologies.filter((tech) => tech.kind === kind),
  })).filter((group) => group.items.length > 0);

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.kind}>
          <dt className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            {LABELS[group.kind]}
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {group.items.map((tech) => (
              <span
                key={tech.name}
                className="rounded-lg border bg-card px-2.5 py-1 font-mono text-xs text-foreground/90"
              >
                {tech.name}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
