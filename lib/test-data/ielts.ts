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

export const ieltsListeningSection1: TestContent = {
  overview:
    "IELTS Listening — Section 1. A conversation between two speakers, usually about everyday transactions (accommodation, enrolment, bookings).",
  sections: [
    {
      id: "ielts-listening-s1",
      title: "Listening — Section 1: Library Registration",
      section: "listening",
      durationMinutes: 15,
      passage: `AUDIO SCRIPT (listen or read, then answer):

LIBRARIAN: Good morning, City Central Library. How can I help?
STUDENT: Hi, I'd like to register for a membership card, please.
LIBRARIAN: Of course. Can I take your full name?
STUDENT: Yes, it's Priya Nair — that's N-A-I-R.
LIBRARIAN: Thanks. And your address?
STUDENT: 47 Beckwith Road, Flat 3B. That's B-E-C-K-W-I-T-H.
LIBRARIAN: Postcode?
STUDENT: SE15 2QJ.
LIBRARIAN: Phone number?
STUDENT: 07700 900-412.
LIBRARIAN: And your date of birth?
STUDENT: The 23rd of March, 1998.
LIBRARIAN: Wonderful. There's a small one-off fee of £7.50 for the card itself. The membership is free after that.
STUDENT: Right. Can I also borrow audiobooks?
LIBRARIAN: Yes — standard members can take out up to four items at a time: books, audiobooks, or DVDs. The lending period is three weeks, but audiobooks are only two weeks.
STUDENT: And can I use the study rooms?
LIBRARIAN: You can book one online up to seven days in advance. There's a three-hour limit per booking.
STUDENT: Perfect. One more question — do you run any events this month?
LIBRARIAN: We have a poetry reading next Tuesday at 6 p.m., and a children's storytelling hour every Saturday morning at 10.
STUDENT: Thanks, that's helpful.`,
      questions: [
        {
          id: "il1-1",
          type: "fill-blank",
          prompt: "Complete the registration form with information from the conversation.",
          passage:
            "Full name: Priya [[1]]\nAddress: [[2]] Beckwith Road, Flat 3B\nPostcode: [[3]]\nDate of birth: 23 [[4]] 1998\nMembership card fee: £[[5]]",
          blanks: [
            { id: "1", accepted: ["Nair", "nair"] },
            { id: "2", accepted: ["47"] },
            { id: "3", accepted: ["SE15 2QJ", "se15 2qj", "SE152QJ"] },
            { id: "4", accepted: ["March", "march"] },
            { id: "5", accepted: ["7.50", "7.5"] },
          ],
        },
        {
          id: "il1-2",
          type: "mcq-single",
          prompt: "What is the maximum number of items a standard member can borrow at once?",
          options: [
            { id: "a", text: "Two" },
            { id: "b", text: "Three" },
            { id: "c", text: "Four" },
            { id: "d", text: "Six" },
          ],
          correct: ["c"],
        },
        {
          id: "il1-3",
          type: "mcq-single",
          prompt: "How long is the lending period for audiobooks?",
          options: [
            { id: "a", text: "One week" },
            { id: "b", text: "Two weeks" },
            { id: "c", text: "Three weeks" },
            { id: "d", text: "Four weeks" },
          ],
          correct: ["b"],
        },
        {
          id: "il1-4",
          type: "mcq-single",
          prompt: "How far in advance can study rooms be booked online?",
          options: [
            { id: "a", text: "Three days" },
            { id: "b", text: "Five days" },
            { id: "c", text: "Seven days" },
            { id: "d", text: "Fourteen days" },
          ],
          correct: ["c"],
        },
        {
          id: "il1-5",
          type: "true-false-ng",
          prompt: "Decide whether each statement matches the conversation.",
          statements: [
            {
              id: "s1",
              text: "The poetry reading takes place on a Tuesday.",
              correct: "true",
            },
            {
              id: "s2",
              text: "Children's storytelling runs on weekday mornings.",
              correct: "false",
            },
            {
              id: "s3",
              text: "The library charges a monthly membership fee.",
              correct: "false",
            },
            {
              id: "s4",
              text: "Audiobook downloads can be accessed from home.",
              correct: "not-given",
            },
          ],
        },
      ],
    },
  ],
};

export const ieltsWritingTask2: TestContent = {
  overview:
    "IELTS Writing Task 2 — a focused 40-minute practice on a single opinion-style essay. 250 words minimum.",
  sections: [
    {
      id: "ielts-writing-task2-focus",
      title: "Writing Task 2 — Focused Practice",
      section: "writing",
      durationMinutes: 40,
      questions: [
        {
          id: "w-t2-focus",
          type: "essay",
          task: "task2",
          prompt:
            "In many countries, the gap between the highest and lowest earners is widening. To what extent is this a problem, and what could governments or employers do to narrow the gap?",
          instructions:
            "Write at least 250 words. Give reasons and relevant examples.",
          minWords: 250,
        },
      ],
    },
  ],
};

export const ieltsReadingExtended: TestContent = {
  overview:
    "IELTS Academic Reading — a longer set on a scientific topic, covering headings-matching and detail questions.",
  sections: [
    {
      id: "ielts-reading-ext",
      title: "Reading — The rediscovery of the olm",
      section: "reading",
      durationMinutes: 25,
      passage: `For more than a century the olm (Proteus anguinus), a blind, salamander-like amphibian inhabiting the limestone caves of the Dinaric Alps, was dismissed as a biological curiosity — an organism so rarely seen that no one could describe its life cycle with confidence. Local folklore, meanwhile, insisted on a more dramatic identity: the "baby dragon" said to wash out of cave mouths after heavy rain.

Systematic study began in earnest only in the 1950s, when Slovenian biologists installed small flow-through tanks fed by spring water inside the Postojna Cave network. Individuals caught in the 1960s are, in several cases, still alive today. Laboratory records suggest that the olm can live for more than a hundred years — a lifespan rivalled by almost no other amphibian — yet can survive a full decade without food.

The key to this endurance appears to be a metabolism tuned so low it borders on the undetectable. An olm at rest breathes perhaps once every twenty minutes; its heart beats as slowly as twice a minute. The animal's capacity for stillness is equally remarkable: a female tagged in 2010 did not change position for more than seven years.

Reproduction, when it happens, is deliberate. Females lay clutches of up to sixty eggs, which they guard in crevices for six months before hatching. Although captive populations at Postojna now include second-generation individuals, attempts to transplant the olm to other cave systems have generally failed. The amphibian's vulnerability to temperature change and chemical contamination has made it one of Europe's most carefully protected species.

Perhaps the most intriguing aspect of the olm is its sensory world. Although blind, it detects prey through chemoreceptors on its skin and a lateral-line system that registers minute vibrations in the water. Recent electrophysiological work also indicates sensitivity to weak electric fields, placing the olm among a small group of vertebrates with verified electroreception outside sharks and certain fish.

For Slovenia, the olm has become an emblem of cave biodiversity — a living argument for conservation in a country whose economy depends heavily on spring-water industries. Laws passed in 2019 require any construction within two kilometres of a known olm habitat to undergo independent hydrogeological review before permits are issued.`,
      questions: [
        {
          id: "r-ext-1",
          type: "mcq-single",
          prompt: "According to the passage, when did systematic laboratory study of the olm begin?",
          options: [
            { id: "a", text: "In the 19th century" },
            { id: "b", text: "In the 1950s" },
            { id: "c", text: "In 2010" },
            { id: "d", text: "In 2019" },
          ],
          correct: ["b"],
        },
        {
          id: "r-ext-2",
          type: "mcq-single",
          prompt: "What does the passage identify as the key reason for the olm's long life?",
          options: [
            { id: "a", text: "Its electric sensitivity" },
            { id: "b", text: "Its extremely slow metabolism" },
            { id: "c", text: "Its large clutches of eggs" },
            { id: "d", text: "Its ability to see in low light" },
          ],
          correct: ["b"],
        },
        {
          id: "r-ext-3",
          type: "true-false-ng",
          prompt: "Statements — true, false, or not given.",
          statements: [
            {
              id: "s1",
              text: "The olm can survive without food for as long as ten years.",
              correct: "true",
            },
            {
              id: "s2",
              text: "All attempts to move olms to new cave systems have been successful.",
              correct: "false",
            },
            {
              id: "s3",
              text: "The olm is found naturally in North America.",
              correct: "false",
            },
            {
              id: "s4",
              text: "Most olms in captivity are over 200 years old.",
              correct: "not-given",
            },
          ],
        },
        {
          id: "r-ext-4",
          type: "mcq-multi",
          prompt:
            "Which TWO sensory mechanisms does the passage explicitly credit the olm with?",
          options: [
            { id: "a", text: "Skin-based chemoreception" },
            { id: "b", text: "Low-light colour vision" },
            { id: "c", text: "A lateral-line vibration system" },
            { id: "d", text: "Infrared heat sensing" },
          ],
          correct: ["a", "c"],
        },
        {
          id: "r-ext-5",
          type: "fill-blank",
          prompt: "Complete the summary with ONE word per blank.",
          passage:
            "Slovenian law now requires construction within [[1]] kilometres of an olm habitat to undergo hydrogeological [[2]]. Female olms guard clutches of up to [[3]] eggs for six months before they hatch.",
          blanks: [
            { id: "1", accepted: ["two", "2"] },
            { id: "2", accepted: ["review"] },
            { id: "3", accepted: ["sixty", "60"] },
          ],
        },
      ],
    },
  ],
};
