import type { TestContent, TestType } from "@/types";
import {
  ieltsWritingFullMock,
  ieltsReadingQuickMock,
  ieltsSpeakingMock,
  ieltsListeningSection1,
  ieltsWritingTask2,
  ieltsReadingExtended,
} from "./ielts";
import {
  toeflWritingMock,
  toeflReadingMock,
  toeflListeningMock,
  toeflIntegratedWriting,
  toeflSpeakingIndependent,
} from "./toefl";
import {
  pteWritingMock,
  pteReadingMock,
  pteListeningMC,
  pteReorderParagraphs,
  pteSpeakingDescribeImage,
  pteSummarizeText,
} from "./pte";
import {
  detQuickMock,
  detReadAndSelect,
  detCompleteSentences,
  detWriteAboutPhoto,
  detSpeakingSample,
  detInteractiveReading,
} from "./det";

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
  // ---------------- IELTS ----------------
  {
    slug: "ielts-listening-section1",
    testType: "ielts",
    title: "IELTS Listening — Section 1 (Library Registration)",
    section: "listening",
    durationMinutes: 15,
    description:
      "A Section-1 conversation with form completion, multiple-choice, and true/false/not-given questions. Transcript included for practice when audio isn't available.",
    content: ieltsListeningSection1,
  },
  {
    slug: "ielts-reading-quick",
    testType: "ielts",
    title: "IELTS Reading — Quick Set (Lichens)",
    section: "reading",
    durationMinutes: 20,
    description:
      "An original 450-word passage with MCQs, True/False/Not Given, and summary-completion.",
    content: ieltsReadingQuickMock,
  },
  {
    slug: "ielts-reading-extended",
    testType: "ielts",
    title: "IELTS Reading — Extended Set (The Olm)",
    section: "reading",
    durationMinutes: 25,
    description:
      "Longer academic passage with MCQs (single and multiple), TFNG, and summary fill-in-the-blank.",
    content: ieltsReadingExtended,
  },
  {
    slug: "ielts-writing-full",
    testType: "ielts",
    title: "IELTS Writing — Full Test (Task 1 + Task 2)",
    section: "writing",
    durationMinutes: 60,
    description:
      "Task 1 (150 words, 20 min) + Task 2 (250 words, 40 min). Essays graded by AI against the official IELTS band descriptors.",
    content: ieltsWritingFullMock,
  },
  {
    slug: "ielts-writing-task2",
    testType: "ielts",
    title: "IELTS Writing Task 2 — Focused (Income inequality)",
    section: "writing",
    durationMinutes: 40,
    description:
      "Single 40-minute Task 2 essay, graded on all four IELTS criteria.",
    content: ieltsWritingTask2,
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

  // ---------------- TOEFL ----------------
  {
    slug: "toefl-reading-quick",
    testType: "toefl",
    title: "TOEFL Reading — Thermos (Quick Set)",
    section: "reading",
    durationMinutes: 12,
    description: "A short passage with single-answer and multi-answer MCQ items.",
    content: toeflReadingMock,
  },
  {
    slug: "toefl-listening-lecture",
    testType: "toefl",
    title: "TOEFL Listening — Archaeology Lecture",
    section: "listening",
    durationMinutes: 15,
    description:
      "Academic lecture on dendrochronology with detail, inference, and purpose questions. Transcript included.",
    content: toeflListeningMock,
  },
  {
    slug: "toefl-speaking-independent",
    testType: "toefl",
    title: "TOEFL Speaking — Independent Task 1",
    section: "speaking",
    durationMinutes: 3,
    description:
      "15-second prep, 45-second response on a familiar topic. Scored on the TOEFL 0-30 scale.",
    content: toeflSpeakingIndependent,
  },
  {
    slug: "toefl-writing-discussion",
    testType: "toefl",
    title: "TOEFL Writing — Academic Discussion",
    section: "writing",
    durationMinutes: 10,
    description:
      "Reply to a professor's prompt and two student posts. 100+ words, scored 0-30.",
    content: toeflWritingMock,
  },
  {
    slug: "toefl-integrated-writing",
    testType: "toefl",
    title: "TOEFL Writing — Integrated (Reading + Lecture)",
    section: "writing",
    durationMinutes: 20,
    description:
      "Read a passage, 'listen' to a lecture that challenges it, then summarise how the two relate. 150-225 words.",
    content: toeflIntegratedWriting,
  },

  // ---------------- PTE ----------------
  {
    slug: "pte-reading-fillblanks",
    testType: "pte",
    title: "PTE Reading — Fill in the Blanks (Urban heat)",
    section: "reading",
    durationMinutes: 10,
    description: "Short 'Reading & Writing: Fill in the Blanks' practice set.",
    content: pteReadingMock,
  },
  {
    slug: "pte-reorder-paragraphs",
    testType: "pte",
    title: "PTE Reading — Re-order Paragraphs",
    section: "reading",
    durationMinutes: 8,
    description:
      "Drag sentences into the logical order of an academic paragraph on the invention of photography.",
    content: pteReorderParagraphs,
  },
  {
    slug: "pte-listening-mc",
    testType: "pte",
    title: "PTE Listening — Multiple Choice (Dandelions)",
    section: "listening",
    durationMinutes: 10,
    description:
      "Short academic talk with multi-answer and single-answer listening comprehension items.",
    content: pteListeningMC,
  },
  {
    slug: "pte-speaking-describe-image",
    testType: "pte",
    title: "PTE Speaking — Describe Image",
    section: "speaking",
    durationMinutes: 3,
    description:
      "25-second prep, 40-second response describing a bar chart of European rainfall. AI grades fluency, content, and pronunciation.",
    content: pteSpeakingDescribeImage,
  },
  {
    slug: "pte-summarize-written",
    testType: "pte",
    title: "PTE Writing — Summarise Written Text",
    section: "writing",
    durationMinutes: 10,
    description:
      "Condense a passage on the history of the tomato into a single 5-75 word sentence. AI grades content + form.",
    content: pteSummarizeText,
  },
  {
    slug: "pte-writing-essay",
    testType: "pte",
    title: "PTE Writing — Write Essay (Remote work)",
    section: "writing",
    durationMinutes: 20,
    description:
      "200-300 word opinion essay scored on the six official PTE traits.",
    content: pteWritingMock,
  },

  // ---------------- Duolingo English Test ----------------
  {
    slug: "det-mixed-sampler",
    testType: "det",
    title: "DET — Mixed Sampler",
    section: "full",
    durationMinutes: 12,
    description:
      "Spelling, real-word selection, short writing, and a speaking prompt. Scored on the DET 10-160 scale.",
    content: detQuickMock,
  },
  {
    slug: "det-read-and-select",
    testType: "det",
    title: "DET — Read and Select (real vs. invented words)",
    section: "full",
    durationMinutes: 5,
    description:
      "Three rapid-fire rounds picking real English words from a mix that includes plausible invented ones.",
    content: detReadAndSelect,
  },
  {
    slug: "det-complete-sentences",
    testType: "det",
    title: "DET — Complete the Sentences",
    section: "full",
    durationMinutes: 8,
    description:
      "Type the missing word(s) in short sentences. Tests grammar, collocation, and spelling together.",
    content: detCompleteSentences,
  },
  {
    slug: "det-write-about-photo",
    testType: "det",
    title: "DET — Write About the Photo",
    section: "full",
    durationMinutes: 2,
    description:
      "Describe a described scene in at least 30 words within 1 minute. AI grades content and language use.",
    content: detWriteAboutPhoto,
  },
  {
    slug: "det-interactive-reading",
    testType: "det",
    title: "DET — Interactive Reading (Sleep & memory)",
    section: "full",
    durationMinutes: 10,
    description:
      "Adaptive passage with fill-blank, MCQ, inference, and TFNG follow-ups.",
    content: detInteractiveReading,
  },
  {
    slug: "det-speaking-sample",
    testType: "det",
    title: "DET — Speaking Sample (open response)",
    section: "full",
    durationMinutes: 4,
    description:
      "1-3 minute open-ended recording, modelled on the DET Speaking Sample that admissions officers review.",
    content: detSpeakingSample,
  },
];

export function findTest(slug: string) {
  return TEST_CATALOG.find((t) => t.slug === slug);
}

export function testsByType(testType: TestType) {
  return TEST_CATALOG.filter((t) => t.testType === testType);
}

export function sectionsByType(testType: TestType) {
  const tests = testsByType(testType);
  const groups = new Map<string, TestCatalogEntry[]>();
  for (const t of tests) {
    const arr = groups.get(t.section) ?? [];
    arr.push(t);
    groups.set(t.section, arr);
  }
  return groups;
}
