import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

const MISSIONS: Record<string, { id: string; title: string; description: string }> = {
  "qa-001": {
    id: "qa-001",
    title: "What is a Bug?",
    description: "Un bug es una desviación del comportamiento esperado."
  }
};

export default function Mission() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = MISSIONS[String(id)];

  if (!mission) {
    return (
      <View style={{ padding: 40 }}>
        <Text>Misión no encontrada: {String(id)}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 40, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>{mission.title}</Text>
      <Text style={{ opacity: 0.8 }}>{mission.description}</Text>

      <Pressable
        onPress={() => router.push(`/activity/quiz/${mission.id}`)}
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Empezar Quiz</Text>
      </Pressable>
    </View>
  );
}
