"use client";

import type { MCQQuestion } from "@/types";
import { cn } from "@/lib/utils";

export function MCQ({
  question,
  value,
  onChange,
}: {
  question: MCQQuestion;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}) {
  const multi = question.type === "mcq-multi";
  const selected = value ?? [];

  const toggle = (id: string) => {
    if (multi) {
      if (selected.includes(id)) onChange(selected.filter((x) => x !== id));
      else onChange([...selected, id]);
    } else {
      onChange([id]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium leading-relaxed whitespace-pre-line">{question.prompt}</p>
        {multi && (
          <p className="text-xs text-muted-foreground mt-1">
            Select all that apply.
          </p>
        )}
      </div>
      <ul className="space-y-2">
        {question.options.map((opt) => {
          const isChecked = selected.includes(opt.id);
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => toggle(opt.id)}
                className={cn(
                  "w-full text-left rounded-md border px-4 py-3 transition-colors",
                  isChecked
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-accent/60"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center text-[10px] font-semibold",
                      multi ? "rounded-sm" : "rounded-full",
                      isChecked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {isChecked ? (multi ? "✓" : "●") : ""}
                  </span>
                  <span className="text-sm leading-relaxed">{opt.text}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
