import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs font-medium tracking-wider text-brand uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        That page isn&apos;t in the hub
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The scraper you are looking for may have been renamed or removed. Every documented
        scraper is listed on the home page.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to all scrapers
        </Link>
      </Button>
    </Container>
  );
}
