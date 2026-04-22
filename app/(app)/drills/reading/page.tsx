import { DrillRunner } from "@/components/drills/drill-runner";
import { readingDrills } from "@/lib/test-data/drills";

export default function ReadingDrillsPage() {
  return (
    <DrillRunner
      skill="reading"
      title="10 reading comprehension questions"
      questions={readingDrills}
    />
  );
}
