import React from "react";
import { Redirect } from "expo-router";
import { View, StyleSheet, Text, Platform } from "react-native";
import LocalAuthComponent from "@/components/current-account/LocalAuthComponent";

export default function Index() {
  return (
    <View style={styles.container}>
      <LocalAuthComponent />
      <Redirect href="/account-selection" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 460,
    backgroundColor: "black",
  },
});
