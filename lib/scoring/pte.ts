// PTE Academic scoring. Each section and overall scaled 10-90.
// This helper converts a 0-5 rubric (matching Claude output) to the 10-90 scale.

export function pteFromRubric(rubric: number): number {
  const clamped = Math.min(5, Math.max(0, rubric));
  // Map 0 -> 10, 5 -> 90
  return Math.round(10 + (clamped / 5) * 80);
}

export function pteFromAccuracy(
  correct: number,
  total: number
): number {
  if (total <= 0) return 10;
  return Math.round(10 + (correct / total) * 80);
}

export function pteOverall(scores: number[]): number {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg);
}
