import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AtAGlance } from "@/components/detail/at-a-glance";
import { DataFieldGrid } from "@/components/detail/data-field-grid";
import { DataFlow } from "@/components/detail/data-flow";
import { DetailSection } from "@/components/detail/detail-section";
import { InputList } from "@/components/detail/input-list";
import { LimitationsList } from "@/components/detail/limitations-list";
import { OutputPreview } from "@/components/detail/output-preview";
import { ResourceLinks, collectLinks } from "@/components/detail/resource-links";
import { ScraperHero } from "@/components/detail/scraper-hero";
import { ScraperPager } from "@/components/detail/scraper-pager";
import { TechStack } from "@/components/detail/tech-stack";
import { WorkflowSteps } from "@/components/detail/workflow-steps";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CATEGORIES } from "@/data/categories";
import { getAdjacentScrapers, getAllScrapers, getScraperBySlug } from "@/lib/scrapers";
import type { Scraper } from "@/lib/types";

export function generateStaticParams() {
  return getAllScrapers().map((scraper) => ({ slug: scraper.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/scrapers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const scraper = getScraperBySlug(slug);
  if (!scraper) return { title: "Scraper not found" };

  const description = scraper.tagline;
  return {
    title: scraper.name,
    description,
    keywords: [scraper.name, CATEGORIES[scraper.category].label, ...scraper.keyData],
    alternates: { canonical: `/scrapers/${scraper.slug}` },
    openGraph: {
      type: "article",
      title: scraper.name,
      description,
      url: `/scrapers/${scraper.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: scraper.name,
      description,
    },
  };
}

type Section = { id: string; title: string; description?: string; content: React.ReactNode };

/** Only sections with data are built, so numbering stays contiguous. */
function buildSections(scraper: Scraper): Section[] {
  const sections: Section[] = [];
  const links = collectLinks(scraper);

  if (scraper.description.length > 0) {
    sections.push({
      id: "what-it-does",
      title: "What it does",
      content: (
        <div className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-foreground/85">
          {scraper.description.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      ),
    });
  }

  if (scraper.howItWorks?.length) {
    sections.push({
      id: "how-it-works",
      title: "How it works",
      description: "High-level workflow from input to result.",
      content: <WorkflowSteps steps={scraper.howItWorks} />,
    });
  }

  if (scraper.input?.length) {
    sections.push({
      id: "input",
      title: "Input",
      description: "What you provide before a run.",
      content: <InputList fields={scraper.input} />,
    });
  }

  if (scraper.dataCollected?.length) {
    sections.push({
      id: "data-collected",
      title: "Data collected",
      description: `${scraper.dataCollected.length} fields captured per record.`,
      content: <DataFieldGrid fields={scraper.dataCollected} />,
    });
  }

  sections.push({
    id: "data-flow",
    title: "Data source & destination",
    description: "Where the information comes from and where the results end up.",
    content: <DataFlow scraper={scraper} />,
  });

  if (scraper.output?.length) {
    sections.push({
      id: "output",
      title: "Output",
      content: (
        <ul className="flex max-w-3xl flex-col gap-3">
          {scraper.output.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="flex gap-3 text-base leading-relaxed text-foreground/85"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (scraper.technologies?.length) {
    sections.push({
      id: "technology",
      title: "Technology",
      content: <TechStack technologies={scraper.technologies} />,
    });
  }

  if (scraper.exampleOutputs?.length) {
    sections.push({
      id: "example-output",
      title: "Example output",
      content: <OutputPreview tables={scraper.exampleOutputs} />,
    });
  }

  if (scraper.limitations?.length) {
    sections.push({
      id: "limitations",
      title: "Limitations",
      description: "Caps, API restrictions and caveats worth knowing before relying on the data.",
      content: <LimitationsList items={scraper.limitations} />,
    });
  }

  if (links.length > 0) {
    sections.push({
      id: "links",
      title: "Links",
      content: <ResourceLinks links={links} />,
    });
  }

  return sections;
}

export default async function ScraperPage({ params }: PageProps<"/scrapers/[slug]">) {
  const { slug } = await params;
  const scraper = getScraperBySlug(slug);
  if (!scraper) notFound();

  const sections = buildSections(scraper);
  const { previous, next } = getAdjacentScrapers(slug);

  return (
    <>
      <ScraperHero scraper={scraper} />

      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-16">
            {sections.map((section, index) => (
              <DetailSection
                key={section.id}
                id={section.id}
                index={index + 1}
                title={section.title}
                description={section.description}
              >
                {section.content}
              </DetailSection>
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <AtAGlance
                scraper={scraper}
                sections={sections.map(({ id, title }) => ({ id, title }))}
              />
            </div>
          </aside>
        </div>

        <Reveal className="mt-20">
          <ScraperPager previous={previous} next={next} />
        </Reveal>
      </Container>
    </>
  );
}
