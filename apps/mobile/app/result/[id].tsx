import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Result() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const router = useRouter();

  return (
    <View style={{ padding: 40, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Resultado</Text>
      <Text style={{ opacity: 0.8 }}>Score: {score ?? "0"}</Text>

      <Pressable
        onPress={() => router.replace("/")}
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}
