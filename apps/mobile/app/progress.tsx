import { Alert, Pressable, Text, View } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { getProgressSummary, useProgressStore } from "../store/progress";

export default function ProgressScreen() {
  const attempts = useProgressStore((state) => state.attempts);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  const summary = getProgressSummary(attempts);

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "900" }}>Tu progreso</Text>
      <Text style={{ opacity: 0.8 }}>Intentos totales: {summary.totalAttempts}</Text>
      <Text style={{ opacity: 0.8 }}>Promedio global: {summary.averageScore}</Text>
      <Text style={{ opacity: 0.8 }}>Misiones completadas: {summary.completedMissions}</Text>

      <View style={{ marginTop: 8, gap: 8 }}>
        {Object.entries(summary.bestScoreByMission).length === 0 ? (
          <Text style={{ opacity: 0.7 }}>Todavía no completaste ninguna misión.</Text>
        ) : (
          Object.entries(summary.bestScoreByMission).map(([missionId, bestScore]) => {
            const mission = getMissionById(missionId);
            return (
              <View
                key={missionId}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "#f4f4f5",
                  gap: 4
                }}
              >
                <Text style={{ fontWeight: "900" }}>{mission?.title ?? missionId}</Text>
                <Text style={{ opacity: 0.8 }}>Mejor score: {bestScore}</Text>
              </View>
            );
          })
        )}
      </View>

      <Pressable
        onPress={() => {
          Alert.alert("Resetear progreso", "¿Seguro que querés borrar tu progreso local?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Borrar", style: "destructive", onPress: resetProgress }
          ]);
        }}
        style={{ padding: 12, backgroundColor: "#7f1d1d", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Borrar progreso</Text>
      </Pressable>
    </View>
  );
}
