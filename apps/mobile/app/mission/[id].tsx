import { useLocalSearchParams, useRouter } from "expo-router";
import { getMissionById } from "@qa-quest/content";
import { View, Text, Button } from "react-native";

export default function Mission() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mission = getMissionById(String(id));

  if (!mission) return null;

  return (
    <View style={{ padding: 40 }}>
      <Text>{mission.title}</Text>
      <Button
        title="Start Quiz"
        onPress={() =>
          router.push(`/activity/quiz/${mission.id}`)
        }
      />
    </View>
  );
}
