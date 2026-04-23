"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { TestType } from "@/types";

const OPTIONS: { value: TestType; label: string }[] = [
  { value: "ielts", label: "IELTS" },
  { value: "toefl", label: "TOEFL" },
  { value: "pte", label: "PTE" },
  { value: "det", label: "Duolingo" },
];

export function TargetTestSwitcher({
  current,
  userId,
}: {
  current: TestType;
  userId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = React.useState<TestType>(current);
  const [saving, setSaving] = React.useState<TestType | null>(null);

  async function change(next: TestType) {
    if (next === value || saving) return;
    setSaving(next);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ target_test: next })
        .eq("id", userId);
      if (error) throw error;
      setValue(next);
      toast({
        title: "Target test updated",
        description: `Your plan now targets ${next.toUpperCase()}.`,
      });
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Couldn't change target test",
        description: err instanceof Error ? err.message : "Try again.",
      });
    } finally {
      setSaving(null);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Target test"
      className="inline-flex rounded-md border border-border bg-card p-1 text-sm shadow-sm"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        const busy = saving === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            type="button"
            disabled={busy || saving !== null}
            onClick={() => change(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded px-3 py-1.5 transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
              saving && !busy && "opacity-60"
            )}
          >
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : active ? (
              <Check className="h-3.5 w-3.5" />
            ) : null}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
