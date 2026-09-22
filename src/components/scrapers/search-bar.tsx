"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({ value, onChange, placeholder, className }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  // Press "/" anywhere (outside another field) to jump to search.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      event.preventDefault();
      ref.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={ref}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? "Search scrapers, data, sources…"}
        aria-label="Search scrapers"
        className="h-10 rounded-xl bg-background pr-16 pl-9 [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1">
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              onChange("");
              ref.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </Button>
        ) : (
          <kbd className="hidden h-6 items-center rounded-md border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground sm:inline-flex">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
