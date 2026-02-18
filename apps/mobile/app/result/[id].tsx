import { useEffect, useMemo, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { useProgressStore } from "../../store/progress";
import { theme } from "../../theme";

export default function Result() {
  const { id, score } = useLocalSearchParams<{ id: string; score: string }>();
  const router = useRouter();
  const missionId = String(id ?? "");
  const mission = getMissionById(missionId);
  const hasRegisteredAttemptRef = useRef(false);
  const numericScore = useMemo(() => {
    const parsed = Number(score ?? 0);
    if (!Number.isFinite(parsed)) {
      return 0;
    }
    return Math.max(0, Math.min(100, Math.round(parsed)));
  }, [score]);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  useEffect(() => {
    if (!mission || hasRegisteredAttemptRef.current) {
      return;
    }

    addAttempt({
      missionId: mission.id,
      score: numericScore,
      completedAt: new Date().toISOString()
    });
    hasRegisteredAttemptRef.current = true;
  }, [addAttempt, mission, numericScore]);

  const feedback =
    numericScore >= 80
      ? "¡Excelente! Dominaste esta misión."
      : numericScore >= 50
        ? "Buen trabajo. Podés mejorar repasando la lección."
        : "Te conviene repasar y volver a intentarlo.";

  return (
    <View style={{ flex: 1, padding: theme.spacing.page, gap: theme.spacing.md, backgroundColor: theme.colors.bg }}>
      <Text style={{ fontSize: 22, fontWeight: "900", color: theme.colors.text }}>Resultado</Text>
      <Text style={{ color: theme.colors.muted }}>{mission?.title ?? "Misión"}</Text>
      <Text style={{ fontSize: 32, fontWeight: "900", textAlign: "center", marginVertical: 8, color: theme.colors.text }}>
        {numericScore} pts
      </Text>
      <Text style={{ fontWeight: "700", textAlign: "center", color: theme.colors.text }}>{feedback}</Text>

      <Pressable
        onPress={() => router.replace("/")}
        style={{ padding: 12, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md }}
      >
        <Text style={{ color: theme.colors.primaryText, fontWeight: "900", textAlign: "center" }}>Volver al inicio</Text>
      </Pressable>
      {mission ? (
        <Pressable
          onPress={() => router.replace(`/mission/${mission.id}`)}
          style={{ padding: 12, backgroundColor: "#334155", borderRadius: theme.radius.md }}
        >
          <Text style={{ color: theme.colors.primaryText, fontWeight: "900", textAlign: "center" }}>Reintentar misión</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
