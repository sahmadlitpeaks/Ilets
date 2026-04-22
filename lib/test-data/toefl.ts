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
