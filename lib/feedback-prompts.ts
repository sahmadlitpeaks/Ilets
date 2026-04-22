import type { TestType } from "@/types";

export function writingPromptFor(
  testType: TestType,
  task: { prompt: string; essay: string; task?: string }
) {
  const base = `You will see a writing prompt and a student essay. Return ONLY a single valid JSON object — no Markdown fences, no commentary. Be precise but encouraging. Quote the student's own sentences when listing issues.`;

  const safePrompt = task.prompt.replace(/\s+/g, " ").trim();
  const safeEssay = task.essay.trim();

  switch (testType) {
    case "ielts":
      return `${base}

You are an experienced IELTS Writing examiner. Grade strictly using the official IELTS band descriptors (0-9, half-bands allowed). ${
        task.task === "task1"
          ? "This is an Academic Task 1 response."
          : "This is a Task 2 essay."
      }

Return JSON in exactly this shape:
{
  "taskResponse": { "score": number, "feedback": string },
  "coherenceCohesion": { "score": number, "feedback": string },
  "lexicalResource": { "score": number, "feedback": string },
  "grammaticalRange": { "score": number, "feedback": string },
  "overall": number,
  "improvements": [string, string, string],
  "annotatedSentences": [{ "text": string, "issue": string }]
}

Prompt: """${safePrompt}"""
Essay: """${safeEssay}"""`;

    case "toefl":
      return `${base}

You are an ETS TOEFL iBT Writing rater. Grade on the 0-5 rubric used for Independent / Academic Discussion tasks. Map the overall to the scaled 0-30 range (0→0, 1→5, 2→10, 3→17, 4→24, 5→30).

Return JSON in exactly this shape:
{
  "taskResponse": { "score": number, "feedback": string },
  "coherenceCohesion": { "score": number, "feedback": string },
  "lexicalResource": { "score": number, "feedback": string },
  "grammaticalRange": { "score": number, "feedback": string },
  "overall": number,
  "improvements": [string, string, string],
  "annotatedSentences": [{ "text": string, "issue": string }]
}
All criteria scores 0-5. Overall is the 0-30 scaled section score.

Prompt: """${safePrompt}"""
Response: """${safeEssay}"""`;

    case "pte":
      return `${base}

You are a PTE Academic examiner. Score against the six official traits used for 'Write Essay': Content, Form, Development/Structure/Coherence, General Linguistic Range, Grammar Usage, Vocabulary Range. Map your overall to the 10-90 PTE scale.

Return JSON in exactly this shape:
{
  "content": { "score": number, "feedback": string },
  "coherenceCohesion": { "score": number, "feedback": string },
  "lexicalResource": { "score": number, "feedback": string },
  "grammaticalRange": { "score": number, "feedback": string },
  "overall": number,
  "improvements": [string, string, string],
  "annotatedSentences": [{ "text": string, "issue": string }]
}
All criteria scores 0-5. Overall is on the 10-90 PTE scale.

Prompt: """${safePrompt}"""
Essay: """${safeEssay}"""`;

    case "det":
    default:
      return `${base}

You are a Duolingo English Test rater. Score the four DET subscores that writing contributes to: Literacy, Production, Conversation (only if applicable), Comprehension (only if applicable). Use 0-5 scores per criterion. Map overall to the DET 10-160 scale (10 = 0, 160 = 5).

Return JSON in exactly this shape:
{
  "content": { "score": number, "feedback": string },
  "language": { "score": number, "feedback": string },
  "coherenceCohesion": { "score": number, "feedback": string },
  "lexicalResource": { "score": number, "feedback": string },
  "overall": number,
  "improvements": [string, string, string],
  "annotatedSentences": [{ "text": string, "issue": string }]
}

Prompt: """${safePrompt}"""
Response: """${safeEssay}"""`;
  }
}

export function speakingPromptFor(
  testType: TestType,
  data: {
    prompt: string;
    transcript: string;
    audioSeconds: number;
    pauseCount: number;
    words: number;
  }
) {
  const wpm = data.audioSeconds
    ? Math.round((data.words / data.audioSeconds) * 60)
    : 0;
  const scale = testType === "ielts"
    ? "0-9 half-band"
    : testType === "toefl"
      ? "0-5 rubric (mapped to 0-30 section)"
      : testType === "pte"
        ? "0-5 rubric (mapped to 10-90)"
        : "0-5 rubric (mapped to 10-160)";

  return `You are an experienced ${testType.toUpperCase()} Speaking examiner. Score the response on ${scale}.

Audio metrics:
- Duration: ${data.audioSeconds.toFixed(1)}s
- Words spoken: ${data.words}
- Estimated pace: ${wpm} wpm
- Pause count: ${data.pauseCount}

Return ONLY a valid JSON object in this shape:
{
  "pronunciation": { "score": number, "feedback": string },
  "fluency": { "score": number, "feedback": string },
  "coherence": { "score": number, "feedback": string },
  "lexical": { "score": number, "feedback": string },
  "overall": number,
  "improvements": [string, string, string],
  "transcript": string
}

Prompt: """${data.prompt}"""
Transcript: """${data.transcript}"""`;
}
