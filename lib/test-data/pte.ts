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

export const pteListeningMC: TestContent = {
  overview:
    "PTE Listening — 'Multiple Choice, Choose Multiple Answers' practice on a short academic recording.",
  sections: [
    {
      id: "pte-listening-mc",
      title: "Listening — Multiple Choice (choose multiple)",
      section: "listening",
      durationMinutes: 10,
      passage: `TRANSCRIPT (listen, then answer):

SPEAKER: Good afternoon. In this short talk I'd like to explain why the humble dandelion — so often dismissed as a weed — has become a subject of serious pharmacological research in the past decade.

Dandelions have been used in folk medicine across Europe and East Asia for centuries, traditionally as a diuretic and a liver tonic. What's changed is that modern analytical techniques have let researchers isolate specific compounds in the root and leaf — particularly taraxasterol and chicoric acid. Small laboratory studies have found that these compounds appear to influence pathways involved in insulin regulation and, separately, in the inflammatory response.

Now, before anyone rushes to the garden, a few cautions. First, most of the evidence is from cell cultures and animal studies — a long way from proof in humans. Second, the compounds are present in variable quantities depending on where the plant grows and when it is harvested. A dandelion from a polluted urban lawn is unlikely to be the plant the researchers are working with. Third, drug-dandelion interactions are a real concern, particularly for people on anticoagulants or lithium.

So the honest answer is: interesting, but early. The dandelion is a good example of how folk knowledge can point towards molecules worth studying, even if the popular 'miracle cure' framing runs far ahead of the data.`,
      questions: [
        {
          id: "ptl-1",
          type: "mcq-multi",
          prompt:
            "Which TWO compounds in dandelion does the speaker specifically mention?",
          options: [
            { id: "a", text: "taraxasterol" },
            { id: "b", text: "chicoric acid" },
            { id: "c", text: "curcumin" },
            { id: "d", text: "resveratrol" },
          ],
          correct: ["a", "b"],
        },
        {
          id: "ptl-2",
          type: "mcq-multi",
          prompt:
            "Which cautions does the speaker raise about dandelion use? Select ALL that apply.",
          options: [
            {
              id: "a",
              text: "Most evidence is from cell or animal studies, not humans",
            },
            {
              id: "b",
              text: "Compound levels vary with growing conditions",
            },
            {
              id: "c",
              text: "Interactions with certain medications are possible",
            },
            {
              id: "d",
              text: "Dandelions have been banned in many countries",
            },
          ],
          correct: ["a", "b", "c"],
        },
        {
          id: "ptl-3",
          type: "mcq-single",
          prompt: "What is the speaker's overall stance?",
          options: [
            {
              id: "a",
              text: "Dandelion is a confirmed miracle cure for diabetes",
            },
            {
              id: "b",
              text: "Dandelion research is promising but still early",
            },
            { id: "c", text: "Dandelion has no medicinal value at all" },
            {
              id: "d",
              text: "Dandelion research has produced strong human trial results",
            },
          ],
          correct: ["b"],
        },
      ],
    },
  ],
};

export const pteReorderParagraphs: TestContent = {
  overview:
    "PTE Reading — 'Re-order Paragraphs'. Drag sentences into the logical order of an academic text.",
  sections: [
    {
      id: "pte-reorder",
      title: "Reading — Re-order Paragraphs",
      section: "reading",
      durationMinutes: 8,
      questions: [
        {
          id: "pte-ro-1",
          type: "sentence-order",
          prompt:
            "Arrange the sentences into a coherent paragraph about the development of the photograph.",
          sentences: [
            {
              id: "s-a",
              text: "In the 1820s, a French inventor named Nicéphore Niépce produced the earliest surviving permanent image — a rooftop view exposed over eight hours on a pewter plate.",
            },
            {
              id: "s-b",
              text: "Before photography, documenting a scene required a skilled artist and, typically, several hours of sketching.",
            },
            {
              id: "s-c",
              text: "Niépce's process was refined a decade later by his partner Louis Daguerre, whose silver-plated 'daguerreotype' reduced exposures to minutes and introduced photography to the public.",
            },
            {
              id: "s-d",
              text: "By the 1880s, George Eastman's roll film had simplified the camera to the point where untrained amateurs could produce their own pictures.",
            },
            {
              id: "s-e",
              text: "The twentieth century then saw a cascade of further refinements, from colour film to instant prints to the digital sensor.",
            },
          ],
          correctOrder: ["s-b", "s-a", "s-c", "s-d", "s-e"],
        },
      ],
    },
  ],
};

export const pteSpeakingDescribeImage: TestContent = {
  overview:
    "PTE Speaking — 'Describe Image'. You have 25 seconds to study, then 40 seconds to describe the scene in detail.",
  sections: [
    {
      id: "pte-describe-image",
      title: "Speaking — Describe Image",
      section: "speaking",
      durationMinutes: 3,
      questions: [
        {
          id: "pte-di-1",
          type: "speaking",
          prompt:
            "Image description (study, then describe aloud):\n\nA bar chart compares the average annual rainfall (in millimetres) of four European cities in 2023: Oslo (763), London (617), Rome (798), and Athens (414). Oslo and Rome have nearly identical totals, while Athens receives almost half as much rain as London. A dotted horizontal line marks the European average at 725 millimetres. Only Rome and Oslo exceed the average; London falls just below it, and Athens sits well below.",
          instructions:
            "You have 25 seconds to prepare. Speak for up to 40 seconds describing the key features, comparisons, and any noteworthy trend.",
          prepSeconds: 25,
          responseSeconds: 40,
        },
      ],
    },
  ],
};

export const pteSummarizeText: TestContent = {
  overview:
    "PTE Writing — 'Summarise Written Text'. Condense a passage into a single sentence of 5-75 words. 10 minutes.",
  sections: [
    {
      id: "pte-summarize",
      title: "Writing — Summarise Written Text",
      section: "writing",
      durationMinutes: 10,
      passage: `Although the tomato is now a kitchen staple across Italy, Spain, and much of the Mediterranean, it arrived in Europe only in the sixteenth century, brought from Central America by Spanish explorers. For almost two hundred years Europeans regarded it with suspicion. Its glossy skin and acidic juice were thought to leach lead from the pewter plates used by wealthy households, producing occasional cases of metal poisoning that were mistakenly blamed on the fruit itself. Poorer families, who ate from wooden trenchers, could consume tomatoes safely and did — but their experience went largely unrecorded. The tomato's rehabilitation began in the late eighteenth century, first in Neapolitan street cookery and then across the Italian peninsula, before its formal reintroduction to northern European cuisine in the Victorian era.`,
      questions: [
        {
          id: "pte-sum-1",
          type: "essay",
          task: "task1",
          prompt:
            "Summarise the passage in ONE sentence between 5 and 75 words. Your summary must capture the main idea and express it grammatically as a single complete sentence.",
          instructions: "One sentence, 5-75 words.",
          minWords: 5,
          maxWords: 75,
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
