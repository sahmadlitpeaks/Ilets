import { DrillRunner } from "@/components/drills/drill-runner";
import { vocabularyDrills } from "@/lib/test-data/drills";

export default function VocabularyDrillsPage() {
  return (
    <DrillRunner
      skill="vocabulary"
      title="10 vocabulary questions"
      questions={vocabularyDrills}
    />
  );
}
