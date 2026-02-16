import test from "node:test";
import assert from "node:assert/strict";
import { scoreQuiz } from "./scoring.ts";

test("scoreQuiz returns 100 when all answers are correct", () => {
  const activity = {
    type: "quiz" as const,
    instruction: "Select",
    questions: [
      {
        id: "q1",
        prompt: "Q1",
        options: ["A", "B"],
        correctIndex: 0,
        explanation: "ok"
      },
      {
        id: "q2",
        prompt: "Q2",
        options: ["A", "B"],
        correctIndex: 1,
        explanation: "ok"
      }
    ]
  };

  const result = scoreQuiz(activity, {
    answersByQuestionId: {
      q1: 0,
      q2: 1
    }
  });

  assert.equal(result.score, 100);
});

test("scoreQuiz rounds percentage and handles partial answers", () => {
  const activity = {
    type: "quiz" as const,
    instruction: "Select",
    questions: [
      {
        id: "q1",
        prompt: "Q1",
        options: ["A", "B"],
        correctIndex: 0,
        explanation: "ok"
      },
      {
        id: "q2",
        prompt: "Q2",
        options: ["A", "B"],
        correctIndex: 1,
        explanation: "ok"
      },
      {
        id: "q3",
        prompt: "Q3",
        options: ["A", "B"],
        correctIndex: 0,
        explanation: "ok"
      }
    ]
  };

  const result = scoreQuiz(activity, {
    answersByQuestionId: {
      q1: 0,
      q2: 0
    }
  });

  assert.equal(result.score, 33);
});

test("scoreQuiz returns zero for empty quizzes", () => {
  const activity = {
    type: "quiz" as const,
    instruction: "Select",
    questions: []
  };

  const result = scoreQuiz(activity, {
    answersByQuestionId: {}
  });

  assert.equal(result.score, 0);
});
