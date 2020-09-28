import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Members() {
  return (
    <View style={styles.container}>
      <Text>This is Is Members Page</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
