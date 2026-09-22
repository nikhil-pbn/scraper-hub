import { cn } from "@/lib/utils";

/** Hub mark: a centre node with three spokes. Reused by the favicon and OG images. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-brand to-violet-600 text-white shadow-sm ring-1 ring-black/10 dark:ring-white/10",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[62%]">
        <circle cx="12" cy="12" r="2.6" fill="currentColor" />
        <circle cx="5" cy="6" r="1.9" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="19" cy="6" r="1.9" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="20" r="1.9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M10.1 10.4 6.4 7.3M13.9 10.4l3.7-3.1M12 14.6v3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
