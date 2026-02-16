import type { Activity } from "./types";

type QuizAnswerMap = Record<string, number>;

export function scoreQuiz(
  activity: Extract<Activity, { type: "quiz" }>,
  answer: { answersByQuestionId: QuizAnswerMap }
) {
  const total = activity.questions.length;

  if (total === 0) {
    return { score: 0 };
  }

  const correct = activity.questions.filter(
    (question) => answer.answersByQuestionId[question.id] === question.correctIndex
  ).length;

  return {
    score: Math.round((correct / total) * 100)
  };
}
