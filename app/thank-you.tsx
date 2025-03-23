import Button from "@/components/Common/Button";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Linking, Platform, StyleSheet, Text, View } from "react-native";

const ThankYouPage: React.FC = () => {
  const openBankApp = async () => {
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.msf.kbank.mobile&hl=en_IN&pli=1";
    const appStoreUrl =
      "https://apps.apple.com/in/app/kotak-mobile-banking/id622363400";
    const webUrl = "https://www.kotak.com/en/home.html";

    try {
      if (Platform.OS === "android") {
        await Linking.openURL(playStoreUrl);
      } else if (Platform.OS === "ios") {
        await Linking.openURL(appStoreUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error("Error opening the app or store:", error);
    }
  };

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
      {/* <Button
        title="Open Bank App"
        // onPress={openBankApp}
        style={{ width: "100%" }}
      /> */}
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
