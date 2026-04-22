"use client";

import * as React from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toaster";
import { QuestionRenderer } from "@/components/question-types";
import { autoScoreQuestions } from "@/lib/auto-score";
import type { Question } from "@/types";
import { cn } from "@/lib/utils";

interface DrillRunnerProps {
  skill: "grammar" | "vocabulary" | "reading" | "listening";
  title: string;
  questions: Question[];
}

export function DrillRunner({ skill, title, questions }: DrillRunnerProps) {
  const { toast } = useToast();
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, unknown>>({});
  const [revealed, setRevealed] = React.useState<Set<string>>(new Set());
  const [done, setDone] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const q = questions[current];
  const total = questions.length;

  const check = () => {
    setRevealed((prev) => new Set(prev).add(q.id));
  };

  const next = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
      persist();
    }
  };

  async function persist() {
    setSaving(true);
    const result = autoScoreQuestions(questions, answers);
    try {
      await fetch("/api/drills/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          skill,
          attempted: result.total,
          correct: result.correct,
        }),
      });
    } catch {
      toast({
        title: "Couldn't save session",
        description: "Your score is still shown below.",
      });
    } finally {
      setSaving(false);
    }
  }

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setRevealed(new Set());
    setDone(false);
  };

  if (done) {
    const result = autoScoreQuestions(questions, answers);
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <h2 className="font-display text-3xl">
            {result.correct} / {result.total}
          </h2>
          <p className="text-sm text-muted-foreground">
            Accuracy: {Math.round(result.accuracy * 100)}%
            {saving ? " · saving..." : ""}
          </p>
          <Button onClick={restart}>
            <RotateCcw className="h-4 w-4" /> Run again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isRevealed = revealed.has(q.id);
  const currentAnswer = answers[q.id];

  let isCorrect: boolean | null = null;
  if (isRevealed && q.type === "mcq-single") {
    const picked = (currentAnswer as string[] | undefined) ?? [];
    isCorrect = picked.length === 1 && picked[0] === q.correct[0];
  } else if (isRevealed && q.type === "mcq-multi") {
    const picked = (currentAnswer as string[] | undefined) ?? [];
    const expected = [...q.correct].sort().join(",");
    isCorrect = [...picked].sort().join(",") === expected;
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <header>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {skill} drill
        </p>
        <h1 className="font-display text-2xl">{title}</h1>
      </header>
      <Progress value={((current + 1) / total) * 100} />
      <p className="text-xs text-muted-foreground">
        Question {current + 1} of {total}
      </p>

      <Card>
        <CardHeader />
        <CardContent>
          <QuestionRenderer
            question={q}
            value={currentAnswer}
            onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
          />

          {isRevealed && (
            <div
              className={cn(
                "mt-5 rounded-md border p-4 text-sm",
                isCorrect
                  ? "border-[hsl(var(--success))]/60 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                  : "border-coral/60 bg-coral/10 text-[hsl(var(--coral))]"
              )}
            >
              <div className="flex items-center gap-2 font-medium">
                {isCorrect ? (
                  <>
                    <Check className="h-4 w-4" /> Correct
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" /> Not quite
                  </>
                )}
              </div>
              {q.type.startsWith("mcq") && (
                <p className="mt-1 text-xs text-foreground/80">
                  Correct answer:{" "}
                  {(q as { correct: string[] }).correct
                    .map(
                      (cid) =>
                        (
                          (q as { options: { id: string; text: string }[] }).options.find(
                            (o) => o.id === cid
                          )?.text ?? cid
                        )
                    )
                    .join(", ")}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        {!isRevealed ? (
          <Button onClick={check} disabled={currentAnswer === undefined}>
            Check
          </Button>
        ) : (
          <Button onClick={next} variant="coral">
            {current < total - 1 ? "Next question" : "Finish"}
          </Button>
        )}
      </div>
    </div>
  );
}
