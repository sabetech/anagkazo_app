import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MyActionButton from "../../components/MyActionButton";

import { BASE_URL } from "../../config/index";
import AsyncStorage from "@react-native-community/async-storage";

const PrayerLog = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 75,
          backgroundColor: route.params.colorDetail,
          flexDirection: "row",
          elevation: 10,
        }}
      ></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 20, //this only works in android .. find out iOS version
  },
  header: {
    fontSize: 24,
    marginTop: 32,
    marginLeft: 15,
    color: "white",
  },
  attendanceList: {
    height: "90%",
  },
});

export default PrayerLog;
