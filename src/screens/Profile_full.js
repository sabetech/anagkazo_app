import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Profile_full() {
  return (
    <View style={styles.container}>
      <Text>This is Is Profile Full Page</Text>
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
