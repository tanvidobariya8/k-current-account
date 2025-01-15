import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const AccountSelection = () => {
  const [journey, setJourney] = useState<number | null>(null);
  const journeyType = [
    {
      id: 1,
      title: "An Individual",
      subtitle: "Account will be in your name",
    },
    {
      id: 2,
      title: "A Business Entity",
      subtitle: "Account will be in your entity's name",
    },
  ];

  return (
    <>
      {journeyType.map((ele) => (
        <Pressable
          key={ele.id}
          onPress={() => setJourney(ele.id)}
          style={[
            styles.mainContainer,
            journey === ele.id && styles.selectedStyle,
          ]}
        >
          <View style={styles.flexContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{ele.title}</Text>
              <Text style={styles.subtitle}>{ele.subtitle}</Text>
            </View>
            <View style={styles.iconContainer}>
              {journey === ele.id && (
                <FontAwesome
                  name={"check-circle"}
                  size={24}
                  color={"rgb(29 78 216)"}
                />
              )}
            </View>
          </View>
        </Pressable>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: "rgb(221 221 221)",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "rgb(250 251 252)",
    padding: 10,
  },
  selectedStyle: {
    backgroundColor: "white",
    borderColor: "rgb(29 78 216)",
    borderWidth: 2,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    marginRight: 10,
  },
  title: {
    fontWeight: "700",
    marginVertical: 8,
  },
  subtitle: {
    fontWeight: "400",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountSelection;
