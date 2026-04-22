import type { Question } from "@/types";

export const grammarDrills: Question[] = [
  {
    id: "g1",
    type: "mcq-single",
    prompt: "Choose the sentence that is grammatically correct.",
    options: [
      { id: "a", text: "If I would have known, I would have told you." },
      { id: "b", text: "If I had known, I would have told you." },
      { id: "c", text: "If I have known, I would told you." },
      { id: "d", text: "If I knew, I would told you." },
    ],
    correct: ["b"],
  },
  {
    id: "g2",
    type: "mcq-single",
    prompt: "Select the correct article: 'She has ___ MBA from a top university.'",
    options: [
      { id: "a", text: "a" },
      { id: "b", text: "an" },
      { id: "c", text: "the" },
      { id: "d", text: "(no article)" },
    ],
    correct: ["b"],
  },
  {
    id: "g3",
    type: "mcq-single",
    prompt:
      "Choose the correct form: 'The committee ___ divided over the proposal.'",
    options: [
      { id: "a", text: "is" },
      { id: "b", text: "are" },
      { id: "c", text: "were" },
      { id: "d", text: "has" },
    ],
    correct: ["a"],
  },
  {
    id: "g4",
    type: "mcq-single",
    prompt:
      "Which sentence uses 'fewer' correctly?",
    options: [
      { id: "a", text: "There are fewer traffic today than yesterday." },
      { id: "b", text: "There are fewer cars on the road today." },
      { id: "c", text: "There is fewer water in the bottle." },
      { id: "d", text: "There is fewer noise outside." },
    ],
    correct: ["b"],
  },
  {
    id: "g5",
    type: "mcq-single",
    prompt:
      "Pick the correct preposition: 'The policy applies ___ all full-time staff.'",
    options: [
      { id: "a", text: "on" },
      { id: "b", text: "for" },
      { id: "c", text: "to" },
      { id: "d", text: "with" },
    ],
    correct: ["c"],
  },
  {
    id: "g6",
    type: "mcq-single",
    prompt:
      "Select the sentence with correct parallel structure.",
    options: [
      {
        id: "a",
        text: "She enjoys reading, hiking, and to paint in her free time.",
      },
      {
        id: "b",
        text: "She enjoys to read, hiking, and painting in her free time.",
      },
      {
        id: "c",
        text: "She enjoys reading, hiking, and painting in her free time.",
      },
      {
        id: "d",
        text: "She enjoys reading, to hike, and painting in her free time.",
      },
    ],
    correct: ["c"],
  },
  {
    id: "g7",
    type: "mcq-single",
    prompt: "Choose the correct relative pronoun: 'The book ___ I borrowed is overdue.'",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "who" },
      { id: "c", text: "whose" },
      { id: "d", text: "whom" },
    ],
    correct: ["a"],
  },
  {
    id: "g8",
    type: "mcq-single",
    prompt:
      "Pick the sentence that uses the past perfect correctly.",
    options: [
      {
        id: "a",
        text: "By the time we arrived, the show had already started.",
      },
      { id: "b", text: "By the time we arrived, the show has already started." },
      { id: "c", text: "By the time we arrived, the show already started." },
      { id: "d", text: "By the time we arrived, the show was already starting." },
    ],
    correct: ["a"],
  },
  {
    id: "g9",
    type: "mcq-single",
    prompt:
      "Choose the word that best completes the sentence: 'The results were quite ___ from what we expected.'",
    options: [
      { id: "a", text: "different" },
      { id: "b", text: "differ" },
      { id: "c", text: "difference" },
      { id: "d", text: "differently" },
    ],
    correct: ["a"],
  },
  {
    id: "g10",
    type: "mcq-single",
    prompt:
      "Identify the sentence with no errors.",
    options: [
      {
        id: "a",
        text: "Neither the manager nor the employees was aware of the change.",
      },
      {
        id: "b",
        text: "Neither the manager nor the employees were aware of the change.",
      },
      {
        id: "c",
        text: "Neither the manager or the employees were aware of the change.",
      },
      {
        id: "d",
        text: "Neither the managers nor the employee were aware of the change.",
      },
    ],
    correct: ["b"],
  },
];

export const vocabularyDrills: Question[] = [
  {
    id: "v1",
    type: "mcq-single",
    prompt:
      "Choose the word closest in meaning to 'meticulous'.",
    options: [
      { id: "a", text: "careless" },
      { id: "b", text: "painstaking" },
      { id: "c", text: "hurried" },
      { id: "d", text: "superficial" },
    ],
    correct: ["b"],
  },
  {
    id: "v2",
    type: "mcq-single",
    prompt:
      "Select the best synonym for 'ubiquitous'.",
    options: [
      { id: "a", text: "rare" },
      { id: "b", text: "everywhere" },
      { id: "c", text: "complicated" },
      { id: "d", text: "ancient" },
    ],
    correct: ["b"],
  },
  {
    id: "v3",
    type: "mcq-single",
    prompt:
      "Which word best completes the sentence? 'The professor's argument was so ___ that even the sceptics were persuaded.'",
    options: [
      { id: "a", text: "cogent" },
      { id: "b", text: "vague" },
      { id: "c", text: "trivial" },
      { id: "d", text: "obscure" },
    ],
    correct: ["a"],
  },
  {
    id: "v4",
    type: "mcq-single",
    prompt: "Choose the antonym of 'candid'.",
    options: [
      { id: "a", text: "frank" },
      { id: "b", text: "honest" },
      { id: "c", text: "evasive" },
      { id: "d", text: "blunt" },
    ],
    correct: ["c"],
  },
  {
    id: "v5",
    type: "mcq-single",
    prompt:
      "'The author's prose is remarkably ___ — every sentence adds weight, yet none feels heavy.'",
    options: [
      { id: "a", text: "verbose" },
      { id: "b", text: "economical" },
      { id: "c", text: "chaotic" },
      { id: "d", text: "hesitant" },
    ],
    correct: ["b"],
  },
  {
    id: "v6",
    type: "mcq-single",
    prompt: "Which word means 'to officially cancel or put an end to'?",
    options: [
      { id: "a", text: "amplify" },
      { id: "b", text: "abrogate" },
      { id: "c", text: "alleviate" },
      { id: "d", text: "allocate" },
    ],
    correct: ["b"],
  },
  {
    id: "v7",
    type: "mcq-single",
    prompt:
      "Pick the best match for 'ephemeral'.",
    options: [
      { id: "a", text: "short-lived" },
      { id: "b", text: "permanent" },
      { id: "c", text: "enormous" },
      { id: "d", text: "mysterious" },
    ],
    correct: ["a"],
  },
  {
    id: "v8",
    type: "mcq-single",
    prompt:
      "Select the most precise word: 'Her disapproval was ___ — a quick raise of an eyebrow, nothing more.'",
    options: [
      { id: "a", text: "subtle" },
      { id: "b", text: "blatant" },
      { id: "c", text: "explicit" },
      { id: "d", text: "violent" },
    ],
    correct: ["a"],
  },
  {
    id: "v9",
    type: "mcq-single",
    prompt: "Choose the word closest in meaning to 'pragmatic'.",
    options: [
      { id: "a", text: "idealistic" },
      { id: "b", text: "dogmatic" },
      { id: "c", text: "practical" },
      { id: "d", text: "sentimental" },
    ],
    correct: ["c"],
  },
  {
    id: "v10",
    type: "mcq-single",
    prompt: "Which option best completes: 'Despite the setback, her resolve remained ___.'",
    options: [
      { id: "a", text: "steadfast" },
      { id: "b", text: "tentative" },
      { id: "c", text: "erratic" },
      { id: "d", text: "diminished" },
    ],
    correct: ["a"],
  },
];

export const readingDrills: Question[] = [
  {
    id: "rd1",
    type: "mcq-single",
    prompt:
      "Passage: 'Although the startup's valuation tripled within two years, its founders remained cautious, noting that half of all unicorns in their cohort had since halved in worth.'\n\nWhich statement best reflects the founders' attitude?",
    options: [
      { id: "a", text: "Confident because their growth will continue." },
      { id: "b", text: "Cautious because peer companies have lost value." },
      { id: "c", text: "Indifferent to how their peers have performed." },
      { id: "d", text: "Angry about market conditions." },
    ],
    correct: ["b"],
  },
  {
    id: "rd2",
    type: "mcq-single",
    prompt:
      "Passage: 'The committee accepted the proposal only in principle; concrete commitments were deferred pending further consultation.'\n\nWhat does this tell us about the committee's decision?",
    options: [
      { id: "a", text: "It fully approved the proposal." },
      {
        id: "b",
        text: "It agreed with the idea but made no firm commitments yet.",
      },
      { id: "c", text: "It rejected the proposal outright." },
      { id: "d", text: "It asked for the proposal to be rewritten." },
    ],
    correct: ["b"],
  },
  {
    id: "rd3",
    type: "mcq-single",
    prompt:
      "Passage: 'While solar panels generate no emissions in use, their manufacture is energy-intensive; recent research suggests the carbon payback period averages two to four years depending on installation region.'\n\nWhat is the author's main point?",
    options: [
      { id: "a", text: "Solar panels are entirely carbon-free." },
      { id: "b", text: "Solar manufacturing is always harmful." },
      {
        id: "c",
        text: "Solar panels offset their manufacturing emissions within a few years.",
      },
      { id: "d", text: "Solar energy is too expensive to adopt." },
    ],
    correct: ["c"],
  },
  {
    id: "rd4",
    type: "mcq-single",
    prompt:
      "Passage: 'She spoke with an unrehearsed directness that some mistook for rudeness but her colleagues recognised as rare candour.'\n\nWhat does the passage suggest about the subject?",
    options: [
      { id: "a", text: "She was rude to most people." },
      { id: "b", text: "She was often misunderstood despite being honest." },
      { id: "c", text: "She carefully rehearsed her speeches." },
      { id: "d", text: "She kept her opinions private." },
    ],
    correct: ["b"],
  },
  {
    id: "rd5",
    type: "mcq-single",
    prompt:
      "Passage: 'Electric ferries have replaced diesel boats across the archipelago, cutting commuter emissions by more than eighty percent; the transition was eased by a municipal subsidy that expires next year.'\n\nWhat might be a concern after the subsidy ends?",
    options: [
      {
        id: "a",
        text: "Operators may struggle to sustain the electric fleet without financial support.",
      },
      { id: "b", text: "Ferries will emit more diesel fumes." },
      { id: "c", text: "The archipelago will lose its status as a commuter zone." },
      { id: "d", text: "Emissions will rise by eighty percent." },
    ],
    correct: ["a"],
  },
  {
    id: "rd6",
    type: "mcq-single",
    prompt:
      "In the sentence 'The findings, though preliminary, corroborate earlier work from the Tokyo lab,' the word 'corroborate' most nearly means:",
    options: [
      { id: "a", text: "contradict" },
      { id: "b", text: "support" },
      { id: "c", text: "replace" },
      { id: "d", text: "criticise" },
    ],
    correct: ["b"],
  },
  {
    id: "rd7",
    type: "mcq-single",
    prompt:
      "Passage: 'The new policy applies retroactively, meaning even contracts signed last year fall under its terms.' What does 'retroactively' imply here?",
    options: [
      { id: "a", text: "The policy only affects future contracts." },
      { id: "b", text: "The policy applies to past agreements as well." },
      { id: "c", text: "The policy was written by lawyers." },
      { id: "d", text: "The policy is temporary." },
    ],
    correct: ["b"],
  },
  {
    id: "rd8",
    type: "mcq-single",
    prompt:
      "Passage: 'What distinguishes the Kuroshio current from other major currents is not its speed but the narrowness of its flow, which concentrates warm water along the Japanese coast.'\n\nThe author emphasises that the Kuroshio is unusual because of its:",
    options: [
      { id: "a", text: "warm temperature" },
      { id: "b", text: "narrow width" },
      { id: "c", text: "exceptional speed" },
      { id: "d", text: "unknown origin" },
    ],
    correct: ["b"],
  },
  {
    id: "rd9",
    type: "mcq-single",
    prompt:
      "Passage: 'Critics argue the reform is well-intentioned but poorly designed, punishing the very people it claims to protect.'\n\nWhat is the critics' core objection?",
    options: [
      { id: "a", text: "The reform has bad intentions." },
      { id: "b", text: "The reform's execution contradicts its stated aim." },
      { id: "c", text: "The reform is too expensive." },
      { id: "d", text: "The reform was written quickly." },
    ],
    correct: ["b"],
  },
  {
    id: "rd10",
    type: "mcq-single",
    prompt:
      "Passage: 'The translator, working under a tight deadline, admitted to trimming two chapters that she considered tangential.'\n\nWhich word best describes 'tangential'?",
    options: [
      { id: "a", text: "essential" },
      { id: "b", text: "unrelated or only loosely related" },
      { id: "c", text: "repeated" },
      { id: "d", text: "offensive" },
    ],
    correct: ["b"],
  },
];

export const listeningDrills: Question[] = [
  {
    id: "l1",
    type: "mcq-single",
    prompt:
      "Transcript: 'The meeting has been moved from Thursday at 2 p.m. to Friday at 10 a.m.' When is the meeting now scheduled?",
    options: [
      { id: "a", text: "Thursday at 2 p.m." },
      { id: "b", text: "Friday at 2 p.m." },
      { id: "c", text: "Friday at 10 a.m." },
      { id: "d", text: "Thursday at 10 a.m." },
    ],
    correct: ["c"],
  },
  {
    id: "l2",
    type: "mcq-single",
    prompt:
      "Transcript: 'Passengers on flight BA347 should proceed to Gate 14, which has been reassigned from Gate 6.'\n\nWhat gate should passengers go to?",
    options: [
      { id: "a", text: "Gate 6" },
      { id: "b", text: "Gate 14" },
      { id: "c", text: "Gate 7" },
      { id: "d", text: "Gate 4" },
    ],
    correct: ["b"],
  },
  {
    id: "l3",
    type: "mcq-single",
    prompt:
      "Transcript: 'Today's lecture will cover three causes of the 1929 crash; we'll leave the policy response for next week.'\n\nWhat will NOT be covered today?",
    options: [
      { id: "a", text: "Causes of the 1929 crash" },
      { id: "b", text: "The policy response" },
      { id: "c", text: "The date of the crash" },
      { id: "d", text: "The lecture title" },
    ],
    correct: ["b"],
  },
  {
    id: "l4",
    type: "mcq-single",
    prompt:
      "Transcript: 'The library will close thirty minutes early on Friday due to staff training.' If the library normally closes at 9 p.m., when will it close on Friday?",
    options: [
      { id: "a", text: "8:00 p.m." },
      { id: "b", text: "8:30 p.m." },
      { id: "c", text: "9:00 p.m." },
      { id: "d", text: "9:30 p.m." },
    ],
    correct: ["b"],
  },
  {
    id: "l5",
    type: "mcq-single",
    prompt:
      "Transcript: 'To enrol, you'll need photo ID and proof of address. We don't require a transcript at this stage.'\n\nWhat is NOT required for enrolment?",
    options: [
      { id: "a", text: "Photo ID" },
      { id: "b", text: "Proof of address" },
      { id: "c", text: "Transcript" },
      { id: "d", text: "None of the above" },
    ],
    correct: ["c"],
  },
  {
    id: "l6",
    type: "mcq-single",
    prompt:
      "Transcript: 'Our research group has three PhD students, two postdocs, and one visiting fellow.'\n\nHow many PhD students are in the group?",
    options: [
      { id: "a", text: "two" },
      { id: "b", text: "three" },
      { id: "c", text: "one" },
      { id: "d", text: "six" },
    ],
    correct: ["b"],
  },
  {
    id: "l7",
    type: "mcq-single",
    prompt:
      "Transcript: 'Students may submit either a research paper or a creative portfolio, but not both.'\n\nWhat can a student submit?",
    options: [
      { id: "a", text: "A research paper AND a creative portfolio" },
      { id: "b", text: "Either a research paper or a creative portfolio" },
      { id: "c", text: "Only a research paper" },
      { id: "d", text: "Only a creative portfolio" },
    ],
    correct: ["b"],
  },
  {
    id: "l8",
    type: "mcq-single",
    prompt:
      "Transcript: 'The tour begins at the south entrance, not the main entrance, and lasts approximately ninety minutes.'\n\nWhere does the tour start?",
    options: [
      { id: "a", text: "Main entrance" },
      { id: "b", text: "South entrance" },
      { id: "c", text: "North entrance" },
      { id: "d", text: "East entrance" },
    ],
    correct: ["b"],
  },
  {
    id: "l9",
    type: "mcq-single",
    prompt:
      "Transcript: 'Assignments submitted after midnight on Sunday will lose ten percent per day, up to a maximum of five days late.'\n\nWhat is the maximum penalty?",
    options: [
      { id: "a", text: "10%" },
      { id: "b", text: "25%" },
      { id: "c", text: "50%" },
      { id: "d", text: "100%" },
    ],
    correct: ["c"],
  },
  {
    id: "l10",
    type: "mcq-single",
    prompt:
      "Transcript: 'The researcher argues that the effect is real but small — statistically significant, practically marginal.'\n\nWhat is the researcher's position?",
    options: [
      { id: "a", text: "The effect is large and important." },
      {
        id: "b",
        text: "The effect is measurable but not practically important.",
      },
      { id: "c", text: "There is no real effect." },
      { id: "d", text: "The effect cannot be measured." },
    ],
    correct: ["b"],
  },
];
