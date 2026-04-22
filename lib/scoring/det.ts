// Duolingo English Test (DET) scoring. Overall 10-160.
// Derived from four subscores: literacy, comprehension, conversation, production.

export function detFromRubric(rubric: number): number {
  const clamped = Math.min(5, Math.max(0, rubric));
  return Math.round(10 + (clamped / 5) * 150);
}

export function detFromAccuracy(correct: number, total: number): number {
  if (total <= 0) return 10;
  return Math.round(10 + (correct / total) * 150);
}

export function detOverall(scores: number[]): number {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg / 5) * 5;
}
