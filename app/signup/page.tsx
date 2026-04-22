"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import type { TestType } from "@/types";

const TARGETS: { value: TestType; label: string }[] = [
  { value: "ielts", label: "IELTS" },
  { value: "toefl", label: "TOEFL" },
  { value: "pte", label: "PTE" },
  { value: "det", label: "Duolingo" },
];

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [target, setTarget] = React.useState<TestType>("ielts");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, target_test: target },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;

      if (data.user && data.session) {
        // profile row is created by a database trigger (see migration)
        // but also try to upsert so fields we care about are present
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          target_test: target,
        });
        router.replace("/dashboard");
        router.refresh();
      } else {
        toast({
          title: "Check your inbox",
          description: "We sent a confirmation link to complete signup.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: err instanceof Error ? err.message : "Try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      <aside className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12 paper">
        <Link href="/" className="inline-flex items-center gap-2 font-display text-lg">
          <BookOpen className="h-5 w-5" />
          LinguaPrep
        </Link>
        <div>
          <h1 className="font-display text-4xl leading-tight text-balance">
            Begin with a plan.
            <br />
            Finish with a score.
          </h1>
          <p className="mt-4 text-primary-foreground/70 max-w-md">
            Pick your target test, take a diagnostic, and get a personalised
            study path.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} LinguaPrep
        </p>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="font-display text-2xl">Create your account</h2>
            <p className="text-sm text-muted-foreground">
              Takes about 30 seconds.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Target test</Label>
                <div className="grid grid-cols-4 gap-2">
                  {TARGETS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTarget(t.value)}
                      className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                        target === t.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-accent"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create account"}
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
