import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StreakCounter({
  streakDays,
  totalMinutes,
}: {
  streakDays: number;
  totalMinutes: number;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Current streak
            </p>
            <p className="mt-1 font-display text-3xl">
              {streakDays} <span className="text-base">day{streakDays === 1 ? "" : "s"}</span>
            </p>
          </div>
          <Flame className="h-7 w-7 text-[hsl(var(--coral))]" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
          Total practice
        </p>
        <p className="mt-1 font-display text-2xl tabular-nums">
          {(totalMinutes / 60).toFixed(1)} hrs
        </p>
      </CardContent>
    </Card>
  );
}
