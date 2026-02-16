import type { Mission } from "@qa-quest/shared";

export const missions: Mission[] = [
  {
    id: "qa-001",
    version: 1,
    title: "What is a Bug?",
    description: "Understand the concept.",
    difficulty: "easy",
    xp: 20,
    lessonBlocks: [
      { type: "text", text: "A bug is a deviation from expected behavior." }
    ],
    activity: {
      type: "quiz",
      instruction: "Select correct answer",
      questions: [
        {
          id: "q1",
          prompt: "What is a bug?",
          options: [
            "Something I don't like",
            "Deviation from expected behavior"
          ],
          correctIndex: 1,
          explanation: "Correct."
        }
      ]
    }
  }
];
