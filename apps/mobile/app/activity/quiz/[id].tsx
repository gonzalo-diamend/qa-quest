import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getMissionById } from "@qa-quest/content";
import { scoreQuiz } from "@qa-quest/shared";
import { View, Text, Button } from "react-native";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = getMissionById(String(id));

  const [answer, setAnswer] = useState<number | null>(null);

  if (!mission || mission.activity.type !== "quiz") return null;

  function finish() {
    const result = scoreQuiz(mission.activity, {
      answersByQuestionId: { q1: answer }
    });

    router.replace(`/result/${mission.id}?score=${result.score}`);
  }

  return (
    <View style={{ padding: 40 }}>
      <Text>{mission.activity.questions[0].prompt}</Text>
      {mission.activity.questions[0].options.map((o, i) => (
        <Button key={i} title={o} onPress={() => setAnswer(i)} />
      ))}
      <Button title="Finish" onPress={finish} />
    </View>
  );
}
