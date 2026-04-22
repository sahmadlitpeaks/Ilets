import type { TestType } from "@/types";

export * as ielts from "./ielts";
export * as toefl from "./toefl";
export * as pte from "./pte";
export * as det from "./det";

export function scaleLabelFor(testType: TestType) {
  switch (testType) {
    case "ielts":
      return { min: 0, max: 9, step: 0.5, label: "Band" };
    case "toefl":
      return { min: 0, max: 120, step: 1, label: "Score" };
    case "pte":
      return { min: 10, max: 90, step: 1, label: "Score" };
    case "det":
      return { min: 10, max: 160, step: 5, label: "Score" };
  }
}
