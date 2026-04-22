import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";

export interface RecentAttempt {
  id: string;
  label: string;
  testType: string;
  score: number | null;
  status: string;
  completedAt: string | null;
}

export function RecentTests({ attempts }: { attempts: RecentAttempt[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-display">Recent attempts</CardTitle>
      </CardHeader>
      <CardContent>
        {attempts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t taken any tests yet.
          </p>
        ) : (
          <ul className="divide-y divide-border/70">
            {attempts.map((a) => (
              <li
                key={a.id}
                className="py-3 flex items-center gap-3 first:pt-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="uppercase text-[10px]">
                      {a.testType}
                    </Badge>
                    <span className="truncate text-sm font-medium">
                      {a.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {a.completedAt
                      ? formatRelativeDate(a.completedAt)
                      : "In progress"}
                    {" · "}
                    {a.status}
                  </p>
                </div>
                {a.score !== null && (
                  <span className="text-sm font-semibold tabular-nums">
                    {a.score}
                  </span>
                )}
                <Link
                  href={`/results/${a.id}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
