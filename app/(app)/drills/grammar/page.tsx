import { DrillRunner } from "@/components/drills/drill-runner";
import { grammarDrills } from "@/lib/test-data/drills";

export default function GrammarDrillsPage() {
  return (
    <DrillRunner
      skill="grammar"
      title="10 grammar questions"
      questions={grammarDrills}
    />
  );
}
