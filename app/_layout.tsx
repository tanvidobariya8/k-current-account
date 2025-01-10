import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="constitution-selection"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="verification"
        // options={{
        //   headerShown: true,
        // }}
      />
      <Stack.Screen
        name="basic-details"
        // options={{
        //   headerShown: true,
        // }}
      /> */}
    </Stack>
  );
}
