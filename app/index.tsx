import React from "react";
import { Redirect } from "expo-router";
import { View } from "react-native";
import LocalAuthComponent from "@/components/current-account/LocalAuthComponent";

export default function Index() {
  return (
    <View>
      <LocalAuthComponent />
      <Redirect href="/constitution-selection" />
    </View>
  );
}
