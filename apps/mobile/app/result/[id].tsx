import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";

export default function Result() {
  const { id, score } = useLocalSearchParams<{ id: string; score: string }>();
  const router = useRouter();
  const mission = getMissionById(String(id));
  const numericScore = Number(score ?? 0);

  const feedback =
    numericScore >= 80
      ? "¡Excelente! Dominaste esta misión."
      : numericScore >= 50
        ? "Buen trabajo. Podés mejorar repasando la lección."
        : "Te conviene repasar y volver a intentarlo.";

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Resultado</Text>
      <Text style={{ opacity: 0.8 }}>{mission?.title ?? "Misión"}</Text>
      <Text style={{ opacity: 0.8 }}>Score: {numericScore}</Text>
      <Text style={{ fontWeight: "700" }}>{feedback}</Text>

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
