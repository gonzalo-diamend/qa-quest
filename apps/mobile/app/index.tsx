import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { allMissions } from "@qa-quest/content";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "900" }}>QA Quest</Text>
      <Text style={{ opacity: 0.7 }}>Aprendé QA con práctica real.</Text>

      <View style={{ marginTop: 8, gap: 10 }}>
        {allMissions.map((mission) => (
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
            <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              {mission.title}
            </Text>
            <Text style={{ color: "#ddd" }}>{mission.description}</Text>
            <Text style={{ color: "#a6a6a6", fontSize: 12 }}>
              {mission.difficulty.toUpperCase()} · {mission.xp} XP
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
