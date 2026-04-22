import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const bodySchema = z.object({
  skill: z.enum(["grammar", "vocabulary", "reading", "listening"]),
  attempted: z.number().int().min(0).max(200),
  correct: z.number().int().min(0).max(200),
});

export async function POST(req: Request) {
  let body;
  try {
    body = bodySchema.parse(await req.json());
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

  const { error } = await supabase.from("drill_sessions").insert({
    user_id: user.id,
    skill: body.skill,
    questions_attempted: body.attempted,
    questions_correct: body.correct,
  });

  if (error) {
    console.error("[drills/submit]", error);
    return NextResponse.json(
      { error: "Could not save session" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
