import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";

export default function Mission() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = getMissionById(String(id));

  if (!mission) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Misión no encontrada: {String(id)}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "900" }}>{mission.title}</Text>
      <Text style={{ opacity: 0.8 }}>{mission.description}</Text>
      <Text style={{ fontSize: 12, opacity: 0.6 }}>
        Dificultad: {mission.difficulty} · Recompensa: {mission.xp} XP
      </Text>

      <View style={{ marginTop: 8, gap: 8 }}>
        {mission.lessonBlocks.map((block, idx) => (
          <View
            key={`${block.type}-${idx}`}
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: block.type === "tip" ? "#ecfdf5" : "#f4f4f5"
            }}
          >
            <Text style={{ fontWeight: "700" }}>{block.text}</Text>
          </View>
        ))}
      </View>

      {mission.activity.type === "quiz" ? (
        <Pressable
          onPress={() => router.push(`/activity/quiz/${mission.id}`)}
          style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>Empezar quiz</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => router.replace("/")}
          style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>Volver al inicio</Text>
        </Pressable>
      )}
    </View>
  );
}
