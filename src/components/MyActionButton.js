import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default MyActionButton = ({ icon, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.fab}>
      <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
        <Ionicons
          name={icon}
          size={32}
          color="white"
          style={styles.actionButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(231,76,60,1)",
    borderRadius: 30,
    elevation: 10,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
});

//export default MyActionButton;
