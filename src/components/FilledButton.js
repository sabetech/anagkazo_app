import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function FilledButton({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1.5, y: -0.6 }}
        colors={["rgba(32,150,255,0.9)", "rgba(5,255,163,0.4)"]}
        style={{
          height: 70,
          width: "100%",
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons name="login" size={22} color="white" />
          {title.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 28,
    padding: 15,
  },
});
