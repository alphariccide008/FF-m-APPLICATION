import { Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import { logAPIConfig } from "../utils/debug";

export default function RootLayout() {
  // Log API configuration on app start (helps with debugging connection issues)
  useEffect(() => {
    logAPIConfig();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      {/* ✅ register route groups */}
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(Tabs)" />
    </Stack>
  );
}
