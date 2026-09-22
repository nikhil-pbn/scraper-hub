import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Lock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { GitHubIcon } from "@/components/layout/github-icon";
import { Reveal } from "@/components/motion/reveal";
import { CategoryBadge } from "@/components/scrapers/category-badge";
import { ScraperVisual } from "@/components/scrapers/scraper-visual";
import { StatusBadge } from "@/components/scrapers/status-badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TONES } from "@/data/categories";
import { formatDate } from "@/lib/scrapers";
import type { Scraper } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ScraperHero({ scraper }: { scraper: Scraper }) {
  const tone = TONES[CATEGORIES[scraper.category].tone];
  const docs = scraper.resources?.find((link) => link.kind === "docs");

  const facts = [
    { label: "Source", value: scraper.source.summary },
    { label: "Destination", value: scraper.destination.summary },
    { label: "Runs on", value: scraper.runsOn },
    {
      label: "Last updated",
      value: scraper.lastUpdated ? formatDate(scraper.lastUpdated) : undefined,
    },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.3] mask-fade-b" />
      <div
        className={cn(
          "absolute -top-40 left-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 rounded-full opacity-40 blur-3xl",
          tone.glow,
        )}
      />

      <Container className="py-10 sm:py-14 lg:py-20">
        <Reveal mode="mount" y={8}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-4" />
            All scrapers
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal mode="mount" delay={0.05}>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={scraper.category} />
                <StatusBadge status={scraper.status} />
              </div>
            </Reveal>

            <Reveal mode="mount" delay={0.1}>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                {scraper.name}
              </h1>
            </Reveal>

            <Reveal mode="mount" delay={0.15}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {scraper.tagline}
              </p>
            </Reveal>

            <Reveal mode="mount" delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {scraper.liveUrl ? (
                  <Button asChild size="lg" className="h-10 px-4">
                    <a href={scraper.liveUrl} target="_blank" rel="noreferrer">
                      Live scraper
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                ) : null}
                {scraper.githubUrl ? (
                  <Button asChild size="lg" variant="outline" className="h-10 px-4">
                    <a
                      href={scraper.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      title={scraper.githubPrivate ? "Private repository, requires access" : undefined}
                    >
                      <GitHubIcon />
                      GitHub
                      {scraper.githubPrivate ? (
                        <Lock className="size-3.5 opacity-60" aria-label="Private repository" />
                      ) : (
                        <ArrowUpRight className="size-3.5 opacity-60" />
                      )}
                    </a>
                  </Button>
                ) : null}
                {docs ? (
                  <Button asChild size="lg" variant="ghost" className="h-10 px-4">
                    <a href={docs.href} target="_blank" rel="noreferrer">
                      <BookOpen className="size-4" />
                      {docs.label}
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>

            {facts.length > 0 ? (
              <Reveal mode="mount" delay={0.26}>
                <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border/60 shadow-xs sm:grid-cols-4">
                  {facts.map((fact) => (
                    <div key={fact.label} className="bg-card/80 px-4 py-3.5 backdrop-blur-sm">
                      <dt className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium leading-snug text-pretty">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>

          <Reveal mode="mount" delay={0.15} y={24}>
            <div className="group relative">
              <div
                className={cn(
                  "absolute -inset-4 -z-10 rounded-[2rem] opacity-50 blur-2xl",
                  tone.glow,
                )}
              />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 lg:aspect-[4/3] dark:shadow-black/40">
                <ScraperVisual scraper={scraper} variant="hero" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
