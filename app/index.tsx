import { StyleSheet, Text, View } from "react-native";
import React from "react";
import App from "@/App";

const index = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-blue-500 font-extrabold text-lg">App</Text>
      <App />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
