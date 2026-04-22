"use client";

import * as React from "react";
import { Clock, AlertCircle } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

export interface TimerProps {
  durationSeconds: number;
  onExpire?: () => void;
  onWarn?: () => void;
  warnAtSeconds?: number;
  running?: boolean;
}

export function Timer({
  durationSeconds,
  onExpire,
  onWarn,
  warnAtSeconds = 300,
  running = true,
}: TimerProps) {
  const [remaining, setRemaining] = React.useState(durationSeconds);
  const warnedRef = React.useRef(false);
  const expiredRef = React.useRef(false);

  React.useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setRemaining((r) => {
        const next = Math.max(0, r - 1);
        if (next <= warnAtSeconds && !warnedRef.current) {
          warnedRef.current = true;
          onWarn?.();
        }
        if (next === 0 && !expiredRef.current) {
          expiredRef.current = true;
          onExpire?.();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onExpire, onWarn, warnAtSeconds]);

  const warning = remaining <= warnAtSeconds;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium tabular-nums",
        warning
          ? "border-coral/60 bg-coral/10 text-[hsl(var(--coral))]"
          : "border-border bg-card"
      )}
      role="timer"
      aria-live="polite"
    >
      {warning ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <Clock className="h-4 w-4" />
      )}
      {formatDuration(remaining)}
    </div>
  );
}
