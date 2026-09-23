import type { DataField } from "@/lib/types";

function groupFields(fields: DataField[]) {
  const groups = new Map<string, DataField[]>();
  for (const field of fields) {
    const key = field.group ?? "";
    const list = groups.get(key) ?? [];
    list.push(field);
    groups.set(key, list);
  }
  return [...groups.entries()];
}

export function DataFieldGrid({ fields }: { fields: DataField[] }) {
  const groups = groupFields(fields);

  return (
    <div className="flex flex-col gap-8">
      {groups.map(([group, items]) => (
        <div key={group || "default"}>
          {group ? (
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {group}
              <span className="h-px flex-1 bg-border" />
              <span className="tabular-nums">{items.length}</span>
            </h3>
          ) : null}
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((field) => (
              <li
                key={field.name}
                className="flex flex-col gap-1 rounded-xl border bg-card/60 px-3.5 py-3 transition-colors hover:bg-card"
              >
                <code className="font-mono text-sm font-medium text-foreground">
                  {field.name}
                </code>
                {field.description ? (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {field.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
