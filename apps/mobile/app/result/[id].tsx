import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Result() {
  const { score } = useLocalSearchParams<{ score: string }>();

  return (
    <View style={{ padding: 40 }}>
      <Text>Score: {score}</Text>
    </View>
  );
}
