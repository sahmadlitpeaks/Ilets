import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const submitSchema = z.object({
  testId: z.string().uuid().nullable().optional(),
  testSlug: z.string().min(2),
  testType: z.enum(["ielts", "toefl", "pte", "det"]),
  answers: z.record(z.any()),
  autoScore: z.number().nullable().optional(),
  status: z.enum(["in_progress", "completed", "graded"]).default("completed"),
});

export async function POST(req: Request) {
  let body;
  try {
    body = submitSchema.parse(await req.json());
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

  const payload = {
    user_id: user.id,
    test_id: body.testId ?? null,
    answers: {
      ...body.answers,
      _slug: body.testSlug,
      _testType: body.testType,
    },
    auto_score: body.autoScore ?? null,
    completed_at:
      body.status === "in_progress" ? null : new Date().toISOString(),
    status: body.status,
  };

  const { data, error } = await supabase
    .from("attempts")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("[tests/submit] supabase error", error);
    return NextResponse.json(
      { error: "Could not save attempt", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ attemptId: data.id });
}
