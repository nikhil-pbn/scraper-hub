import type { WorkflowStep } from "@/lib/types";

export function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium shadow-xs tabular-nums">
                {index + 1}
              </span>
              {!last ? <span className="mt-2 w-px flex-1 bg-border" /> : null}
            </div>
            <div className="pt-1">
              <h3 className="text-sm font-medium sm:text-base">{step.title}</h3>
              {step.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
