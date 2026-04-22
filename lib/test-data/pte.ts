import type { TestContent } from "@/types";

export const pteWritingMock: TestContent = {
  overview:
    "PTE Academic — 'Write Essay' task. 200-300 words, 20 minutes.",
  sections: [
    {
      id: "pte-writing-1",
      title: "Writing — Essay",
      section: "writing",
      durationMinutes: 20,
      questions: [
        {
          id: "pte-w1",
          type: "essay",
          task: "task2",
          prompt:
            "Remote working has become a permanent option at many companies. What are the advantages and disadvantages of working from home, and which do you think outweighs the other?",
          instructions:
            "Write 200-300 words. You will lose marks for responses outside this range.",
          minWords: 200,
          maxWords: 300,
        },
      ],
    },
  ],
};

export const pteReadingMock: TestContent = {
  overview:
    "PTE Reading — 'Reading and Writing: Fill in the Blanks' practice set.",
  sections: [
    {
      id: "pte-reading-1",
      title: "Reading — Fill in the Blanks",
      section: "reading",
      durationMinutes: 10,
      questions: [
        {
          id: "pte-r1",
          type: "fill-blank",
          prompt:
            "Read the passage and complete it by selecting the best word for each blank.",
          passage:
            "Urban heat islands occur when cities experience [[1]] temperatures than surrounding rural areas, largely because concrete and asphalt [[2]] more solar radiation during the day and release it slowly at night. Planting trees and installing 'green roofs' are two widely studied [[3]] measures.",
          blanks: [
            { id: "1", accepted: ["higher", "warmer"] },
            { id: "2", accepted: ["absorb", "retain"] },
            { id: "3", accepted: ["mitigation", "cooling"] },
          ],
        },
      ],
    },
  ],
};
