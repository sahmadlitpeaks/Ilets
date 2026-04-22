import { TestPicker } from "@/components/test-player/test-picker";
import { testsByType } from "@/lib/test-data";

export default function DetPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  return (
    <TestPicker
      testType="det"
      tests={testsByType("det")}
      selectedSlug={searchParams.slug}
    />
  );
}
