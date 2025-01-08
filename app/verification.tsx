import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";

export default function VerificationScreen() {
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [isConsent, setIsConsent] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Validation functions
  const isMobileValid = (number: string) => /^[0-9]{10}$/.test(number);
  const isPanValid = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const isAadhaarValid = (aadhaar: string) => /^[0-9]{12}$/.test(aadhaar);

  // Update button state
  useEffect(() => {
    setIsButtonEnabled(
      isMobileValid(mobile) &&
        isPanValid(pan) &&
        isAadhaarValid(aadhaar) &&
        isConsent
    );
  }, [mobile, pan, aadhaar, isConsent]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fast, flexible and secure.</Text>
        <Text style={styles.subtitle}>Apply for a Current Account</Text>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>New to Kotak?</Text>
          <Text style={styles.sectionSubtitle}>
            Enter your details to get started
          </Text>

          {/* Mobile Input */}
          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text>🇮🇳 | +91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="numeric"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>

          {/* PAN Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="PAN"
              value={pan}
              onChangeText={setPan}
              autoCapitalize="characters"
              maxLength={10}
            />
          </View>

          {/* Aadhaar Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Aadhaar number"
              keyboardType="numeric"
              value={aadhaar}
              onChangeText={setAadhaar}
              maxLength={12}
            />
          </View>

          {/* Consent Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isConsent}
              onValueChange={setIsConsent}
              color={isConsent ? "#6B4EFF" : undefined}
            />
            <Text style={styles.checkboxText}>
              I hereby voluntarily provide my consent to Kotak Mahindra Bank to
              obtain my... <Text style={styles.link}>Read more</Text>
            </Text>
          </View>

          {/* Terms */}
          <Text style={styles.terms}>
            By proceeding, I agree to accept all applicable{" "}
            <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy policy</Text>.
          </Text>

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              !isButtonEnabled && styles.verifyButtonDisabled,
            ]}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.verifyButtonText}>Verify Aadhaar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(250 251 252)",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color: "#666666",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 32,
  },
  formSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  countryCode: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333333",
  },
  terms: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  link: {
    color: "#6B4EFF",
  },
  verifyButton: {
    backgroundColor: "#6B4EFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
