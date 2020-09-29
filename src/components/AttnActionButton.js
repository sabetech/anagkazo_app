import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons } from "@expo/vector-icons";

export default function AttnActionButton() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3", elevation: 20 }}>
      {/* Rest of the app comes ABOVE the action button component !*/}
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {
          navigation.navigate("qr_code_scanner");
        }}
        renderIcon={(active) =>
          active ? (
            <Ionicons
              name="md-qr-scanner"
              size={24}
              color="black"
              style={styles.actionButtonIcon}
            />
          ) : (
            <Ionicons
              name="md-qr-scanner"
              size={24}
              color="black"
              style={styles.actionButtonIcon}
            />
          )
        }
      ></ActionButton>
    </View>
  );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
