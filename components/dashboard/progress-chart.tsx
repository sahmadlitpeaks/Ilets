"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ScorePoint {
  date: string;
  score: number | null;
}

export function ProgressChart({
  data,
  testType,
}: {
  data: ScorePoint[];
  testType: string;
}) {
  const hasData = data.some((p) => p.score !== null);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-display">
          Score over time · {testType.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {!hasData ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Complete a graded attempt to see your progress.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--coral))"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "hsl(var(--coral))" }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
