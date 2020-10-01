import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AttnActionButton from "../../components/AttnActionButton";

export default function OtherServices_Screen() {
  return (
    <View style={styles.container}>
      <Text>Other Screen Prayer Attn</Text>
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
