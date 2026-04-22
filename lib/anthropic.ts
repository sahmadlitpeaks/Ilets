import Anthropic from "@anthropic-ai/sdk";

// This file is SERVER-ONLY. Never import from client code.
// The Anthropic API key must only be read on the server.

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Feedback endpoints are unavailable."
    );
  }
  if (!cached) {
    cached = new Anthropic({ apiKey });
  }
  return cached;
}

export const CLAUDE_MODEL = "claude-sonnet-4-6";

export function extractFirstJsonObject(text: string): unknown {
  // Claude is asked to return JSON only, but occasionally wraps it in prose.
  // Extract the first balanced {...} block.
  const start = text.indexOf("{");
  if (start < 0) throw new Error("No JSON object found in model response");
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        const slice = text.slice(start, i + 1);
        return JSON.parse(slice);
      }
    }
  }
  throw new Error("Unbalanced JSON in model response");
}
