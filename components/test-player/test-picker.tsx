import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TestCatalogEntry } from "@/lib/test-data";
import type { TestType } from "@/types";

const SECTION_ORDER: Record<TestType, string[]> = {
  ielts: [
    "Listening (30 min)",
    "Reading (60 min)",
    "Writing (60 min)",
    "Speaking (11-14 min)",
  ],
  toefl: [
    "Reading (35 min)",
    "Listening (36 min)",
    "Speaking (16 min)",
    "Writing (~30 min)",
  ],
  pte: [
    "Speaking & Writing (54-67 min)",
    "Reading (29-30 min)",
    "Listening (30-43 min)",
  ],
  det: ["Adaptive, mixed format (~45 min)"],
};

export function TestPicker({
  testType,
  tests,
  selectedSlug,
}: {
  testType: TestType;
  tests: TestCatalogEntry[];
  selectedSlug?: string;
}) {
  const selected = tests.find((t) => t.slug === selectedSlug) ?? tests[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {testType.toUpperCase()} structure
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {SECTION_ORDER[testType].map((s) => (
              <li
                key={s}
                className="rounded-md border bg-card px-3 py-2 text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Available mocks
          </p>
          <ul className="space-y-2">
            {tests.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tests/${testType}?slug=${t.slug}`}
                  className={`block rounded-md border px-3 py-2 text-sm transition-colors ${
                    t.slug === selected.slug
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {t.durationMinutes}m
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    {t.section}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="uppercase">
              {selected.testType}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {selected.section}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {selected.durationMinutes} min
            </span>
          </div>
          <h1 className="font-display text-3xl">{selected.title}</h1>
          <p className="text-muted-foreground">{selected.description}</p>
          <p className="text-sm text-muted-foreground">
            {selected.content.overview}
          </p>
          <div className="pt-2">
            <Button size="lg" asChild>
              <Link href={`/tests/${testType}/take/${selected.slug}`}>
                Begin test <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
