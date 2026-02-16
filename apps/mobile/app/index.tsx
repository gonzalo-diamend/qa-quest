import { useRouter } from "expo-router";
import { getMissionById } from "@qa-quest/content";
import { View, Text, Button } from "react-native";

export default function Home() {
  const router = useRouter();
  const mission = getMissionById("qa-001");

  return (
    <View style={{ padding: 40 }}>
      <Text>QA Quest</Text>
      <Button
        title="Start"
        onPress={() => router.push(`/mission/${mission?.id}`)}
      />
    </View>
  );
}
