export type Difficulty = "easy" | "medium" | "hard";

export type LessonBlock =
  | { type: "text"; text: string }
  | { type: "tip"; text: string };

export type Mission = {
  id: string;
  version: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  xp: number;
  lessonBlocks: LessonBlock[];
  activity: Activity;
};

export type Activity =
  | { type: "none" }
  | {
      type: "quiz";
      instruction: string;
      questions: {
        id: string;
        prompt: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }[];
    };
