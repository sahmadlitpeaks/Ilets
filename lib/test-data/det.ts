import type { TestContent } from "@/types";

export const detQuickMock: TestContent = {
  overview:
    "Duolingo English Test — an adaptive, mixed-skill 45-minute test. This practice is a short sampler covering 'Write About the Photo' and an interactive reading task.",
  sections: [
    {
      id: "det-quick-1",
      title: "DET — Mixed Skill Sampler",
      section: "full",
      durationMinutes: 12,
      questions: [
        {
          id: "det-q1",
          type: "mcq-single",
          prompt:
            "Choose the word that is spelled correctly in standard English.",
          options: [
            { id: "a", text: "recieve" },
            { id: "b", text: "receive" },
            { id: "c", text: "receeve" },
            { id: "d", text: "receve" },
          ],
          correct: ["b"],
        },
        {
          id: "det-q2",
          type: "mcq-multi",
          prompt: "Select ALL real English words.",
          options: [
            { id: "a", text: "meticulous" },
            { id: "b", text: "glorbous" },
            { id: "c", text: "ephemeral" },
            { id: "d", text: "frantish" },
          ],
          correct: ["a", "c"],
        },
        {
          id: "det-q3",
          type: "essay",
          task: "independent",
          prompt:
            "Write about a public place in your city that you think visitors should see. Describe what makes it special and what visitors can do there.",
          instructions: "Write at least 50 words. You have 5 minutes.",
          minWords: 50,
        },
        {
          id: "det-q4",
          type: "speaking",
          prompt:
            "Describe a person you admire. Explain who they are, what they do, and why you admire them.",
          prepSeconds: 20,
          responseSeconds: 60,
        },
      ],
    },
  ],
};
