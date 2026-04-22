import { TestPicker } from "@/components/test-player/test-picker";
import { testsByType } from "@/lib/test-data";

export default function PtePage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  return (
    <TestPicker
      testType="pte"
      tests={testsByType("pte")}
      selectedSlug={searchParams.slug}
    />
  );
}
