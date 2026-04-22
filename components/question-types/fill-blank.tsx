"use client";

import * as React from "react";
import type { FillBlankQuestion } from "@/types";
import { Input } from "@/components/ui/input";

export function FillBlank({
  question,
  value,
  onChange,
}: {
  question: FillBlankQuestion;
  value: Record<string, string> | undefined;
  onChange: (value: Record<string, string>) => void;
}) {
  const answers = value ?? {};

  const parts = React.useMemo(() => {
    const pattern = /\[\[(\d+|\w+)\]\]/g;
    const out: (string | { blankId: string })[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(question.passage)) !== null) {
      if (match.index > lastIndex) {
        out.push(question.passage.slice(lastIndex, match.index));
      }
      out.push({ blankId: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < question.passage.length) {
      out.push(question.passage.slice(lastIndex));
    }
    return out;
  }, [question.passage]);

  return (
    <div className="space-y-4">
      <p className="font-medium leading-relaxed">{question.prompt}</p>
      <div className="rounded-md border bg-card p-5 leading-[2] text-sm">
        {parts.map((part, i) => {
          if (typeof part === "string") {
            return <span key={i}>{part}</span>;
          }
          return (
            <Input
              key={i}
              aria-label={`Blank ${part.blankId}`}
              className="inline-block w-40 h-8 mx-1 align-baseline"
              value={answers[part.blankId] ?? ""}
              onChange={(e) =>
                onChange({ ...answers, [part.blankId]: e.target.value })
              }
            />
          );
        })}
      </div>
    </div>
  );
}
