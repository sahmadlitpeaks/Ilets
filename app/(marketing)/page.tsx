import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Mic,
  NotebookPen,
  ScrollText,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EXAMS = [
  {
    name: "IELTS Academic",
    band: "Band 6.5 → 8.5",
    description:
      "All four papers modelled on the real format, with Speaking Parts 1-3 and AI-scored Task 2 essays.",
    accent: "bg-coral/10 text-[hsl(var(--coral))]",
  },
  {
    name: "TOEFL iBT",
    band: "Score 80 → 110",
    description:
      "Reading, Listening, Independent Speaking, and the new Academic Discussion writing task.",
    accent: "bg-success/15 text-[hsl(var(--success))]",
  },
  {
    name: "PTE Academic",
    band: "Score 58 → 85",
    description:
      "All 20 item types, including Read-Aloud, Describe Image, and Re-tell Lecture.",
    accent: "bg-primary/10 text-primary",
  },
  {
    name: "Duolingo English Test",
    band: "Score 110 → 150",
    description:
      "Adaptive sampler covering every question type so nothing on test day surprises you.",
    accent: "bg-accent text-accent-foreground",
  },
];

export default function LandingPage() {
  return (
    <main className="paper">
      <section className="container pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-5 gap-1.5">
            <Sparkles className="h-3 w-3" /> New: AI-scored writing on the IELTS
            Task 2 rubric
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.03] tracking-tight text-balance">
            Prepare for every English exam, with feedback that actually
            teaches.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            LinguaPrep gives you full-length mock tests for IELTS, TOEFL, PTE,
            and the Duolingo English Test, plus daily drills and AI feedback
            trained on the official band descriptors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#tests">Browse mock tests</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
              No credit card
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
              Full timing & navigation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
              Band-accurate scoring
            </span>
          </div>
        </div>
      </section>

      <section id="tests" className="container py-16">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">
            Four exams. One focused workflow.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Full-length and section-specific mocks for every major English
            proficiency exam.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {EXAMS.map((exam) => (
            <Card key={exam.name} className="overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl">{exam.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {exam.description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${exam.accent}`}
                >
                  {exam.band}
                </span>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="drills" className="container py-16">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">
            Drills that fix exactly what you&apos;re getting wrong.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every 10-question set adapts to your accuracy and surfaces the
            weakness beneath the mistake.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: ScrollText,
              title: "Reading",
              copy: "Inference, tone, summary, reference.",
            },
            {
              icon: Headphones,
              title: "Listening",
              copy: "Detail, gist, paraphrase, intent.",
            },
            {
              icon: NotebookPen,
              title: "Grammar",
              copy: "Tenses, clauses, articles, parallelism.",
            },
            {
              icon: Target,
              title: "Vocabulary",
              copy: "Collocations, register, nuance.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <Card key={title}>
              <CardContent className="pt-6">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-display text-lg">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="feedback" className="container py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Writing &amp; Speaking feedback, graded the way examiners think.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We grade your writing on Task Response, Coherence &amp; Cohesion,
              Lexical Resource, and Grammatical Range. Speaking is scored from
              a transcript plus pace, pauses, and fluency markers.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Per-criterion scores on the exam's native scale",
                "Sentence-level annotations with specific issues",
                "Three concrete improvements per attempt",
                "No model identity leaked — feedback reads like a tutor",
              ].map((t) => (
                <li key={t} className="flex gap-2 items-start">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-[hsl(var(--success))]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="font-medium">Speaking · IELTS Part 2</span>
                <Badge variant="success" className="ml-auto">
                  Band 7.5
                </Badge>
              </div>
              <blockquote className="border-l-2 pl-3 italic text-muted-foreground">
                &ldquo;You paused twice while listing reasons — planning is
                strong, but try signposting with &lsquo;Firstly… Secondly…&rsquo;
                to keep the listener oriented.&rdquo;
              </blockquote>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Fluency", 7.5],
                  ["Lexical", 7.0],
                  ["Grammar", 7.5],
                  ["Pronunciation", 8.0],
                ].map(([k, v]) => (
                  <div
                    key={String(k)}
                    className="rounded-md border px-3 py-2 flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-20">
        <Card className="overflow-hidden border-primary/20">
          <CardContent className="p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight max-w-xl">
                Start with a 15-minute diagnostic. Get a study plan in return.
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Free forever for core mocks and drills. No card required.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/signup">
                Create account <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
