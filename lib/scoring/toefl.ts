// TOEFL iBT scoring. Each section 0-30, total 0-120.
// Writing/Speaking use rubric scores 0-5 converted to section scaled scores.

const WRITING_SCALE: Record<number, number> = {
  0: 0,
  1: 5,
  2: 10,
  3: 17,
  4: 24,
  5: 30,
};

const SPEAKING_SCALE: Record<number, number> = {
  0: 0,
  1: 8,
  2: 15,
  3: 20,
  4: 25,
  5: 30,
};

export function toeflWritingScore(rubric: number): number {
  const clamped = Math.min(5, Math.max(0, Math.round(rubric)));
  return WRITING_SCALE[clamped] ?? 0;
}

export function toeflSpeakingScore(rubric: number): number {
  const clamped = Math.min(5, Math.max(0, Math.round(rubric)));
  return SPEAKING_SCALE[clamped] ?? 0;
}

export function toeflReadingOrListening(
  correct: number,
  total: number
): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 30);
}

export function toeflOverall(sections: number[]): number {
  return sections.reduce((a, b) => a + b, 0);
}
