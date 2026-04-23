import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Server-only. Never import from client code.
//
// Provider selection (highest priority first):
//   1. ANTHROPIC_API_KEY → Claude
//   2. GEMINI_API_KEY    → Gemini (free tier friendly)

export type LlmProvider = "anthropic" | "gemini" | "none";
export type LlmRequest = {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
};
export type LlmResult = {
  text: string;
  provider: LlmProvider;
  model: string;
};

const ANTHROPIC_MODEL = "claude-sonnet-4-6";
const GEMINI_MODEL = "gemini-2.0-flash";

let anthropicClient: Anthropic | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

export function detectProvider(): LlmProvider {
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return "gemini";
  return "none";
}

function getAnthropicClient() {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
  }
  return anthropicClient;
}

function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY!;
    geminiClient = new GoogleGenerativeAI(key);
  }
  return geminiClient;
}

async function callAnthropic(req: LlmRequest): Promise<LlmResult> {
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: req.maxTokens ?? 2048,
    temperature: req.temperature ?? 0.2,
    messages: [{ role: "user", content: req.prompt }],
  });
  const text = response.content
    .filter((b): b is { type: "text"; text: string } => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  return { text, provider: "anthropic", model: ANTHROPIC_MODEL };
}

async function callGemini(req: LlmRequest): Promise<LlmResult> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      temperature: req.temperature ?? 0.2,
      maxOutputTokens: req.maxTokens ?? 2048,
      responseMimeType: "application/json",
    },
  });
  const result = await model.generateContent(req.prompt);
  const text = result.response.text();
  return { text, provider: "gemini", model: GEMINI_MODEL };
}

export async function generate(req: LlmRequest): Promise<LlmResult> {
  const provider = detectProvider();
  switch (provider) {
    case "anthropic":
      return callAnthropic(req);
    case "gemini":
      return callGemini(req);
    case "none":
      throw new Error(
        "No LLM provider configured. Set ANTHROPIC_API_KEY or GEMINI_API_KEY."
      );
  }
}

export function extractFirstJsonObject(text: string): unknown {
  // Both Claude (occasionally) and Gemini may wrap JSON in code fences or
  // surrounding prose. Strip code fences and extract the first balanced
  // {...} block.
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  const start = cleaned.indexOf("{");
  if (start < 0) throw new Error("No JSON object found in model response");
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];
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
        return JSON.parse(cleaned.slice(start, i + 1));
      }
    }
  }
  throw new Error("Unbalanced JSON in model response");
}

export async function generateJson<T = unknown>(req: LlmRequest): Promise<{
  data: T;
  provider: LlmProvider;
  model: string;
}> {
  const result = await generate(req);
  const data = extractFirstJsonObject(result.text) as T;
  return { data, provider: result.provider, model: result.model };
}
