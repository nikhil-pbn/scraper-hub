import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { GitHubIcon } from "@/components/layout/github-icon";
import { LogoMark } from "@/components/layout/logo";
import { CATEGORIES } from "@/data/categories";
import { getAllScrapers } from "@/lib/scrapers";
import { site } from "@/lib/site";

const STACK = ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"];

export function Footer() {
  const year = new Date().getFullYear();
  const usedCategories = new Set(getAllScrapers().map((scraper) => scraper.category));
  const categories = Object.entries(CATEGORIES).filter(([key]) =>
    usedCategories.has(key as keyof typeof CATEGORIES),
  );

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/20">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <LogoMark className="size-7" />
              <span className="font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  All scrapers
                </Link>
              </li>
              {categories.map(([key, category]) => (
                <li key={key}>
                  <Link
                    href="/#scrapers"
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Resources
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <GitHubIcon className="size-3.5" />
                  GitHub profile
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
            </ul>
            <h2 className="mt-8 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Built with
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {STACK.map((item) => (
                <li
                  key={item}
                  className="rounded-md border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Internal showcase of scrapers and data tools.
          </p>
          <p className="font-mono">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
