import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SkillAccuracy {
  skill: string;
  attempts: number;
  accuracy: number;
}

function heatColor(accuracy: number) {
  if (accuracy >= 0.85) return "bg-[hsl(var(--success))]/80 text-[hsl(var(--success-foreground))]";
  if (accuracy >= 0.7) return "bg-[hsl(var(--success))]/40";
  if (accuracy >= 0.55) return "bg-coral/40";
  return "bg-coral/70 text-[hsl(var(--coral-foreground))]";
}

export function WeakAreas({ data }: { data: SkillAccuracy[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-display">Skill heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Complete a few drill sessions to see your weakest skills.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.map((s) => (
              <li key={s.skill} className="flex items-center gap-3">
                <span className="w-24 text-sm capitalize">{s.skill}</span>
                <div className="flex-1 flex gap-0.5 h-6 rounded-md overflow-hidden bg-muted">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const threshold = (i + 1) / 10;
                    const active = s.accuracy >= threshold - 0.1;
                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 transition-colors",
                          active ? heatColor(s.accuracy) : "bg-transparent"
                        )}
                      />
                    );
                  })}
                </div>
                <span className="w-14 text-right text-sm tabular-nums">
                  {Math.round(s.accuracy * 100)}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
