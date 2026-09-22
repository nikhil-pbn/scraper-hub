import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects-section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ScraperExplorer } from "@/components/scrapers/scraper-explorer";
import { getAllProjects } from "@/lib/projects";
import { getAllScrapers } from "@/lib/scrapers";

export default function HomePage() {
  const scrapers = getAllScrapers();
  const projects = getAllProjects();

  return (
    <>
      <Hero scrapers={scrapers} />

      <section id="scrapers" className="scroll-mt-20 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs font-medium tracking-wider text-brand uppercase">
                  Library
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  All scrapers
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Search by name, data field or technology, or narrow down by category and
                status. Open any card for the full breakdown.
              </p>
            </div>
          </Reveal>
          <ScraperExplorer scrapers={scrapers} />
        </Container>
      </section>

      <ProjectsSection projects={projects} />
    </>
  );
}
