import { Image, StyleSheet, View } from "react-native";
import React from "react";

const KLogo = () => {
  const kotakLogo = require("@/assets/images/kotakLogo.png");

  return (
    <View style={styles.logoContainer}>
      <Image source={kotakLogo} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default KLogo;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "stretch",
    margin: 5,
    backgroundColor: "rgb(250 251 252)",
  },
  image: {
    width: 140,
    height: 30,
  },
});
