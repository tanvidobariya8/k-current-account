import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/Common/Button";

const ThankYouPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textIconContainer}>
        <FontAwesome
          name={"check-circle"}
          size={50}
          color={"#4caf50"}
          style={{ textAlign: "center" }}
        />
        <Text style={styles.thankYouText}>Thank You!</Text>
        <Text style={styles.congratsText}>
          Your account creation is complete. You're one step closer to an
          amazing experience.
        </Text>
      </View>
      <Button title="Close" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
    justifyContent: "space-between",
  },
  textIconContainer: {
    marginVertical: 30,
  },
  thankYouText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  congratsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
});

export default ThankYouPage;
