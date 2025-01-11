import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { FormErrors, UserDetails } from "@/type/interface";
import { useNextStep } from "@/CustomHook/useNextStep";
// import CameraComponent from "@/components/Common/CameraComponent";

export default function DetailsScreen() {
  const [formData, setFormData] = useState<UserDetails>({
    fullName: "",
    maritalStatus: "",
    fatherName: "",
    motherMaidenName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
    }

    if (!formData.fatherName) {
      newErrors.fatherName = "Father's name is required";
    }

    if (!formData.motherMaidenName) {
      newErrors.motherMaidenName = "Mother's maiden name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      await nextStep({ currentStep: "basic-details-submit" });
    }
  }, [formData, validateForm]);

  const isFormValid = useCallback(() => {
    return Object.values(formData).every((value) => value.trim() !== "");
  }, [formData]);

  useEffect(() => {
    fetchEntity();
  }, []);

  const { nextStep, loading, error, data } = useNextStep();
  const fetchEntity = async () => {
    await nextStep({ currentStep: "personal-basic-details" });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi {data?.details?.entityName}!</Text>
        <Text style={styles.subtitle}>
          We'll need a few details about you to proceed.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="marital status"
            value={formData.maritalStatus}
            onChangeText={(text) =>
              setFormData({ ...formData, maritalStatus: text })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Father's name"
            value={formData.fatherName}
            onChangeText={(text) =>
              setFormData({ ...formData, fatherName: text })
            }
          />
        </View>

        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mother's maiden name"
              value={formData.motherMaidenName}
              onChangeText={(text) =>
                setFormData({ ...formData, motherMaidenName: text })
              }
            />
          </View>
          <Text style={styles.helperText}>
            Please note that this name will be considered as the correct
            response to the security question
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid() && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Confirm details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: "#000",
  },
  nextText: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  form: {
    padding: 20,
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  checkIcon: {
    position: "absolute",
    right: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
  },
  picker: {
    height: 48,
    width: "100%",
    ...Platform.select({
      ios: {
        marginTop: -8,
      },
    }),
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
