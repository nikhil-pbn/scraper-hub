import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ExampleTable } from "@/lib/types";

export function OutputPreview({ tables }: { tables: ExampleTable[] }) {
  return (
    <div className="flex flex-col gap-6">
      {tables.map((table) => (
        <figure key={table.title} className="overflow-hidden rounded-2xl border bg-card/60">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3">
            <h3 className="text-sm font-medium">{table.title}</h3>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
              {table.columns.length} columns
              {table.rows.length > 0 ? ` · ${table.rows.length} rows` : ""}
            </span>
          </div>
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {table.columns.map((column) => (
                  <TableHead
                    key={column}
                    className="h-9 bg-muted/40 px-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.rows.length > 0 ? (
                table.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className={
                          cellIndex === 0
                            ? "px-3 py-2 font-mono font-medium"
                            : "px-3 py-2 font-mono text-foreground/85"
                        }
                      >
                        {cell === "" ? <span className="text-muted-foreground/50">—</span> : cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={table.columns.length}
                    className="px-3 py-6 text-center whitespace-normal text-muted-foreground"
                  >
                    No sample rows are committed yet. Columns are shown exactly as exported.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {table.caption ? (
            <figcaption className="border-t border-border/70 px-4 py-2.5 text-xs text-muted-foreground">
              {table.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
