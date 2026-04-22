import type { AnswerMap, Question } from "@/types";

export interface AutoScoreResult {
  total: number;
  correct: number;
  accuracy: number;
}

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function normalise(s: string) {
  return s.trim().toLowerCase();
}

export function autoScoreQuestions(
  questions: Question[],
  answers: AnswerMap
): AutoScoreResult {
  let total = 0;
  let correct = 0;

  for (const q of questions) {
    const a = answers[q.id];
    switch (q.type) {
      case "mcq-single":
      case "mcq-multi": {
        total += 1;
        const picked = (a as string[] | undefined) ?? [];
        if (arraysEqual(picked, q.correct)) correct += 1;
        break;
      }
      case "true-false-ng": {
        for (const s of q.statements) {
          total += 1;
          const picked = (a as Record<string, string> | undefined)?.[s.id];
          if (picked === s.correct) correct += 1;
        }
        break;
      }
      case "fill-blank": {
        for (const b of q.blanks) {
          total += 1;
          const picked = (a as Record<string, string> | undefined)?.[b.id];
          if (
            picked &&
            b.accepted.some((accepted) => normalise(accepted) === normalise(picked))
          )
            correct += 1;
        }
        break;
      }
      case "matching": {
        for (const p of q.pairs) {
          total += 1;
          const picked = (a as Record<string, string> | undefined)?.[p.leftId];
          if (picked === p.rightId) correct += 1;
        }
        break;
      }
      case "sentence-order": {
        total += 1;
        const picked = (a as string[] | undefined) ?? [];
        if (
          picked.length === q.correctOrder.length &&
          picked.every((id, i) => id === q.correctOrder[i])
        ) {
          correct += 1;
        }
        break;
      }
      case "highlight-summary": {
        total += 1;
        if (a === q.correct) correct += 1;
        break;
      }
      case "essay":
      case "speaking":
        // AI-graded, skip
        break;
    }
  }

  return {
    total,
    correct,
    accuracy: total > 0 ? correct / total : 0,
  };
}
