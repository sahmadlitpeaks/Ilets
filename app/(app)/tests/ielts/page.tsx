import { TestPicker } from "@/components/test-player/test-picker";
import { testsByType } from "@/lib/test-data";

export default function IeltsPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  const tests = testsByType("ielts");
  return (
    <TestPicker
      testType="ielts"
      tests={tests}
      selectedSlug={searchParams.slug}
    />
  );
}
