import KLogo from "@/components/Common/KLogo";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { useNextStep } from "@/CustomHook/useNextStep";
import { RenderPaths } from "@/Api/urlMapper";
import { router } from "expo-router";

export default function VerificationScreen() {
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [isConsent, setIsConsent] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errors, setErrors] = useState({
    mobile: "",
    pan: "",
    aadhaar: "",
  });

  // Validation functions
  const isMobileValid = (number: string) => /^[0-9]{10}$/.test(number);
  const isPanValid = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const isAadhaarValid = (aadhaar: string) => /^[0-9]{12}$/.test(aadhaar);

  // Check if all fields are valid
  useEffect(() => {
    setIsButtonEnabled(
      isMobileValid(mobile) &&
        isPanValid(pan) &&
        isAadhaarValid(aadhaar) &&
        isConsent
    );
  }, [mobile, pan, aadhaar, isConsent]);

  const { nextStep, loading, error, data } = useNextStep();

  const handleVerifyButton = async () => {
    const data = await nextStep({ mobile, pan, aadhaar, isConsent });

    if (data?.renderPath === RenderPaths.BASIC_DETAILS) {
      router.push(`/${RenderPaths.BASIC_DETAILS}`);
    }
  };

  const validateField = (field: string, value: string) => {
    let errorMessage = "";
    switch (field) {
      case "mobile":
        if (!isMobileValid(value)) {
          errorMessage = "Please enter a valid 10-digit mobile number";
        }
        break;
      case "pan":
        if (!isPanValid(value)) {
          errorMessage = "Please enter a valid PAN";
        }
        break;
      case "aadhaar":
        if (!isAadhaarValid(value)) {
          errorMessage = "Please enter a valid 12-digit Aadhaar number";
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  return (
    <ScrollView style={styles.container}>
      <KLogo />

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
              onChangeText={(text) => {
                setMobile(text);
                validateField("mobile", text);
              }}
              maxLength={10}
            />
          </View>
          {errors.mobile ? (
            <Text style={styles.errorText}>{errors.mobile}</Text>
          ) : null}

          {/* PAN Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="PAN"
              value={pan}
              onChangeText={(text) => {
                setPan(text.toUpperCase());
                validateField("pan", text.toUpperCase());
              }}
              autoCapitalize="characters"
              maxLength={10}
            />
          </View>
          {errors.pan ? (
            <Text style={styles.errorText}>{errors.pan}</Text>
          ) : null}

          {/* Aadhaar Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Aadhaar number"
              keyboardType="numeric"
              value={aadhaar}
              onChangeText={(text) => {
                setAadhaar(text);
                validateField("aadhaar", text);
              }}
              maxLength={12}
            />
          </View>
          {errors.aadhaar ? (
            <Text style={styles.errorText}>{errors.aadhaar}</Text>
          ) : null}

          {/* Consent Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isConsent}
              onValueChange={setIsConsent}
              color={isConsent ? "rgb(29 78 216)" : undefined}
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
            onPress={handleVerifyButton}
          >
            <Text style={styles.verifyButtonText}>Verify Aadhar</Text>
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
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-start",
    margin: 20,
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
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5FF",
    padding: 12,
    borderRadius: 8,
  },
  audioButtonText: {
    color: "rgb(29 78 216)",
    marginLeft: 4,
  },
  languageButton: {
    padding: 12,
  },
  languageButtonText: {
    color: "rgb(29 78 216)",
  },
  terms: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
    paddingHorizontal: 19,
    marginTop: 50,
  },
  link: {
    color: "rgb(29 78 216)",
  },
  verifyButton: {
    backgroundColor: "rgb(29 78 216)",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
