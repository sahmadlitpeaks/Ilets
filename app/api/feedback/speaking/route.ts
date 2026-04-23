import { NextResponse } from "next/server";
import { z } from "zod";
import { generateJson } from "@/lib/llm";
import { speakingPromptFor } from "@/lib/feedback-prompts";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const bodySchema = z.object({
  testType: z.enum(["ielts", "toefl", "pte", "det"]),
  prompt: z.string().min(10),
  transcript: z.string().min(1).max(20_000),
  audioSeconds: z.number().min(0).max(600),
  pauseCount: z.number().int().min(0).max(500).default(0),
  attemptId: z.string().uuid().optional(),
});

function countWords(s: string) {
  const t = s.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

export async function POST(req: Request) {
  let parsed;
  try {
    const json = await req.json();
    parsed = bodySchema.parse(json);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body", details: String(err) },
      { status: 400 }
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let feedback: unknown;
  let provider = "unknown";
  let model = "unknown";
  try {
    const promptText = speakingPromptFor(parsed.testType, {
      prompt: parsed.prompt,
      transcript: parsed.transcript,
      audioSeconds: parsed.audioSeconds,
      pauseCount: parsed.pauseCount,
      words: countWords(parsed.transcript),
    });
    const result = await generateJson({
      prompt: promptText,
      maxTokens: 1600,
      temperature: 0.2,
    });
    feedback = result.data;
    provider = result.provider;
    model = result.model;
  } catch (err) {
    console.error("[feedback/speaking] LLM error", err);
    return NextResponse.json(
      {
        error: "Feedback unavailable, try again.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }

  if (parsed.attemptId) {
    const overall = (feedback as { overall?: number }).overall;
    await supabase
      .from("attempts")
      .update({
        ai_feedback: feedback,
        ai_score: typeof overall === "number" ? overall : null,
        band_score: typeof overall === "number" ? overall : null,
        completed_at: new Date().toISOString(),
        status: "graded",
      })
      .eq("id", parsed.attemptId)
      .eq("user_id", user.id);
  }

  return NextResponse.json({ feedback, provider, model });
}
