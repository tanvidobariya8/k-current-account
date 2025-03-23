import { Stack } from "expo-router/stack";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen
            name="account-selection"
            options={{
              headerShown: true,
            }}
          />
          {/* Additional Screens */}
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  container: {
    width: "100%", // Takes full width of the screen
    maxWidth: 420, // Limits the width to 460px
    flex: 1, // Allows it to take full height
  },
});
