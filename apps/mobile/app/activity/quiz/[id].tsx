import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { scoreQuiz } from "@qa-quest/shared";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = useMemo(() => getMissionById(String(id)), [id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersByQuestionId, setAnswersByQuestionId] = useState<Record<string, number>>({});

  if (!mission || mission.activity.type !== "quiz") {
    return (
      <View style={{ padding: 24 }}>
        <Text>Quiz no disponible para esta misión.</Text>
      </View>
    );
  }

  const question = mission.activity.questions[currentQuestionIndex];
  const selected = answersByQuestionId[question.id];
  const isLast = currentQuestionIndex === mission.activity.questions.length - 1;

  function goNextOrFinish() {
    if (isLast) {
      const result = scoreQuiz(mission.activity, { answersByQuestionId });
      router.replace(`/result/${mission.id}?score=${result.score}`);
      return;
    }

    setCurrentQuestionIndex((q) => q + 1);
  }

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ opacity: 0.6 }}>
        Pregunta {currentQuestionIndex + 1} de {mission.activity.questions.length}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "900" }}>{question.prompt}</Text>

      {question.options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() =>
            setAnswersByQuestionId((prev) => ({
              ...prev,
              [question.id]: index
            }))
          }
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: selected === index ? "#111" : "#eee"
          }}
        >
          <Text style={{ color: selected === index ? "white" : "black", fontWeight: "800" }}>
            {option}
          </Text>
        </Pressable>
      ))}

      <Pressable
        onPress={goNextOrFinish}
        style={{
          padding: 12,
          backgroundColor: "#111",
          borderRadius: 12,
          opacity: selected === undefined ? 0.5 : 1
        }}
        disabled={selected === undefined}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>
          {isLast ? "Finalizar" : "Siguiente"}
        </Text>
      </Pressable>
    </View>
  );
}
