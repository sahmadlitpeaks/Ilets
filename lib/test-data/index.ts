import type { TestContent, TestType } from "@/types";
import {
  ieltsWritingFullMock,
  ieltsReadingQuickMock,
  ieltsSpeakingMock,
} from "./ielts";
import { toeflWritingMock, toeflReadingMock } from "./toefl";
import { pteWritingMock, pteReadingMock } from "./pte";
import { detQuickMock } from "./det";

export interface TestCatalogEntry {
  slug: string;
  testType: TestType;
  title: string;
  section: TestContent["sections"][number]["section"];
  durationMinutes: number;
  description: string;
  content: TestContent;
}

export const TEST_CATALOG: TestCatalogEntry[] = [
  {
    slug: "ielts-writing-full",
    testType: "ielts",
    title: "IELTS Academic Writing — Full Test",
    section: "writing",
    durationMinutes: 60,
    description:
      "Task 1 (150 words, 20 min) + Task 2 (250 words, 40 min). Essays are graded by AI against official IELTS band descriptors.",
    content: ieltsWritingFullMock,
  },
  {
    slug: "ielts-reading-quick",
    testType: "ielts",
    title: "IELTS Reading — Quick Set",
    section: "reading",
    durationMinutes: 20,
    description:
      "An original 450-word passage with MCQs, True/False/Not Given, and summary-completion.",
    content: ieltsReadingQuickMock,
  },
  {
    slug: "ielts-speaking-parts-2-3",
    testType: "ielts",
    title: "IELTS Speaking — Parts 2 & 3",
    section: "speaking",
    durationMinutes: 8,
    description:
      "Long-turn (2 min) + two-way discussion. Recordings are transcribed and scored across fluency, lexis, pronunciation, and coherence.",
    content: ieltsSpeakingMock,
  },
  {
    slug: "toefl-writing-discussion",
    testType: "toefl",
    title: "TOEFL — Writing for an Academic Discussion",
    section: "writing",
    durationMinutes: 10,
    description:
      "Reply to a professor's prompt and two student posts. 100+ words, scored 0-30.",
    content: toeflWritingMock,
  },
  {
    slug: "toefl-reading-quick",
    testType: "toefl",
    title: "TOEFL Reading — Quick Set",
    section: "reading",
    durationMinutes: 12,
    description: "An original passage with multiple-choice questions.",
    content: toeflReadingMock,
  },
  {
    slug: "pte-writing-essay",
    testType: "pte",
    title: "PTE — Write Essay",
    section: "writing",
    durationMinutes: 20,
    description: "200-300 word essay, scored on the PTE 10-90 scale.",
    content: pteWritingMock,
  },
  {
    slug: "pte-reading-fillblanks",
    testType: "pte",
    title: "PTE Reading — Fill in the Blanks",
    section: "reading",
    durationMinutes: 10,
    description: "Short practice set on a climate topic.",
    content: pteReadingMock,
  },
  {
    slug: "det-mixed-sampler",
    testType: "det",
    title: "Duolingo English Test — Mixed Sampler",
    section: "full",
    durationMinutes: 12,
    description:
      "Spelling, real-word selection, short writing, and a speaking prompt. Scored on the DET 10-160 scale.",
    content: detQuickMock,
  },
];

export function findTest(slug: string) {
  return TEST_CATALOG.find((t) => t.slug === slug);
}

export function testsByType(testType: TestType) {
  return TEST_CATALOG.filter((t) => t.testType === testType);
}
