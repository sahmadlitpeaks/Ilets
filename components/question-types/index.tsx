"use client";

import type { Question } from "@/types";
import { MCQ } from "./mcq";
import { FillBlank } from "./fill-blank";
import { TrueFalse } from "./true-false";
import { Essay } from "./essay";
import { Speaking, type SpeakingAnswer } from "./speaking";
import { Matching } from "./matching";
import { SentenceOrder } from "./sentence-order";
import { HighlightSummary } from "./highlight-summary";

export function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (question.type) {
    case "mcq-single":
    case "mcq-multi":
      return (
        <MCQ
          question={question}
          value={value as string[] | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "fill-blank":
      return (
        <FillBlank
          question={question}
          value={value as Record<string, string> | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "true-false-ng":
      return (
        <TrueFalse
          question={question}
          value={value as Record<string, string> | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "essay":
      return (
        <Essay
          question={question}
          value={value as string | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "speaking":
      return (
        <Speaking
          question={question}
          value={value as SpeakingAnswer | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "matching":
      return (
        <Matching
          question={question}
          value={value as Record<string, string> | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "sentence-order":
      return (
        <SentenceOrder
          question={question}
          value={value as string[] | undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "highlight-summary":
      return (
        <HighlightSummary
          question={question}
          value={value as string | undefined}
          onChange={(v) => onChange(v)}
        />
      );
  }
}
