import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddBiometric = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your Biometric</Text>

      {/* <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Confirm details</Text>
      </TouchableOpacity> */}
      {/* <CameraComponent /> */}
    </View>
  );
};

export default AddBiometric;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen
    backgroundColor: "#F5F5F5", // Light background for better UI
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
});
