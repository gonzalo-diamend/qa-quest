import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { allMissions } from "@qa-quest/content";
import { useProgressStore, getProgressSummary } from "../store/progress";
import { theme } from "../theme";

export default function Home() {
  const router = useRouter();
  const attempts = useProgressStore((state) => state.attempts);
  const summary = getProgressSummary(attempts);

  return (
    <View style={{ flex: 1, padding: theme.spacing.page, gap: theme.spacing.md, backgroundColor: theme.colors.bg }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "900", color: theme.colors.text }}>QA Quest</Text>
          <Text style={{ color: theme.colors.muted }}>Aprendé QA con práctica real.</Text>
        </View>
        <Pressable
          onPress={() => router.push("/progress")}
          style={{
            padding: 10,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            alignItems: "center"
          }}
        >
          <Text style={{ color: theme.colors.primaryText, fontSize: 12, fontWeight: "700" }}>📊 Progreso</Text>
          {summary.completedMissions > 0 && (
            <Text style={{ color: "#a6ffb4", fontSize: 11, fontWeight: "700" }}>
              {summary.completedMissions} misión{summary.completedMissions > 1 ? "es" : ""}
            </Text>
          )}
        </Pressable>
      </View>

      <View style={{ marginTop: theme.spacing.sm, gap: 10 }}>
        {allMissions.map((mission) => {
          const bestScore = summary.bestScoreByMission[mission.id];
          const isCompleted = bestScore !== undefined;
          return (
            <Pressable
              key={mission.id}
              onPress={() => router.push(`/mission/${mission.id}`)}
              style={{
                padding: 14,
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
                gap: 4
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: theme.colors.primaryText, fontWeight: "900", fontSize: 16 }}>{mission.title}</Text>
                {isCompleted && (
                  <Text style={{ color: "#a6ffb4", fontSize: 12, fontWeight: "700" }}>✅ {bestScore}pts</Text>
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
