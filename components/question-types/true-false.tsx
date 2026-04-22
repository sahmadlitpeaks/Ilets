"use client";

import type { TrueFalseQuestion } from "@/types";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
  { value: "not-given", label: "Not Given" },
] as const;

export function TrueFalse({
  question,
  value,
  onChange,
}: {
  question: TrueFalseQuestion;
  value: Record<string, string> | undefined;
  onChange: (value: Record<string, string>) => void;
}) {
  const answers = value ?? {};
  return (
    <div className="space-y-4">
      <p className="font-medium leading-relaxed">{question.prompt}</p>
      <ul className="space-y-3">
        {question.statements.map((s) => (
          <li key={s.id} className="space-y-2">
            <p className="text-sm">{s.text}</p>
            <div className="flex gap-2">
              {OPTIONS.map((opt) => {
                const active = answers[s.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      onChange({ ...answers, [s.id]: opt.value })
                    }
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-accent"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
