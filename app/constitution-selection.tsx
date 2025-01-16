import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AccountSelection from "@/components/current-account/AccountSelection";
import VideoScreen from "@/components/Common/VideoScreen";
import KLogo from "@/components/Common/KLogo";
import { useRouter } from "expo-router";
import { RenderPaths } from "@/Api/urlMapper";
import LocalAuthComponent from "@/components/current-account/LocalAuthComponent";

const ConstitutionSelection = () => {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <LocalAuthComponent />
      <KLogo />
      <View style={styles.mainContainer}>
        <VideoScreen />

        <Text style={styles.currentAccountTitle}>Current Account</Text>
        <Text style={styles.subtitle}>
          Fast, flexible and secure. Lets you focus on running your business.
        </Text>
        <Text style={styles.heading}>This account is for...</Text>
        <AccountSelection />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.customButton, styles.secondory]}
            onPress={() => {}}
          >
            <Text style={styles.secondory}>Already applied?</Text>
          </Pressable>
          <Pressable
            style={[styles.customButton, styles.primaryButton]}
            onPress={() => router.push(`/${RenderPaths.VERIFICATION}`)}
          >
            <Text style={styles.primaryButton}>Click me</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConstitutionSelection;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderColor: "rgb(29 78 216)",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  currentAccountTitle: {
    fontSize: 28,
    fontWeight: "600",
    backgroundColor: "rgb(29 78 216)",
    color: "#FFF",
    padding: 8,
  },

  currentAccountBannerImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  subtitle: {
    fontWeight: "200",
    fontSize: 20,
    margin: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingVertical: 10,
    marginTop: 50,
  },
  customButton: {
    marginHorizontal: 5,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },

  primaryButton: {
    backgroundColor: "rgb(29 78 216)",
    color: "white",
  },
  secondory: {
    color: "rgb(29 78 216)",
    backgroundColor: "white",
  },
});
