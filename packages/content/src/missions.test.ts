import test from "node:test";
import assert from "node:assert/strict";
import { missions as allMissions } from "./missions/qa.ts";

test("missions have unique IDs", () => {
  const ids = allMissions.map((mission) => mission.id);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length);
});

test("quiz missions define valid question indexes", () => {
  allMissions.forEach((mission) => {
    if (mission.activity.type !== "quiz") {
      return;
    }

    mission.activity.questions.forEach((question) => {
      assert.ok(question.options.length > 1, `${mission.id}/${question.id} should have >1 option`);
      assert.ok(
        question.correctIndex >= 0 && question.correctIndex < question.options.length,
        `${mission.id}/${question.id} has invalid correctIndex`
      );
    });
  });
});
