export type TestType = "ielts" | "toefl" | "pte" | "det";

export type SectionType =
  | "reading"
  | "listening"
  | "writing"
  | "speaking"
  | "full";

export type QuestionType =
  | "mcq-single"
  | "mcq-multi"
  | "fill-blank"
  | "matching"
  | "true-false-ng"
  | "essay"
  | "speaking"
  | "sentence-order"
  | "highlight-summary";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  instructions?: string;
  points?: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq-single" | "mcq-multi";
  options: { id: string; text: string }[];
  correct: string[];
}

export interface FillBlankQuestion extends BaseQuestion {
  type: "fill-blank";
  blanks: { id: string; accepted: string[] }[];
  passage: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
  pairs: { leftId: string; rightId: string }[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false-ng";
  statements: {
    id: string;
    text: string;
    correct: "true" | "false" | "not-given";
  }[];
}

export interface EssayQuestion extends BaseQuestion {
  type: "essay";
  minWords: number;
  maxWords?: number;
  task?: "task1" | "task2" | "integrated" | "independent";
}

export interface SpeakingQuestion extends BaseQuestion {
  type: "speaking";
  prepSeconds: number;
  responseSeconds: number;
}

export interface SentenceOrderQuestion extends BaseQuestion {
  type: "sentence-order";
  sentences: { id: string; text: string }[];
  correctOrder: string[];
}

export interface HighlightSummaryQuestion extends BaseQuestion {
  type: "highlight-summary";
  passage: string;
  options: { id: string; text: string }[];
  correct: string;
}

export type Question =
  | MCQQuestion
  | FillBlankQuestion
  | MatchingQuestion
  | TrueFalseQuestion
  | EssayQuestion
  | SpeakingQuestion
  | SentenceOrderQuestion
  | HighlightSummaryQuestion;

export interface TestSection {
  id: string;
  title: string;
  section: SectionType;
  durationMinutes: number;
  passage?: string;
  audioUrl?: string;
  questions: Question[];
}

export interface TestContent {
  overview: string;
  sections: TestSection[];
}

export interface TestRecord {
  id: string;
  test_type: TestType;
  section: SectionType;
  title: string;
  duration_minutes: number;
  content: TestContent;
  created_at: string;
}

export type AnswerMap = Record<string, unknown>;

export interface WritingFeedback {
  taskResponse?: { score: number; feedback: string };
  coherenceCohesion?: { score: number; feedback: string };
  lexicalResource?: { score: number; feedback: string };
  grammaticalRange?: { score: number; feedback: string };
  content?: { score: number; feedback: string };
  language?: { score: number; feedback: string };
  overall: number;
  improvements: string[];
  annotatedSentences: { text: string; issue: string }[];
}

export interface SpeakingFeedback {
  pronunciation?: { score: number; feedback: string };
  fluency?: { score: number; feedback: string };
  coherence?: { score: number; feedback: string };
  lexical?: { score: number; feedback: string };
  overall: number;
  improvements: string[];
  transcript: string;
}

export interface AttemptRecord {
  id: string;
  user_id: string;
  test_id: string | null;
  started_at: string;
  completed_at: string | null;
  answers: AnswerMap | null;
  auto_score: number | null;
  ai_score: number | null;
  ai_feedback: WritingFeedback | SpeakingFeedback | null;
  band_score: number | null;
  status: "in_progress" | "completed" | "graded";
  test?: TestRecord;
}

export interface ProfileRecord {
  id: string;
  full_name: string | null;
  target_test: TestType | null;
  target_score: number | null;
  created_at: string;
}

export interface DrillSession {
  id: string;
  user_id: string;
  skill: "grammar" | "vocabulary" | "reading" | "listening";
  questions_attempted: number;
  questions_correct: number;
  created_at: string;
}
