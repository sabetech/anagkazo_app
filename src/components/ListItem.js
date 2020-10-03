import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const ListItem = ({ title, value }) => {
  return (
    <View style={styles.listItem}>
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 21,
          padding: 10,
        }}
      >
        {moment(title).format("dddd, MMM DD YYYY")}:<Text> {value}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: "center",
    height: 80,
    borderBottomWidth: 0.5,
    borderWidth: 0,
  },
});

export default ListItem;
