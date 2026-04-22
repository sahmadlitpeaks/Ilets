"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flag, FlagOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/toaster";
import { QuestionNavigator } from "@/components/test-player/question-navigator";
import { Timer } from "@/components/test-player/timer";
import { QuestionRenderer } from "@/components/question-types";
import { autoScoreQuestions } from "@/lib/auto-score";
import type { AnswerMap, TestType } from "@/types";
import type { TestCatalogEntry } from "@/lib/test-data";

const LS_PREFIX = "linguaprep.attempt.";

function flattenQuestions(test: TestCatalogEntry) {
  return test.content.sections.flatMap((s) =>
    s.questions.map((q) => ({
      section: s,
      question: q,
    }))
  );
}

export function TestPlayer({ test }: { test: TestCatalogEntry }) {
  const router = useRouter();
  const { toast } = useToast();
  const storageKey = `${LS_PREFIX}${test.slug}`;

  const flat = React.useMemo(() => flattenQuestions(test), [test]);
  const [answers, setAnswers] = React.useState<AnswerMap>({});
  const [current, setCurrent] = React.useState(0);
  const [flagged, setFlagged] = React.useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.current === "number") setCurrent(parsed.current);
        if (Array.isArray(parsed.flagged))
          setFlagged(new Set(parsed.flagged));
      }
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            answers,
            current,
            flagged: Array.from(flagged),
            savedAt: Date.now(),
          })
        );
      } catch {
        /* storage full */
      }
    }, 10_000);
    return () => clearInterval(interval);
  }, [answers, current, flagged, storageKey]);

  const active = flat[current];

  const answered = React.useMemo(() => {
    const set = new Set<number>();
    flat.forEach(({ question }, i) => {
      const v = answers[question.id];
      if (v === undefined || v === null) return;
      if (typeof v === "string" && v.length === 0) return;
      if (Array.isArray(v) && v.length === 0) return;
      if (
        typeof v === "object" &&
        v !== null &&
        !Array.isArray(v) &&
        Object.keys(v).length === 0
      )
        return;
      set.add(i);
    });
    return set;
  }, [answers, flat]);

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  }

  async function submit(options: { autoExpire?: boolean } = {}) {
    if (submitting) return;
    setSubmitting(true);

    try {
      const allQuestions = flat.map((f) => f.question);
      const auto = autoScoreQuestions(allQuestions, answers);

      const res = await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          testSlug: test.slug,
          testType: test.testType,
          answers: {
            ...answers,
            _auto: auto,
          },
          autoScore: auto.total > 0 ? Math.round(auto.accuracy * 100) : null,
          status: "completed",
        }),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      const data = await res.json();

      const needsAiFeedback = flat.some(
        (f) => f.question.type === "essay" || f.question.type === "speaking"
      );

      if (needsAiFeedback) {
        await requestAiFeedback(
          test.testType,
          test,
          answers,
          data.attemptId
        );
      }

      localStorage.removeItem(storageKey);
      router.push(`/results/${data.attemptId}`);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Couldn't submit attempt",
        description: err instanceof Error ? err.message : "Try again.",
      });
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {test.testType.toUpperCase()} · {active.section.title}
            </p>
            <h1 className="font-display text-2xl">{test.title}</h1>
          </div>
          <Timer
            durationSeconds={test.durationMinutes * 60}
            onExpire={() => submit({ autoExpire: true })}
            onWarn={() =>
              toast({
                title: "5 minutes remaining",
                description:
                  "The test will auto-submit when the timer reaches 0.",
              })
            }
          />
        </div>

        {active.section.passage && (
          <Card>
            <CardContent className="pt-6 max-h-[45vh] overflow-auto leading-relaxed whitespace-pre-line text-sm">
              {active.section.passage}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              Question {current + 1} of {flat.length}
            </p>
            <Button variant="ghost" size="sm" onClick={toggleFlag}>
              {flagged.has(current) ? (
                <>
                  <FlagOff className="h-4 w-4" /> Unflag
                </>
              ) : (
                <>
                  <Flag className="h-4 w-4" /> Flag for review
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <QuestionRenderer
              question={active.question}
              value={answers[active.question.id]}
              onChange={(v) =>
                setAnswers((prev) => ({ ...prev, [active.question.id]: v }))
              }
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          {current < flat.length - 1 ? (
            <Button
              onClick={() => setCurrent((c) => Math.min(flat.length - 1, c + 1))}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => submit()}
              disabled={submitting}
              variant="coral"
            >
              {submitting ? "Submitting..." : "Submit test"}
            </Button>
          )}
        </div>
      </div>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <h3 className="font-display text-sm">Navigator</h3>
            <p className="text-xs text-muted-foreground">
              {answered.size} / {flat.length} answered
            </p>
          </CardHeader>
          <CardContent>
            <QuestionNavigator
              total={flat.length}
              current={current}
              answered={answered}
              flagged={flagged}
              onJump={setCurrent}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-xs text-muted-foreground space-y-2">
            <p>
              Your answers save automatically every 10 seconds. You can safely
              close this tab and resume later.
            </p>
            <p>
              When the timer reaches 0 the test will submit whatever is in the
              navigator — including unfinished answers.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

async function requestAiFeedback(
  testType: TestType,
  test: TestCatalogEntry,
  answers: AnswerMap,
  attemptId: string
) {
  for (const section of test.content.sections) {
    for (const question of section.questions) {
      if (question.type === "essay") {
        const essay = (answers[question.id] as string | undefined) ?? "";
        if (essay.trim().length < 30) continue;
        try {
          await fetch("/api/feedback/writing", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              testType,
              prompt: question.prompt,
              essay,
              task: question.task,
              attemptId,
            }),
          });
        } catch (err) {
          console.error("writing feedback failed", err);
        }
      } else if (question.type === "speaking") {
        const ans = answers[question.id] as
          | { transcript?: string; durationSeconds?: number }
          | undefined;
        if (!ans?.transcript || ans.transcript.trim().length < 5) continue;
        try {
          await fetch("/api/feedback/speaking", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              testType,
              prompt: question.prompt,
              transcript: ans.transcript,
              audioSeconds: ans.durationSeconds ?? 0,
              pauseCount: 0,
              attemptId,
            }),
          });
        } catch (err) {
          console.error("speaking feedback failed", err);
        }
      }
    }
  }
}
