import { Stack } from "expo-router/stack";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    document.title = "Home - Your App Name";
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
