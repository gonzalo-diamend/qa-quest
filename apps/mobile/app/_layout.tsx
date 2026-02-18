import { useEffect } from "react";
import { Stack, useSegments } from "expo-router";
import { initializeTelemetry, trackScreen } from "../services/telemetry";

export default function Layout() {
  const segments = useSegments();

  useEffect(() => {
    initializeTelemetry();
  }, []);

  useEffect(() => {
    const screenName = segments.length === 0 ? "index" : segments.join("/");
    trackScreen(screenName);
  }, [segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="progress" />
      <Stack.Screen name="mission/[id]" />
      <Stack.Screen name="activity/quiz/[id]" />
      <Stack.Screen name="result/[id]" />
    </Stack>
  );
}
