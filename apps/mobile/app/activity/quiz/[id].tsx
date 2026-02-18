import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { getMissionById } from "@qa-quest/content";
import { scoreQuiz } from "@qa-quest/shared";

const palette = {
  pageBackground: "#f8fafc",
  cardBackground: "#ffffff",
  textPrimary: "#0f172a",
  textMuted: "#64748b",
  selected: "#1d4ed8",
  selectedText: "#ffffff",
  option: "#e2e8f0",
  success: "#dcfce7",
  successStrong: "#166534",
  error: "#fee2e2",
  errorStrong: "#991b1b",
  button: "#0f172a",
  buttonDisabled: "#94a3b8"
};

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = useMemo(() => getMissionById(String(id)), [id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersByQuestionId, setAnswersByQuestionId] = useState<Record<string, number>>({});
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});

  if (!mission || mission.activity.type !== "quiz") {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: "center", backgroundColor: palette.pageBackground }}>
        <Text style={{ color: palette.textPrimary, fontSize: 16, fontWeight: "700" }}>
          Quiz no disponible para esta misión.
        </Text>
      </View>
    );
  }

  const quizActivity = mission.activity;
  const totalQuestions = quizActivity.questions.length;
  const question = quizActivity.questions[currentQuestionIndex];
  const selected = answersByQuestionId[question.id];
  const isReviewed = reviewed[question.id] === true;
  const isCorrect = isReviewed && selected === question.correctIndex;
  const isLast = currentQuestionIndex === totalQuestions - 1;

  function handleReview() {
    setReviewed((prev) => ({ ...prev, [question.id]: true }));
  }

  function goNextOrFinish() {
    if (isLast) {
      const result = scoreQuiz(quizActivity, { answersByQuestionId });
      router.replace(`/result/${mission.id}?score=${result.score}`);
      return;
    }
    setCurrentQuestionIndex((q) => q + 1);
  }

  function getOptionBackground(index: number) {
    if (!isReviewed) {
      return selected === index ? palette.selected : palette.option;
    }

    if (index === question.correctIndex) {
      return palette.success;
    }

    if (selected === index && index !== question.correctIndex) {
      return palette.error;
    }

    return palette.option;
  }

  function getOptionTextColor(index: number) {
    if (!isReviewed && selected === index) {
      return palette.selectedText;
    }

    if (isReviewed && index === question.correctIndex) {
      return palette.successStrong;
    }

    if (isReviewed && selected === index && index !== question.correctIndex) {
      return palette.errorStrong;
    }

    return palette.textPrimary;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 14, backgroundColor: palette.pageBackground }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: palette.textMuted, fontWeight: "700" }}>
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </Text>
          <Text style={{ color: palette.textMuted, fontWeight: "700" }}>
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </Text>
        </View>
        <View style={{ height: 8, borderRadius: 999, backgroundColor: "#cbd5e1" }}>
          <View
            style={{
              height: "100%",
              borderRadius: 999,
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              backgroundColor: palette.selected
            }}
          />
        </View>
      </View>

      <View style={{ padding: 16, borderRadius: 16, backgroundColor: palette.cardBackground }}>
        <Text style={{ fontSize: 20, lineHeight: 28, fontWeight: "900", color: palette.textPrimary }}>
          {question.prompt}
        </Text>
      </View>

      <View style={{ gap: 10 }}>
        {question.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (!isReviewed) {
                setAnswersByQuestionId((prev) => ({
                  ...prev,
                  [question.id]: index
                }));
              }
            }}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cbd5e1",
              backgroundColor: getOptionBackground(index),
              opacity: isReviewed && selected !== index && index !== question.correctIndex ? 0.85 : 1
            }}
          >
            <Text style={{ color: getOptionTextColor(index), fontWeight: "800" }}>{option}</Text>
          </Pressable>
        ))}
      </View>

      {isReviewed ? (
        <View
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: isCorrect ? palette.success : palette.error,
            gap: 4
          }}
        >
          <Text style={{ fontWeight: "900", color: isCorrect ? palette.successStrong : palette.errorStrong }}>
            {isCorrect ? "✅ Correcto" : "❌ Incorrecto"}
          </Text>
          <Text style={{ color: palette.textPrimary }}>{question.explanation}</Text>
        </View>
      ) : (
        <Pressable
          onPress={handleReview}
          style={{
            padding: 12,
            backgroundColor: selected === undefined ? palette.buttonDisabled : palette.button,
            borderRadius: 12
          }}
          disabled={selected === undefined}
        >
          <Text style={{ color: "white", fontWeight: "900", textAlign: "center" }}>Verificar respuesta</Text>
        </Pressable>
      )}

      {isReviewed && (
        <Pressable
          onPress={goNextOrFinish}
          style={{
            padding: 12,
            backgroundColor: palette.button,
            borderRadius: 12
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", textAlign: "center" }}>
            {isLast ? "Finalizar" : "Siguiente"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
