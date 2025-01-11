import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const LocalAuthComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkDeviceSupport();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      handleAuthentication();
    }
  }, [isAuthenticated]);

  // Check if the device supports biometric authentication
  const checkDeviceSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedAuthTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    const typeLabels = supportedAuthTypes.map((type) =>
      type === LocalAuthentication.AuthenticationType.FINGERPRINT
        ? "Fingerprint"
        : type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        ? "Face Recognition"
        : "Passcode"
    );

    if (!hasHardware) {
      Alert.alert(
        "Error",
        "This device does not support biometric authentication."
      );
      return;
    }
  };

  const handleAuthentication = async () => {
    try {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      console.log("isEnrolled:", isEnrolled);

      if (!isEnrolled) {
        Alert.alert("Error", "No biometrics are enrolled on this device.");
        return;
      }

      // Attempt Face or Fingerprint authentication first
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate using passcode",
        fallbackLabel: "Enter Passcode", // This allows the fallback to passcode
        disableDeviceFallback: false, // Allow fallback to passcode after failed biometric attempts
      });

      if (result.success) {
        setIsAuthenticated(true);
        Alert.alert("Success", "You are authenticated!");
      } else {
        Alert.alert("Error", "Your authenticated fail");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Error", "An error occurred during authentication.");
    }
  };
  return <div></div>;
};

export default LocalAuthComponent;
