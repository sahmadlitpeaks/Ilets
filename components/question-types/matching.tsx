"use client";

import type { MatchingQuestion } from "@/types";

export function Matching({
  question,
  value,
  onChange,
}: {
  question: MatchingQuestion;
  value: Record<string, string> | undefined;
  onChange: (value: Record<string, string>) => void;
}) {
  const answers = value ?? {};
  return (
    <div className="space-y-3">
      <p className="font-medium">{question.prompt}</p>
      <ul className="space-y-2">
        {question.left.map((l) => (
          <li key={l.id} className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <span className="text-sm">{l.text}</span>
            <select
              value={answers[l.id] ?? ""}
              onChange={(e) => onChange({ ...answers, [l.id]: e.target.value })}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">— select —</option>
              {question.right.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.text}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
