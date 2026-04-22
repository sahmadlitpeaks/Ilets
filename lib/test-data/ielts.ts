import type { TestContent } from "@/types";

export const ieltsWritingFullMock: TestContent = {
  overview:
    "IELTS Academic Writing — two tasks totalling 60 minutes. Task 1 (20m, 150 words) describes a visual. Task 2 (40m, 250 words) argues a position.",
  sections: [
    {
      id: "ielts-writing-1",
      title: "Writing — Full Test",
      section: "writing",
      durationMinutes: 60,
      questions: [
        {
          id: "w-task1",
          type: "essay",
          task: "task1",
          prompt:
            "The bar chart below shows the proportion of household energy consumed by four appliance categories — heating, cooling, lighting, and electronics — in three countries (Norway, Japan, and Brazil) in 2022. Summarise the key features and make comparisons where relevant.",
          instructions:
            "Write at least 150 words. You should spend about 20 minutes on this task.",
          minWords: 150,
        },
        {
          id: "w-task2",
          type: "essay",
          task: "task2",
          prompt:
            "Some people believe that governments should fund the arts in the same way they fund healthcare and education. Others argue that cultural funding should come from private individuals and companies. Discuss both views and give your own opinion.",
          instructions:
            "Write at least 250 words. You should spend about 40 minutes on this task.",
          minWords: 250,
        },
      ],
    },
  ],
};

export const ieltsReadingQuickMock: TestContent = {
  overview:
    "IELTS Academic Reading — a short, original passage with 8 questions. The real exam has 3 passages and 40 questions in 60 minutes.",
  sections: [
    {
      id: "ielts-reading-1",
      title: "Reading — Lichens: the quiet pioneers",
      section: "reading",
      durationMinutes: 20,
      passage: `Lichens are among the most unassuming organisms on Earth, yet they have shaped landscapes for more than four hundred million years. A lichen is not a single organism but a partnership — usually between a fungus and an alga, sometimes with the addition of a cyanobacterium. The fungal partner provides structure and moisture, while the photosynthetic partner produces sugars. This arrangement is so stable that some lichen colonies in the Arctic are thought to be over eight thousand years old.

The ecological role of lichens is out of proportion to their size. On bare rock, they secrete mild acids that dissolve mineral surfaces, producing the first trace of soil. Mosses and grasses follow, and eventually forests. Without lichens, the pace of succession on new volcanic islands, glacial moraines, and quarry tailings would be measured in millennia rather than decades.

Lichens also act as sensitive pollution detectors. Because they lack roots and absorb nutrients directly from rainwater and mist, they accumulate airborne toxins quickly. After the closure of several coal plants in the English Midlands in the 1990s, ecologists recorded a return of once-vanished species such as Usnea filipendula within fifteen years — a living record of cleaner air.

Despite their resilience, lichens are not indestructible. Nitrogen pollution from intensive agriculture favours a handful of aggressive species at the expense of diversity, and changes in humidity linked to a warming climate threaten alpine communities in particular. Conservationists have begun transplanting slow-growing species to cooler refugia, an unusual measure for organisms once considered too humble to notice.`,
      questions: [
        {
          id: "r1",
          type: "mcq-single",
          prompt:
            "According to the passage, a lichen is best described as:",
          options: [
            { id: "a", text: "A single fungus with photosynthetic tissue." },
            {
              id: "b",
              text: "A partnership between a fungus and at least one photosynthetic organism.",
            },
            { id: "c", text: "A type of slow-growing moss." },
            { id: "d", text: "A bacterium that feeds on rock." },
          ],
          correct: ["b"],
        },
        {
          id: "r2",
          type: "true-false-ng",
          prompt: "Decide if each statement matches the passage.",
          statements: [
            {
              id: "s1",
              text: "Some lichen colonies are older than 5,000 years.",
              correct: "true",
            },
            {
              id: "s2",
              text: "Lichens cannot grow on surfaces that lack soil.",
              correct: "false",
            },
            {
              id: "s3",
              text: "All lichen species benefit from increased nitrogen.",
              correct: "false",
            },
            {
              id: "s4",
              text: "Lichens were first discovered by scientists in the 1990s.",
              correct: "not-given",
            },
          ],
        },
        {
          id: "r3",
          type: "mcq-single",
          prompt:
            "Why does the author mention the English Midlands in paragraph three?",
          options: [
            { id: "a", text: "To show that lichens thrive in polluted air." },
            {
              id: "b",
              text: "To illustrate how lichen recovery can indicate improved air quality.",
            },
            { id: "c", text: "To explain a specific coal plant's design." },
            { id: "d", text: "To describe a conservation failure." },
          ],
          correct: ["b"],
        },
        {
          id: "r4",
          type: "fill-blank",
          prompt: "Complete the summary with one word per blank.",
          passage:
            "Lichens break down rock by releasing mild [[1]], producing the first trace of [[2]]. Because they absorb nutrients from rainwater and mist, they act as early [[3]] of air pollution.",
          blanks: [
            { id: "1", accepted: ["acids", "acid"] },
            { id: "2", accepted: ["soil"] },
            {
              id: "3",
              accepted: ["detectors", "indicators", "monitors"],
            },
          ],
        },
      ],
    },
  ],
};

export const ieltsSpeakingMock: TestContent = {
  overview:
    "IELTS Speaking — an 11–14 minute interview in three parts. This practice covers Parts 2 and 3.",
  sections: [
    {
      id: "ielts-speaking-1",
      title: "Speaking — Parts 2 & 3",
      section: "speaking",
      durationMinutes: 8,
      questions: [
        {
          id: "sp-part2",
          type: "speaking",
          prompt:
            "Describe a piece of advice you received that turned out to be useful. You should say: who gave it to you, when it was given, why it was useful, and explain how you acted on it.",
          instructions:
            "You will have 1 minute to prepare and up to 2 minutes to speak.",
          prepSeconds: 60,
          responseSeconds: 120,
        },
        {
          id: "sp-part3-1",
          type: "speaking",
          prompt:
            "Do you think people today are more or less willing to accept advice from older generations than they were in the past?",
          prepSeconds: 15,
          responseSeconds: 90,
        },
      ],
    },
  ],
};
