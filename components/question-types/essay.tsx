"use client";

import * as React from "react";
import type { EssayQuestion } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { wordCount } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Essay({
  question,
  value,
  onChange,
}: {
  question: EssayQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const words = wordCount(value ?? "");
  const minMet = words >= question.minWords;
  const overMax = question.maxWords ? words > question.maxWords : false;

  return (
    <div className="space-y-3">
      <div>
        <p className="font-medium leading-relaxed whitespace-pre-line">
          {question.prompt}
        </p>
        {question.instructions && (
          <p className="text-sm text-muted-foreground mt-2">
            {question.instructions}
          </p>
        )}
      </div>
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Begin typing your response..."
        className="min-h-[360px] leading-relaxed"
      />
      <div
        className={cn(
          "flex items-center justify-between text-xs",
          overMax
            ? "text-[hsl(var(--coral))]"
            : minMet
              ? "text-[hsl(var(--success))]"
              : "text-muted-foreground"
        )}
      >
        <span>
          {words} / min {question.minWords}
          {question.maxWords ? ` · max ${question.maxWords}` : ""}
        </span>
        <span>{minMet ? "Minimum reached" : "Keep going"}</span>
      </div>
    </div>
  );
}
