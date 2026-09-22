import { ProjectCard } from "@/components/home/project-card";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-20 border-t border-border/60 bg-muted/20 py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-medium tracking-wider text-brand uppercase">
                Beyond scrapers
              </p>
              <h2
                id="projects-title"
                className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                More projects
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Internal tools and dashboards built alongside the scrapers. Lighter cards, no
              deep dive: just what each one is and where to find it.
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 6) * 0.05} className="h-full min-w-0">
              <li className="h-full list-none">
                <ProjectCard project={project} />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
