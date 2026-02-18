import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { allMissions } from "@qa-quest/content";
import { useProgressStore, getProgressSummary } from "../store/progress";

export default function Home() {
  const router = useRouter();
  const attempts = useProgressStore((state) => state.attempts);
  const summary = getProgressSummary(attempts);

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "900" }}>QA Quest</Text>
          <Text style={{ opacity: 0.7 }}>Aprendé QA con práctica real.</Text>
        </View>
        <Pressable
          onPress={() => router.push("/progress")}
          style={{
            padding: 10,
            backgroundColor: "#111",
            borderRadius: 10,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>📊 Progreso</Text>
          {summary.completedMissions > 0 && (
            <Text style={{ color: "#a6ffb4", fontSize: 11, fontWeight: "700" }}>
              {summary.completedMissions} misión{summary.completedMissions > 1 ? "es" : ""}
            </Text>
          )}
        </Pressable>
      </View>

      <View style={{ marginTop: 8, gap: 10 }}>
        {allMissions.map((mission) => {
          const bestScore = summary.bestScoreByMission[mission.id];
          const isCompleted = bestScore !== undefined;
          return (
            <Pressable
              key={mission.id}
              onPress={() => router.push(`/mission/${mission.id}`)}
              style={{
                padding: 14,
                backgroundColor: "#111",
                borderRadius: 12,
                gap: 4
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
                  {mission.title}
                </Text>
                {isCompleted && (
                  <Text style={{ color: "#a6ffb4", fontSize: 12, fontWeight: "700" }}>
                    ✅ {bestScore}pts
                  </Text>
                )}
              </View>
              <Text style={{ color: "#ddd" }}>{mission.description}</Text>
              <Text style={{ color: "#a6a6a6", fontSize: 12 }}>
                {mission.difficulty.toUpperCase()} · {mission.xp} XP
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
