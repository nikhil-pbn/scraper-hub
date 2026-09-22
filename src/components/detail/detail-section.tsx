import { Reveal } from "@/components/motion/reveal";

type Props = {
  id: string;
  index: number;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function DetailSection({ id, index, title, description, children }: Props) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
        <header className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-xs font-medium text-brand tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </header>
        {children}
      </section>
    </Reveal>
  );
}
