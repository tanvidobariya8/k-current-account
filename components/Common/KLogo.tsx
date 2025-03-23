import { Image, StyleSheet, View, Text } from "react-native";
import React from "react";

const KLogo = () => {
  const kotakLogo = require("@/assets/images/logo5.png");

  return (
    <View style={styles.logoContainer}>
      <Image source={kotakLogo} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>Bank+</Text>
    </View>
  );
};

export default KLogo;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(250 251 252)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    width: 40,
    height: 35,
  },
  text: {
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
