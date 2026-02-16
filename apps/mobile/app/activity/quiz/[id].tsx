import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [ans, setAns] = useState<number | null>(null);

  const question = {
    prompt: "¿Qué define mejor un bug?",
    options: ["Algo que no me gusta", "Desviación del comportamiento esperado"],
    correctIndex: 1
  };

  const score = ans === null ? 0 : ans === question.correctIndex ? 100 : 0;

  return (
    <View style={{ padding: 40, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "900" }}>{question.prompt}</Text>

      {question.options.map((o, i) => (
        <Pressable
          key={i}
          onPress={() => setAns(i)}
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: ans === i ? "#111" : "#eee"
          }}
        >
          <Text style={{ color: ans === i ? "white" : "black", fontWeight: "800" }}>
            {o}
          </Text>
        </Pressable>
      ))}

      <Pressable
        onPress={() => router.replace(`/result/${String(id)}?score=${score}`)}
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 12, opacity: ans === null ? 0.5 : 1 }}
        disabled={ans === null}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Finalizar</Text>
      </Pressable>
    </View>
  );
}
