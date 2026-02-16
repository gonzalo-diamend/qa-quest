import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { useProgressStore } from "../../store/progress";

export default function Result() {
  const { id, score } = useLocalSearchParams<{ id: string; score: string }>();
  const router = useRouter();
  const missionId = String(id ?? "");
  const mission = getMissionById(missionId);
  const rawScore = Number(score ?? 0);
  const numericScore = Number.isFinite(rawScore) ? Math.max(0, Math.min(100, rawScore)) : 0;
  const addAttempt = useProgressStore((state) => state.addAttempt);

  useEffect(() => {
    if (!mission) {
      return;
    }

    addAttempt({
      missionId: mission.id,
      score: numericScore,
      completedAt: new Date().toISOString()
    });
  }, [addAttempt, mission, numericScore]);

  const feedback =
    numericScore >= 80
      ? "¡Excelente! Dominaste esta misión."
      : numericScore >= 50
        ? "Buen trabajo. Podés mejorar repasando la lección."
        : "Te conviene repasar y volver a intentarlo.";

  const xpEarned = mission
    ? numericScore >= 80
      ? mission.xp
      : numericScore >= 50
        ? Math.round(mission.xp / 2)
        : 0
    : 0;

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Resultado</Text>
      <Text style={{ opacity: 0.8 }}>{mission?.title ?? "Misión"}</Text>
      <Text style={{ opacity: 0.8 }}>Score: {numericScore}</Text>
      {mission ? <Text style={{ opacity: 0.8 }}>XP ganada: {xpEarned}</Text> : null}
      <Text style={{ fontWeight: "700" }}>{feedback}</Text>

      <Pressable
        onPress={() => router.replace("/progress")}
        style={{ padding: 12, backgroundColor: "#0f172a", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Ver progreso</Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/")}
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Volver al inicio</Text>
      </Pressable>
      {mission ? (
        <Pressable
          onPress={() => router.replace(`/mission/${mission.id}`)}
          style={{ padding: 12, backgroundColor: "#333", borderRadius: 12 }}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>Reintentar misión</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
