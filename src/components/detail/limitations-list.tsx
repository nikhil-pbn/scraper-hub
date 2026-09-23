import { TriangleAlert } from "lucide-react";

export function LimitationsList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-sm leading-relaxed dark:bg-amber-500/8"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}
