import { NextResponse } from "next/server";
import { z } from "zod";
import { generateJson } from "@/lib/llm";
import { writingPromptFor } from "@/lib/feedback-prompts";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  testType: z.enum(["ielts", "toefl", "pte", "det"]),
  prompt: z.string().min(10),
  essay: z.string().min(20).max(10_000),
  task: z.enum(["task1", "task2", "integrated", "independent"]).optional(),
  attemptId: z.string().uuid().optional(),
});

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
    const promptText = writingPromptFor(parsed.testType, {
      prompt: parsed.prompt,
      essay: parsed.essay,
      task: parsed.task,
    });
    const result = await generateJson({
      prompt: promptText,
      maxTokens: 2048,
      temperature: 0.2,
    });
    feedback = result.data;
    provider = result.provider;
    model = result.model;
  } catch (err) {
    console.error("[feedback/writing] LLM error", err);
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
