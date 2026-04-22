import { TestPicker } from "@/components/test-player/test-picker";
import { testsByType } from "@/lib/test-data";

export default function ToeflPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  return (
    <TestPicker
      testType="toefl"
      tests={testsByType("toefl")}
      selectedSlug={searchParams.slug}
    />
  );
}
