import { Alert, Pressable, Text, View } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { getProgressSummary, useProgressStore } from "../store/progress";
import { theme } from "../theme";

export default function ProgressScreen() {
  const attempts = useProgressStore((state) => state.attempts);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  const summary = getProgressSummary(attempts);

  return (
    <View style={{ flex: 1, padding: theme.spacing.page, gap: theme.spacing.md, backgroundColor: theme.colors.bg }}>
      <Text style={{ fontSize: 24, fontWeight: "900", color: theme.colors.text }}>Tu progreso</Text>
      <Text style={{ color: theme.colors.muted }}>Intentos totales: {summary.totalAttempts}</Text>
      <Text style={{ color: theme.colors.muted }}>Promedio global: {summary.averageScore}</Text>
      <Text style={{ color: theme.colors.muted }}>Misiones completadas: {summary.completedMissions}</Text>

      <View style={{ marginTop: theme.spacing.sm, gap: theme.spacing.sm }}>
        {Object.entries(summary.bestScoreByMission).length === 0 ? (
          <Text style={{ color: theme.colors.muted }}>Todavía no completaste ninguna misión.</Text>
        ) : (
          Object.entries(summary.bestScoreByMission).map(([missionId, bestScore]) => {
            const mission = getMissionById(missionId);
            return (
              <View
                key={missionId}
                style={{
                  padding: 12,
                  borderRadius: theme.radius.md,
                  backgroundColor: theme.colors.surface,
                  gap: 4
                }}
              >
                <Text style={{ fontWeight: "900", color: theme.colors.text }}>{mission?.title ?? missionId}</Text>
                <Text style={{ color: theme.colors.muted }}>Mejor score: {bestScore}</Text>
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
        style={{ padding: 12, backgroundColor: theme.colors.dangerBg, borderRadius: theme.radius.md }}
      >
        <Text style={{ color: theme.colors.primaryText, fontWeight: "900", textAlign: "center" }}>Borrar progreso</Text>
      </Pressable>
    </View>
  );
}
