import { SlidersHorizontal } from "lucide-react";

import type { InputField } from "@/lib/types";

export function InputList({ fields }: { fields: InputField[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <li
          key={field.label}
          className="flex gap-3 rounded-xl border bg-card/60 p-4 transition-colors hover:bg-card"
        >
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <SlidersHorizontal className="size-3.5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-medium">{field.label}</h3>
            {field.description ? (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {field.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
