import Camera from "@/components/Common/Camera";
import Button from "@/components/Common/Button";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddBiometric = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your Biometric</Text>
      <Camera />
      <Button
        title="Capture Biometric"
        onPress={() => router.push("/basic-details")}
      />
    </View>
  );
};

export default AddBiometric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
});
