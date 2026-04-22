"use client";

import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestionNavigatorProps {
  total: number;
  current: number;
  answered: Set<number>;
  flagged: Set<number>;
  onJump: (index: number) => void;
}

export function QuestionNavigator({
  total,
  current,
  answered,
  flagged,
  onJump,
}: QuestionNavigatorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === current;
        const isAnswered = answered.has(i);
        const isFlagged = flagged.has(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            className={cn(
              "relative h-8 min-w-8 rounded-md border text-xs font-medium px-2 transition-colors",
              isCurrent
                ? "border-primary bg-primary text-primary-foreground"
                : isAnswered
                  ? "border-[hsl(var(--success))]/60 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                  : "border-border bg-card hover:bg-accent"
            )}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={`Question ${i + 1}${isFlagged ? ", flagged" : ""}${isAnswered ? ", answered" : ""}`}
          >
            {i + 1}
            {isFlagged && (
              <Flag className="absolute -top-1 -right-1 h-3 w-3 text-[hsl(var(--coral))]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
