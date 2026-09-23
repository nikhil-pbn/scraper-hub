import { ArrowDown } from "lucide-react";

import { HeroPanel } from "@/components/home/hero-panel";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getHubStats } from "@/lib/scrapers";
import { site } from "@/lib/site";
import type { Scraper } from "@/lib/types";

export function Hero({ scrapers }: { scrapers: Scraper[] }) {
  const stats = getHubStats(scrapers);

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.35] mask-fade-b" />
      <div className="absolute -top-32 left-1/2 -z-10 h-105 w-205 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl dark:bg-brand/15" />
      <div className="absolute top-24 right-[-10%] -z-10 hidden h-72 w-72 rounded-full bg-violet-500/15 blur-3xl lg:block" />

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-2xl">
            <Reveal mode="mount">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-brand opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                </span>
                <span className="font-mono tabular-nums">{stats.total}</span> scrapers documented
              </p>
            </Reveal>

            <Reveal mode="mount" delay={0.06}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                {site.name}
              </h1>
            </Reveal>

            <Reveal mode="mount" delay={0.12}>
              <p className="mt-4 text-xl font-medium tracking-tight sm:text-2xl">
                <span className="bg-linear-to-r from-foreground to-foreground/55 bg-clip-text text-transparent">
                  {site.tagline}
                </span>
              </p>
            </Reveal>

            <Reveal mode="mount" delay={0.18}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {site.description}
              </p>
            </Reveal>

            <Reveal mode="mount" delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-10 px-4">
                  <a href="#scrapers">
                    Browse scrapers
                    <ArrowDown className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-10 px-4">
                  <a href="#projects">More projects</a>
                </Button>
              </div>
            </Reveal>

            <Reveal mode="mount" delay={0.3}>
              <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-border/70 rounded-2xl border bg-card/60 text-center shadow-xs backdrop-blur-sm">
                {[
                  { label: "Scrapers", value: stats.total },
                  { label: "Categories", value: stats.categories },
                  { label: "Live tools", value: stats.live },
                ].map((stat) => (
                  <div key={stat.label} className="px-3 py-4">
                    <dd className="text-2xl font-semibold tracking-tight tabular-nums">
                      {stat.value}
                    </dd>
                    <dt className="mt-0.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal mode="mount" delay={0.2} className="hidden lg:block">
            <HeroPanel scrapers={scrapers} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
