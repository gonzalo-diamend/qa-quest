import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="mission/[id]" />
      <Stack.Screen name="activity/quiz/[id]" />
      <Stack.Screen name="result/[id]" />
    </Stack>
  );
}
