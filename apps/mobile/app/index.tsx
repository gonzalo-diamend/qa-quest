import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ padding: 40, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "900" }}>QA Quest</Text>
      <Text style={{ opacity: 0.7 }}>Aprendé QA con práctica real.</Text>

      <Pressable
        onPress={() => router.push("/mission/qa-001")}
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Empezar</Text>
      </Pressable>
    </View>
  );
}
