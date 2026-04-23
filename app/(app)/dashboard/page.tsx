import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressChart, type ScorePoint } from "@/components/dashboard/progress-chart";
import { RecentTests, type RecentAttempt } from "@/components/dashboard/recent-tests";
import { StreakCounter } from "@/components/dashboard/streak-counter";
import { TargetTestSwitcher } from "@/components/dashboard/target-test-switcher";
import { WeakAreas, type SkillAccuracy } from "@/components/dashboard/weak-areas";
import { createClient } from "@/lib/supabase/server";
import { TEST_CATALOG } from "@/lib/test-data";
import type { ProfileRecord, TestType } from "@/types";

function computeStreak(dates: string[]) {
  if (dates.length === 0) return 0;
  const days = new Set(
    dates.map((d) => new Date(d).toISOString().slice(0, 10))
  );
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function buildScoreSeries(
  attempts: { completed_at: string | null; band_score: number | null }[]
): ScorePoint[] {
  if (attempts.length === 0) {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return { date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), score: null };
    });
  }
  return attempts
    .filter((a) => a.completed_at && a.band_score !== null)
    .slice(-10)
    .map((a) => ({
      date: new Date(a.completed_at!).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      score: a.band_score,
    }));
}

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [profileRes, attemptsRes, drillsRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("attempts")
      .select("id, test_id, answers, band_score, status, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(20),
    supabase
      .from("drill_sessions")
      .select("skill, questions_attempted, questions_correct, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const profile = profileRes.data as ProfileRecord | null;
  const attempts = attemptsRes.data ?? [];
  const drills = drillsRes.data ?? [];

  const targetTest: TestType = profile?.target_test ?? "ielts";

  const series = buildScoreSeries(
    attempts
      .filter(
        (a) =>
          (a.answers as { _testType?: string } | null)?._testType === targetTest
      )
      .reverse()
  );

  const recent: RecentAttempt[] = attempts.slice(0, 5).map((a) => {
    const slug = (a.answers as { _slug?: string } | null)?._slug;
    const catalog = TEST_CATALOG.find((c) => c.slug === slug);
    return {
      id: a.id,
      label: catalog?.title ?? "Practice attempt",
      testType:
        (a.answers as { _testType?: string } | null)?._testType ?? "ielts",
      score: a.band_score,
      status: a.status,
      completedAt: a.completed_at,
    };
  });

  const skillMap = new Map<string, { attempted: number; correct: number }>();
  for (const d of drills) {
    const acc = skillMap.get(d.skill) ?? { attempted: 0, correct: 0 };
    acc.attempted += d.questions_attempted;
    acc.correct += d.questions_correct;
    skillMap.set(d.skill, acc);
  }
  const skillAccuracy: SkillAccuracy[] = Array.from(skillMap.entries()).map(
    ([skill, v]) => ({
      skill,
      attempts: v.attempted,
      accuracy: v.attempted > 0 ? v.correct / v.attempted : 0,
    })
  );

  const totalMinutes =
    drills.reduce((sum, d) => sum + d.questions_attempted * 0.75, 0) +
    attempts.length * 18;

  const streak = computeStreak([
    ...drills.map((d) => d.created_at),
    ...attempts.filter((a) => a.completed_at).map((a) => a.completed_at!),
  ]);

  const recommended = TEST_CATALOG.find((t) => t.testType === targetTest)!;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Welcome back
            {profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}.
          </p>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight">
            Your {targetTest.toUpperCase()} plan
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Switch target test:
            </span>
            <TargetTestSwitcher current={targetTest} userId={user.id} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {profile?.target_score && (
            <Badge variant="outline" className="gap-1">
              Target: {profile.target_score}
            </Badge>
          )}
          <Button asChild>
            <Link href={`/tests/${targetTest}`}>
              Start a mock test <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StreakCounter streakDays={streak} totalMinutes={totalMinutes} />
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[hsl(var(--coral))]" />
              <CardTitle className="text-base font-display">
                Recommended next
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div>
                <h3 className="font-display text-lg">{recommended.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-prose">
                  {recommended.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  ~{recommended.durationMinutes} min · {recommended.section}
                </p>
              </div>
              <Button asChild>
                <Link href={`/tests/${targetTest}?slug=${recommended.slug}`}>
                  Begin <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProgressChart data={series} testType={targetTest} />
        </div>
        <WeakAreas data={skillAccuracy} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTests attempts={recent} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">
              Quick drills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {["grammar", "vocabulary", "reading", "listening"].map((s) => (
                <li key={s}>
                  <Link
                    href={`/drills/${s}`}
                    className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2 hover:bg-accent/60 capitalize"
                  >
                    <span className="text-sm">{s}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
