// IELTS scoring helpers.
// Raw-score-to-band conversions follow the commonly published IELTS public conversions.
// These are approximations suitable for practice feedback.

const ACADEMIC_LISTENING: [number, number][] = [
  [39, 9],
  [37, 8.5],
  [35, 8],
  [32, 7.5],
  [30, 7],
  [26, 6.5],
  [23, 6],
  [18, 5.5],
  [16, 5],
  [13, 4.5],
  [10, 4],
  [7, 3.5],
  [5, 3],
  [3, 2.5],
];

const ACADEMIC_READING: [number, number][] = [
  [39, 9],
  [37, 8.5],
  [35, 8],
  [33, 7.5],
  [30, 7],
  [27, 6.5],
  [23, 6],
  [19, 5.5],
  [15, 5],
  [13, 4.5],
  [10, 4],
  [8, 3.5],
  [6, 3],
];

function lookupBand(correct: number, table: [number, number][]): number {
  for (const [threshold, band] of table) {
    if (correct >= threshold) return band;
  }
  return 2;
}

export function ieltsListeningBand(correctOutOf40: number): number {
  return lookupBand(correctOutOf40, ACADEMIC_LISTENING);
}

export function ieltsReadingBand(correctOutOf40: number): number {
  return lookupBand(correctOutOf40, ACADEMIC_READING);
}

export function ieltsOverall(bands: number[]): number {
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length;
  // IELTS rounds to nearest 0.5
  const rounded = Math.round(avg * 2) / 2;
  return Math.min(9, Math.max(0, rounded));
}

export function ieltsWritingTotal(criteria: {
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
}): number {
  const avg =
    (criteria.taskResponse +
      criteria.coherenceCohesion +
      criteria.lexicalResource +
      criteria.grammaticalRange) /
    4;
  return Math.round(avg * 2) / 2;
}
