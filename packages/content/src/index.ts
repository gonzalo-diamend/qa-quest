import { missions } from "./missions/qa";

export const allMissions = missions;

export const missionsById = Object.fromEntries(
  allMissions.map(m => [m.id, m])
);

export function getMissionById(id: string) {
  return missionsById[id];
}
