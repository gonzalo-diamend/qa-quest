import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MissionAttempt = {
  missionId: string;
  score: number;
  completedAt: string;
};

type ProgressState = {
  attempts: MissionAttempt[];
  addAttempt: (attempt: MissionAttempt) => void;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      addAttempt: (attempt) =>
        set((state) => ({
          attempts: [attempt, ...state.attempts]
        })),
      resetProgress: () => set({ attempts: [] })
    }),
    {
      name: "qa-quest-progress",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export function getProgressSummary(attempts: MissionAttempt[]) {
  const totalAttempts = attempts.length;
  const totalScore = attempts.reduce((acc, attempt) => acc + attempt.score, 0);
  const averageScore = totalAttempts === 0 ? 0 : Math.round(totalScore / totalAttempts);

  const bestScoreByMission = Object.fromEntries(
    attempts.reduce<Map<string, number>>((acc, attempt) => {
      const previousBest = acc.get(attempt.missionId) ?? 0;
      if (attempt.score > previousBest) {
        acc.set(attempt.missionId, attempt.score);
      }
      return acc;
    }, new Map())
  );

  return {
    totalAttempts,
    averageScore,
    completedMissions: Object.keys(bestScoreByMission).length,
    bestScoreByMission
  };
}
