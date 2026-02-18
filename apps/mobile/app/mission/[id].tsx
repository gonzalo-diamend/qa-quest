import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { theme } from "../../theme";

export default function Mission() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = getMissionById(String(id));

  if (!mission) {
    return (
      <View style={{ flex: 1, padding: theme.spacing.page, backgroundColor: theme.colors.bg }}>
        <Text style={{ color: theme.colors.text }}>Misión no encontrada: {String(id)}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: theme.spacing.page, gap: theme.spacing.md, backgroundColor: theme.colors.bg }}>
      <Text style={{ fontSize: 24, fontWeight: "900", color: theme.colors.text }}>{mission.title}</Text>
      <Text style={{ color: theme.colors.muted }}>{mission.description}</Text>
      <Text style={{ fontSize: 12, color: theme.colors.muted }}>
        Dificultad: {mission.difficulty} · Recompensa: {mission.xp} XP
      </Text>

      <View style={{ marginTop: theme.spacing.sm, gap: theme.spacing.sm }}>
        {mission.lessonBlocks.map((block, idx) => (
          <View
            key={`${block.type}-${idx}`}
            style={{
              padding: 12,
              borderRadius: theme.radius.md,
              backgroundColor: block.type === "tip" ? "#ecfdf5" : theme.colors.surface
            }}
          >
            <Text style={{ fontWeight: "700", color: theme.colors.text }}>{block.text}</Text>
          </View>
        ))}
      </View>

      {mission.activity.type === "quiz" ? (
        <Pressable
          onPress={() => router.push(`/activity/quiz/${mission.id}`)}
          style={{ padding: 12, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md }}
        >
          <Text style={{ color: theme.colors.primaryText, fontWeight: "900", textAlign: "center" }}>Empezar quiz</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => router.replace("/")}
          style={{ padding: 12, backgroundColor: theme.colors.primary, borderRadius: theme.radius.md }}
        >
          <Text style={{ color: theme.colors.primaryText, fontWeight: "900", textAlign: "center" }}>Volver al inicio</Text>
        </Pressable>
      )}
    </View>
  );
}
