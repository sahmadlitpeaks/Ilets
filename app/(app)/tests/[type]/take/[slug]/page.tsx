import { notFound } from "next/navigation";
import { TestPlayer } from "@/components/test-player/test-player";
import { findTest } from "@/lib/test-data";
import type { TestType } from "@/types";

const VALID: TestType[] = ["ielts", "toefl", "pte", "det"];

export default function TakeTestPage({
  params,
}: {
  params: { type: string; slug: string };
}) {
  if (!VALID.includes(params.type as TestType)) notFound();
  const test = findTest(params.slug);
  if (!test || test.testType !== params.type) notFound();

  return <TestPlayer test={test} />;
}
