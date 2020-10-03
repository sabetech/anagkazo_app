import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    marginBottom: 25,
  },
  iconRow: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  smsIcon: {
    color: "darkgray",
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: "flex-start",
  },
  telIcon: {
    color: "gray",
    fontSize: 30,
  },
  telNameColumn: {
    justifyContent: "flex-start",
  },
  telNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  telNumberColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
  },
});

const Tel = ({ containerStyle, name, number }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        <Ionicons name="ios-call" size={24} color="gray" />
      </View>
      <View style={styles.telRow}>
        <View style={styles.telNumberColumn}>
          <Text style={styles.telNumberText}>{number}</Text>
        </View>
        <View style={styles.telNameColumn}>
          <Text style={styles.telNameText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

export default Tel;
