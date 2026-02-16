export function scoreQuiz(activity: any, answer: any) {
  const correct = activity.questions.filter(
    (q: any) => answer.answersByQuestionId[q.id] === q.correctIndex
  ).length;

  const total = activity.questions.length;
  return {
    score: Math.round((correct / total) * 100)
  };
}
