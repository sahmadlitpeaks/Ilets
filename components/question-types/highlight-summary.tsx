"use client";

import type { HighlightSummaryQuestion } from "@/types";
import { cn } from "@/lib/utils";

export function HighlightSummary({
  question,
  value,
  onChange,
}: {
  question: HighlightSummaryQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-medium">{question.prompt}</p>
      {question.passage && (
        <p className="rounded-md border bg-card p-4 text-sm leading-relaxed">
          {question.passage}
        </p>
      )}
      <ul className="space-y-2">
        {question.options.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "w-full text-left rounded-md border px-4 py-3 text-sm",
                value === opt.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent/60"
              )}
            >
              {opt.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
