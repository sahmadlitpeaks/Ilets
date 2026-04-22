import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeedbackPanel } from "@/components/results/feedback-panel";
import { createClient } from "@/lib/supabase/server";
import { findTest } from "@/lib/test-data";
import { scaleLabelFor } from "@/lib/scoring";
import type {
  AttemptRecord,
  TestType,
  WritingFeedback,
  SpeakingFeedback,
} from "@/types";

export default async function ResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data } = await supabase
    .from("attempts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) notFound();

  const attempt = data as AttemptRecord;
  const slug = (attempt.answers as { _slug?: string } | null)?._slug;
  const testType =
    ((attempt.answers as { _testType?: string } | null)?._testType as TestType) ??
    "ielts";
  const catalog = slug ? findTest(slug) : undefined;
  const scale = scaleLabelFor(testType);
  const feedback = attempt.ai_feedback as
    | WritingFeedback
    | SpeakingFeedback
    | null;

  const auto = (attempt.answers as { _auto?: { correct: number; total: number; accuracy: number } } | null)?._auto;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" asChild size="sm">
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
      </Button>

      <header className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="uppercase">
            {testType}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {attempt.status}
          </Badge>
        </div>
        <h1 className="font-display text-3xl">
          {catalog?.title ?? "Test attempt"}
        </h1>
        {attempt.completed_at && (
          <p className="text-sm text-muted-foreground">
            Submitted {new Date(attempt.completed_at).toLocaleString()}
          </p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
              {scale.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl">
              {attempt.band_score ?? attempt.ai_score ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Scale: {scale.min}–{scale.max}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
              Auto-scored accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl">
              {auto ? `${Math.round(auto.accuracy * 100)}%` : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {auto ? `${auto.correct} / ${auto.total} correct` : "Open-ended only"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl">
              {catalog?.durationMinutes ?? "—"}m
            </p>
            <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
          </CardContent>
        </Card>
      </section>

      {feedback ? (
        <FeedbackPanel feedback={feedback} scaleLabel={scale.label} />
      ) : (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            {attempt.status === "graded"
              ? "AI feedback wasn't generated for this attempt."
              : "AI feedback is still generating — refresh in a few seconds."}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        {catalog && (
          <Button asChild variant="outline">
            <Link href={`/tests/${testType}/take/${catalog.slug}`}>
              Retake this test
            </Link>
          </Button>
        )}
        <Button asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
