import type { TestContent } from "@/types";

export const detReadAndSelect: TestContent = {
  overview:
    "DET 'Read and Select' — pick all real English words from a list that includes invented words. 10 items, quick.",
  sections: [
    {
      id: "det-read-select",
      title: "Read and Select — real English words",
      section: "full",
      durationMinutes: 5,
      questions: [
        {
          id: "det-rs-1",
          type: "mcq-multi",
          prompt: "Select all words that are real English words.",
          options: [
            { id: "a", text: "crinkle" },
            { id: "b", text: "gleptar" },
            { id: "c", text: "veracity" },
            { id: "d", text: "frundle" },
            { id: "e", text: "meander" },
            { id: "f", text: "plorish" },
          ],
          correct: ["a", "c", "e"],
        },
        {
          id: "det-rs-2",
          type: "mcq-multi",
          prompt: "Select all words that are real English words.",
          options: [
            { id: "a", text: "auspicious" },
            { id: "b", text: "menifold" },
            { id: "c", text: "quinary" },
            { id: "d", text: "tractor" },
            { id: "e", text: "omblique" },
          ],
          correct: ["a", "c", "d"],
        },
        {
          id: "det-rs-3",
          type: "mcq-multi",
          prompt: "Select all words that are real English words.",
          options: [
            { id: "a", text: "belligerent" },
            { id: "b", text: "grappling" },
            { id: "c", text: "trundish" },
            { id: "d", text: "flenching" },
            { id: "e", text: "luminous" },
          ],
          correct: ["a", "b", "e"],
        },
      ],
    },
  ],
};

export const detCompleteSentences: TestContent = {
  overview:
    "DET 'Complete the Sentences' — type the missing letters to produce a correct sentence. Tests spelling, grammar, and vocabulary.",
  sections: [
    {
      id: "det-complete-sentences",
      title: "Complete the Sentences",
      section: "full",
      durationMinutes: 8,
      questions: [
        {
          id: "det-cs-1",
          type: "fill-blank",
          prompt: "Fill in the missing word so the sentence is grammatical.",
          passage:
            "The committee [[1]] divided, with five members in favour and four against.",
          blanks: [
            { id: "1", accepted: ["was", "is", "remained", "stayed"] },
          ],
        },
        {
          id: "det-cs-2",
          type: "fill-blank",
          prompt: "Fill in each blank with one word.",
          passage:
            "Although the forecast had predicted heavy rain, the match went [[1]] as scheduled, and the crowd stayed [[2]] the final whistle.",
          blanks: [
            { id: "1", accepted: ["ahead", "on"] },
            { id: "2", accepted: ["until", "till", "for"] },
          ],
        },
        {
          id: "det-cs-3",
          type: "fill-blank",
          prompt: "Complete the passage.",
          passage:
            "She spent three years [[1]] her first novel, and when it finally appeared, reviewers praised its [[2]] of voice and its understated wit.",
          blanks: [
            { id: "1", accepted: ["writing", "drafting"] },
            { id: "2", accepted: ["clarity", "originality", "consistency"] },
          ],
        },
      ],
    },
  ],
};

export const detWriteAboutPhoto: TestContent = {
  overview:
    "DET 'Write About the Photo' — describe an image in writing in one minute. 15-second preparation, 60-second response.",
  sections: [
    {
      id: "det-write-photo",
      title: "Write About the Photo",
      section: "full",
      durationMinutes: 2,
      questions: [
        {
          id: "det-wp-1",
          type: "essay",
          task: "independent",
          prompt:
            "Image description (write in at least 30 words):\n\nAn elderly woman is sitting on a wooden bench at a farmers' market. She wears a red headscarf and is arranging small baskets of strawberries on a striped cloth in front of her. A young boy, no older than six, is standing beside her and holding up a single strawberry as if showing it to someone off-camera. Behind them, a chalkboard reads 'Fresh today — £3 a box.'",
          instructions: "You have 1 minute. Write at least 30 words.",
          minWords: 30,
        },
      ],
    },
  ],
};

export const detSpeakingSample: TestContent = {
  overview:
    "DET 'Speaking Sample' — an unscored-but-reported open response, 1-3 minutes long, used by admissions officers to hear you speak naturally.",
  sections: [
    {
      id: "det-speak-sample",
      title: "Speaking Sample",
      section: "full",
      durationMinutes: 4,
      questions: [
        {
          id: "det-sp-1",
          type: "speaking",
          prompt:
            "Choose ONE of the following and speak for 1-3 minutes:\n\n(a) Describe a book, film, or piece of music that changed how you see a particular subject. Explain what you thought before and what you think now.\n\n(b) If you could spend one week studying anywhere in the world, where would you go and what would you try to learn?",
          instructions:
            "20 seconds to prepare. Speak naturally for at least 1 minute.",
          prepSeconds: 20,
          responseSeconds: 180,
        },
      ],
    },
  ],
};

export const detInteractiveReading: TestContent = {
  overview:
    "DET 'Interactive Reading' — an adaptive passage with four short follow-up tasks: fill-the-blank, comprehension, and idea-matching.",
  sections: [
    {
      id: "det-interactive-reading",
      title: "Interactive Reading — Sleep & memory",
      section: "full",
      durationMinutes: 10,
      passage: `For much of the twentieth century, sleep was treated as a passive state — the nervous system switching off until morning. Research over the last thirty years has dismantled that view. Sleep is now understood to be a period of intense reorganisation in which the brain consolidates what was learned during the day, strengthens useful connections, and prunes those that are not. The effect is easiest to see in memory tests: participants who sleep after studying almost always outperform those who stayed awake, even when the waking group had the same amount of rest in total.

More recent work suggests that different stages of sleep serve different roles. Slow-wave sleep — the deepest, dominant in the first half of the night — appears to be essential for retaining factual information. REM sleep, more common towards morning, seems to support associative and creative thinking. This may be why a night of disrupted sleep affects different cognitive tasks unequally, and why cutting short the final hours of sleep tends to damage creativity more than simple recall.`,
      questions: [
        {
          id: "det-ir-1",
          type: "fill-blank",
          prompt:
            "Complete the short summary using ONE word per blank.",
          passage:
            "Twentieth-century researchers once described sleep as a [[1]] state. Modern research has shown that the brain actively [[2]] new memories during sleep. Participants who sleep after studying usually [[3]] those who stay awake.",
          blanks: [
            { id: "1", accepted: ["passive"] },
            { id: "2", accepted: ["consolidates", "reorganises", "reorganizes"] },
            { id: "3", accepted: ["outperform", "beat"] },
          ],
        },
        {
          id: "det-ir-2",
          type: "mcq-single",
          prompt:
            "According to the passage, slow-wave sleep is especially important for:",
          options: [
            { id: "a", text: "creative and associative thinking" },
            { id: "b", text: "retaining factual information" },
            { id: "c", text: "regulating emotional response" },
            { id: "d", text: "muscle repair" },
          ],
          correct: ["b"],
        },
        {
          id: "det-ir-3",
          type: "mcq-single",
          prompt:
            "Why does the author suggest cutting short the final hours of sleep is particularly damaging to creativity?",
          options: [
            {
              id: "a",
              text: "Because creativity depends most on REM sleep, which dominates the morning",
            },
            { id: "b", text: "Because creative people sleep more than others" },
            {
              id: "c",
              text: "Because slow-wave sleep happens at the end of the night",
            },
            {
              id: "d",
              text: "Because naps are more restorative than full nights",
            },
          ],
          correct: ["a"],
        },
        {
          id: "det-ir-4",
          type: "true-false-ng",
          prompt: "Decide whether each statement matches the passage.",
          statements: [
            {
              id: "s1",
              text: "Researchers once believed the nervous system shut down during sleep.",
              correct: "true",
            },
            {
              id: "s2",
              text: "Awake participants usually score higher than sleeping participants on memory tests.",
              correct: "false",
            },
            {
              id: "s3",
              text: "REM sleep has been linked to emotional regulation.",
              correct: "not-given",
            },
          ],
        },
      ],
    },
  ],
};

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
