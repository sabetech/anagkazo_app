import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AttnActionButton from "../../components/AttnActionButton";

export default function FLOWPrayer_Screen() {
  return (
    <View style={styles.container}>
      <Text>FLOW Prayer Attn</Text>
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
