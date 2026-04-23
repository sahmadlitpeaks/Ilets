import type { TestContent } from "@/types";

export const toeflWritingMock: TestContent = {
  overview:
    "TOEFL iBT Writing — one integrated task (reading + lecture → summary) and one 'Writing for an Academic Discussion' task (~10 minutes, 100 words minimum).",
  sections: [
    {
      id: "toefl-writing-1",
      title: "Writing — Academic Discussion",
      section: "writing",
      durationMinutes: 10,
      questions: [
        {
          id: "t-w1",
          type: "essay",
          task: "independent",
          prompt:
            "Your professor is teaching a class on urban planning. Write a post responding to the professor's question. In your post, state your opinion and support it with reasons and examples. An effective response will contain at least 100 words.\n\nProfessor: Cities around the world are introducing 'car-free' zones in their downtown areas. Do you think prohibiting private cars from city centres is a good way to improve urban life? Why or why not?\n\nStudent A: I support car-free zones because they reduce noise, lower air pollution, and give pedestrians and cyclists safer streets.\n\nStudent B: I disagree — banning cars makes life harder for older residents, people with disabilities, and small businesses that rely on deliveries.",
          minWords: 100,
        },
      ],
    },
  ],
};

export const toeflListeningMock: TestContent = {
  overview:
    "TOEFL Listening — one academic lecture (3-5 minutes) with 5 comprehension questions.",
  sections: [
    {
      id: "toefl-listening-1",
      title: "Listening — Archaeology Lecture",
      section: "listening",
      durationMinutes: 15,
      passage: `LECTURE TRANSCRIPT (listen, or read as if listening, then answer):

PROFESSOR: Okay, let's pick up where we left off on dendrochronology — tree-ring dating. Last time we covered the basics of how each tree lays down one ring per year. Today I want to focus on why this technique became so important specifically for American Southwest archaeology.

So, the ancestral Puebloan peoples — what used to be called the Anasazi — left behind thousands of wooden beams in cliff dwellings across what's now Arizona, New Mexico, Colorado, and Utah. When archaeologists in the 1890s first tried to date these sites, they basically guessed. Some of the estimates were off by five hundred years.

The breakthrough came from an astronomer named A.E. Douglass. Douglass was actually looking for a way to track sunspot cycles using trees — the theory being that sunspot activity affects climate, climate affects tree growth, therefore tree rings should record sunspot history. That didn't really pan out for the sunspot research. But along the way, Douglass developed a chronology of ring patterns going back almost two thousand years. And that's what let him — in 1929 — give the first absolute date for a Puebloan village: a site called Showlow, dated to A.D. 1237.

Now here's where it gets interesting. Once you have a master chronology, you can date any timber from the region, because the ring patterns are like a fingerprint of climate history. A dry year produces a thin ring everywhere in the region; a wet year produces a thick ring. So you match the pattern from your sample to the master chronology and read off the date.

The limits? Well, first, it only works in regions where trees have annual rings — tropical hardwoods often don't. Second, you need a sample with enough rings to produce a unique pattern; typically you want at least fifty. And third, it's only as good as the master chronology. For the Southwest we have one going back to about 322 B.C. For other regions, the chronologies are shorter and the technique is correspondingly less useful.

One more thing — dendrochronology has had a surprising second life in climate science. Those same ring patterns that tell us when a timber was cut are also a record of rainfall. So when we talk about the 'megadrought' that may have contributed to the abandonment of Mesa Verde around A.D. 1300, a lot of that evidence comes directly from the same trees Douglass was working with a century ago.`,
      questions: [
        {
          id: "tl1-1",
          type: "mcq-single",
          prompt: "What is the main purpose of the lecture?",
          options: [
            {
              id: "a",
              text: "To argue that sunspot activity controls tree growth",
            },
            {
              id: "b",
              text: "To explain how tree-ring dating transformed Southwest archaeology",
            },
            {
              id: "c",
              text: "To describe the lifestyle of ancestral Puebloan peoples",
            },
            { id: "d", text: "To compare archaeology in different regions" },
          ],
          correct: ["b"],
        },
        {
          id: "tl1-2",
          type: "mcq-single",
          prompt: "Why did Douglass originally become interested in tree rings?",
          options: [
            { id: "a", text: "To date archaeological sites" },
            { id: "b", text: "To track sunspot cycles" },
            { id: "c", text: "To study the lifespan of pines" },
            { id: "d", text: "To map climate zones" },
          ],
          correct: ["b"],
        },
        {
          id: "tl1-3",
          type: "mcq-single",
          prompt: "According to the professor, what was the first absolute date produced by dendrochronology?",
          options: [
            { id: "a", text: "A.D. 1237 for Showlow" },
            { id: "b", text: "A.D. 1300 for Mesa Verde" },
            { id: "c", text: "322 B.C. for an unnamed site" },
            { id: "d", text: "A.D. 1929 for Puebloan ruins generally" },
          ],
          correct: ["a"],
        },
        {
          id: "tl1-4",
          type: "mcq-multi",
          prompt:
            "Which TWO limitations of dendrochronology does the professor mention?",
          options: [
            {
              id: "a",
              text: "It fails for trees without clear annual rings",
            },
            {
              id: "b",
              text: "Samples need at least fifty rings to match reliably",
            },
            {
              id: "c",
              text: "It cannot be used for non-archaeological purposes",
            },
            {
              id: "d",
              text: "It is less accurate than radiocarbon dating in all cases",
            },
          ],
          correct: ["a", "b"],
        },
        {
          id: "tl1-5",
          type: "mcq-single",
          prompt:
            "The professor mentions the 'megadrought' to illustrate which point?",
          options: [
            {
              id: "a",
              text: "That Puebloan peoples were unaware of climate change",
            },
            {
              id: "b",
              text: "That tree-ring data now contributes to climate research",
            },
            {
              id: "c",
              text: "That Mesa Verde was uninhabited after A.D. 1300",
            },
            { id: "d", text: "That sunspot cycles caused Puebloan decline" },
          ],
          correct: ["b"],
        },
      ],
    },
  ],
};

export const toeflIntegratedWriting: TestContent = {
  overview:
    "TOEFL iBT Integrated Writing — read a short passage, listen to a lecture that challenges it, then summarise how the lecture responds to the reading (150-225 words, 20 minutes).",
  sections: [
    {
      id: "toefl-integrated-writing",
      title: "Integrated Writing — Reading + Lecture Summary",
      section: "writing",
      durationMinutes: 20,
      passage: `READING PASSAGE (3 minutes):

The proposed four-day work week — four 10-hour days with no reduction in pay — has been promoted in several European countries as a solution to worker burnout. Supporters argue that it boosts morale, retains talent, and reduces the carbon cost of daily commuting. Some small-scale trials in Iceland and Belgium have reported higher self-reported happiness among participants and no measurable drop in output.

LECTURE TRANSCRIPT (listen, then respond):

PROFESSOR: The four-day work week sounds appealing, but the evidence is thinner than those headlines suggest. Take the Icelandic trial. Yes, it was celebrated as a 'success,' but the actual hours worked only dropped by four per week on average, not the full day the media implied. Many participants were already on reduced schedules.

Second, the Belgian experience is different from what advocates claim. Belgium gave employees the option of compressing their week into four days, but crucially without cutting hours. Working 10-hour days is associated with more fatigue-related errors, not fewer — particularly in safety-critical jobs like healthcare and transport.

And finally, the claim about commuting is overstated. In hybrid workplaces, most employees already commute only two or three days a week. A four-day week reduces that to, at most, three. The environmental benefit, compared to existing hybrid schedules, is marginal.

So while I'd agree the four-day week is worth studying, the evidence so far is a lot more qualified than advocates suggest.`,
      questions: [
        {
          id: "ti-w1",
          type: "essay",
          task: "integrated",
          prompt:
            "Summarise the main points made in the lecture and explain how they cast doubt on specific claims in the reading passage.",
          instructions:
            "Write 150-225 words in 20 minutes. Do not express your own opinion — only report how the lecture responds to the reading.",
          minWords: 150,
          maxWords: 280,
        },
      ],
    },
  ],
};

export const toeflSpeakingIndependent: TestContent = {
  overview:
    "TOEFL Independent Speaking — 15 seconds to prepare, 45 seconds to respond to a single familiar-topic question.",
  sections: [
    {
      id: "toefl-speaking-independent",
      title: "Independent Speaking — Task 1",
      section: "speaking",
      durationMinutes: 3,
      questions: [
        {
          id: "tsp-1",
          type: "speaking",
          prompt:
            "Some students prefer to study in silence. Others prefer to study in a busy environment like a café. Which do you prefer and why?",
          instructions:
            "You have 15 seconds to prepare and 45 seconds to respond.",
          prepSeconds: 15,
          responseSeconds: 45,
        },
      ],
    },
  ],
};

export const toeflReadingMock: TestContent = {
  overview:
    "TOEFL Reading — a short 3-question set on an original passage.",
  sections: [
    {
      id: "toefl-reading-1",
      title: "Reading — The Invention of the Thermos",
      section: "reading",
      durationMinutes: 12,
      passage: `In 1892, the Scottish physicist James Dewar designed a double-walled glass flask to keep liquefied gases cold in the laboratory. By evacuating the space between the two walls, Dewar dramatically reduced heat transfer by conduction and convection. A thin silver coating on the inner surfaces reflected radiant heat back into the flask. Dewar never patented the device; he believed that basic research tools should remain freely available to other scientists.

Two German glassblowers, Reinhold Burger and Albert Aschenbrenner, recognised the domestic potential of Dewar's design. In 1904 they patented a shatter-resistant version inside a protective metal casing and founded the Thermos GmbH brand. Within a decade, explorers, pilots, and factory workers were carrying 'thermos flasks' almost everywhere. Ernest Shackleton took them to the Antarctic; Zeppelin crews relied on them for hot drinks at altitude.

Yet the word 'thermos' itself became a legal casualty of its own popularity. In 1963, a United States court ruled that the term had entered common usage and could no longer function as a protected trademark in America. The judgement is a classic example of 'genericide' — the fate of brand names so successful that they lose the distinctiveness that made them valuable in the first place.`,
      questions: [
        {
          id: "tr1",
          type: "mcq-single",
          prompt: "Why did James Dewar NOT patent his invention?",
          options: [
            {
              id: "a",
              text: "He did not believe it would have commercial value.",
            },
            {
              id: "b",
              text: "He thought scientific tools should be freely shared.",
            },
            {
              id: "c",
              text: "He could not afford the patent application fees.",
            },
            {
              id: "d",
              text: "He sold the rights to Burger and Aschenbrenner.",
            },
          ],
          correct: ["b"],
        },
        {
          id: "tr2",
          type: "mcq-single",
          prompt: "The word 'genericide' in the last paragraph refers to:",
          options: [
            {
              id: "a",
              text: "A brand name becoming too common to be trademarked.",
            },
            { id: "b", text: "The physical destruction of a product." },
            { id: "c", text: "The merger of two competing companies." },
            { id: "d", text: "A legal strategy to avoid taxes." },
          ],
          correct: ["a"],
        },
        {
          id: "tr3",
          type: "mcq-multi",
          prompt:
            "Which TWO design features reduced heat transfer in Dewar's flask?",
          options: [
            { id: "a", text: "A vacuum between two glass walls" },
            { id: "b", text: "A protective metal casing" },
            { id: "c", text: "A reflective silver coating" },
            { id: "d", text: "A rubber seal around the stopper" },
          ],
          correct: ["a", "c"],
        },
      ],
    },
  ],
};
