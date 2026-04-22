import { DrillRunner } from "@/components/drills/drill-runner";
import { listeningDrills } from "@/lib/test-data/drills";

export default function ListeningDrillsPage() {
  return (
    <DrillRunner
      skill="listening"
      title="10 listening transcripts"
      questions={listeningDrills}
    />
  );
}
