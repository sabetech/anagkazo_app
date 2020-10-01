import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AttnActionButton from "../../components/AttnActionButton";

export default function PropheticEncounter_Screen() {
  return (
    <View style={styles.container}>
      <Text>Pophetic Encounter</Text>
      <AttnActionButton />
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
