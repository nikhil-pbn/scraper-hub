import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading scraper">
      <section className="border-b border-border/60">
        <Container className="py-10 sm:py-14 lg:py-20">
          <Skeleton className="h-4 w-24" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
            <div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="mt-5 h-10 w-3/4" />
              <Skeleton className="mt-4 h-5 w-full" />
              <Skeleton className="mt-2 h-5 w-5/6" />
              <div className="mt-7 flex gap-3">
                <Skeleton className="h-10 w-32 rounded-lg" />
                <Skeleton className="h-10 w-28 rounded-lg" />
              </div>
              <Skeleton className="mt-9 h-20 w-full rounded-2xl" />
            </div>
            <Skeleton className="aspect-16/10 w-full rounded-2xl lg:aspect-4/3" />
          </div>
        </Container>
      </section>
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="flex flex-col gap-16">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="mt-6 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-11/12" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </Container>
    </div>
  );
}
