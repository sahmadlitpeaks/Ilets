"use client";

import type { SentenceOrderQuestion } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SentenceOrder({
  question,
  value,
  onChange,
}: {
  question: SentenceOrderQuestion;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}) {
  const order = value && value.length
    ? value
    : question.sentences.map((s) => s.id);

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  const byId = Object.fromEntries(question.sentences.map((s) => [s.id, s]));

  return (
    <div className="space-y-3">
      <p className="font-medium">{question.prompt}</p>
      <ul className="space-y-2">
        {order.map((id, i) => (
          <li key={id} className="rounded-md border bg-card px-3 py-2 flex items-center gap-2">
            <span className="w-5 text-xs text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <span className="flex-1 text-sm">{byId[id]?.text}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Move up"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => move(i, 1)}
              disabled={i === order.length - 1}
              aria-label="Move down"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
