import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TestCatalogEntry } from "@/lib/test-data";
import type { SectionType, TestType } from "@/types";

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

const SECTION_LABEL: Record<SectionType, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
  full: "Mixed",
};

const SECTION_DISPLAY_ORDER: SectionType[] = [
  "listening",
  "reading",
  "writing",
  "speaking",
  "full",
];

function groupBySection(tests: TestCatalogEntry[]) {
  const groups = new Map<SectionType, TestCatalogEntry[]>();
  for (const t of tests) {
    const arr = groups.get(t.section) ?? [];
    arr.push(t);
    groups.set(t.section, arr);
  }
  return SECTION_DISPLAY_ORDER.map((section) => ({
    section,
    tests: groups.get(section) ?? [],
  })).filter((g) => g.tests.length > 0);
}

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
  const grouped = groupBySection(tests);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="space-y-5">
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
            {tests.length} practice tests
          </p>
          <div className="space-y-4">
            {grouped.map(({ section, tests: group }) => (
              <div key={section}>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  {SECTION_LABEL[section]} · {group.length}
                </p>
                <ul className="space-y-1.5">
                  {group.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tests/${testType}?slug=${t.slug}`}
                        className={`block rounded-md border px-3 py-2 text-sm transition-colors ${
                          t.slug === selected.slug
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium leading-snug">
                            {t.title}
                          </span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {t.durationMinutes}m
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="uppercase">
              {selected.testType}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {SECTION_LABEL[selected.section]}
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
