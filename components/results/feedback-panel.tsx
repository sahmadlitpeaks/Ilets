import { CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WritingFeedback, SpeakingFeedback } from "@/types";

type AnyFeedback = Partial<WritingFeedback & SpeakingFeedback>;

function criteria(fb: AnyFeedback) {
  const out: { key: string; label: string; score: number; feedback: string }[] =
    [];
  const map: [keyof AnyFeedback, string][] = [
    ["taskResponse", "Task response"],
    ["coherenceCohesion", "Coherence & cohesion"],
    ["lexicalResource", "Lexical resource"],
    ["grammaticalRange", "Grammatical range"],
    ["content", "Content"],
    ["language", "Language use"],
    ["pronunciation", "Pronunciation"],
    ["fluency", "Fluency"],
    ["coherence", "Coherence"],
    ["lexical", "Lexical"],
  ];
  for (const [k, label] of map) {
    const v = fb[k] as { score: number; feedback: string } | undefined;
    if (v && typeof v.score === "number") {
      out.push({ key: k as string, label, score: v.score, feedback: v.feedback });
    }
  }
  return out;
}

export function FeedbackPanel({
  feedback,
  scaleLabel,
}: {
  feedback: AnyFeedback;
  scaleLabel: string;
}) {
  const items = criteria(feedback);
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[hsl(var(--coral))]" />
            <h2 className="font-display text-lg">AI examiner feedback</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {typeof feedback.overall === "number" && (
            <div className="flex items-baseline gap-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Overall {scaleLabel}
              </p>
              <span className="font-display text-4xl">{feedback.overall}</span>
            </div>
          )}

          {items.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((c) => (
                <div key={c.key} className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{c.label}</p>
                    <Badge variant="outline">{c.score}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {c.feedback}
                  </p>
                </div>
              ))}
            </div>
          )}

          {feedback.improvements && feedback.improvements.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">What to improve next</p>
              <ul className="space-y-2 text-sm">
                {feedback.improvements.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[hsl(var(--coral))]" />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feedback.annotatedSentences &&
            feedback.annotatedSentences.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Sentence-level notes</p>
                <ul className="space-y-3">
                  {feedback.annotatedSentences.map((a, i) => (
                    <li
                      key={i}
                      className="rounded-md border-l-2 border-[hsl(var(--coral))] pl-3 text-sm"
                    >
                      <p className="italic">&ldquo;{a.text}&rdquo;</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.issue}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {feedback.transcript && (
            <div>
              <p className="text-sm font-medium mb-1">Transcript</p>
              <p className="rounded-md border bg-muted/40 p-3 text-sm leading-relaxed">
                {feedback.transcript}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
