import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MyActionButton from "../../components/MyActionButton";

import CardInfo from "../../components/HomeDashboard/CardInfo";
import { BASE_URL } from "../../config/index";
import AsyncStorage from "@react-native-community/async-storage";

export default function FLOWPrayer_Screen() {
  const [studentAttendance, setStudentAttn] = useState([]);
  const [loading, setLoading] = useState(false);

  //use effect load student attendace info from here
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getFLOWAttenData(res);
    });
  }, []);

  const getFLOWAttenData = (studentIndex) => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${studentIndex}/2`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentAttn(responseJson);
        console.log("here ");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>FLOW Prayer Attendance</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 10 }}
          size="large"
          color="darkblue"
        />
      ) : null}
      <View style={styles.attendanceList}>
        <FlatList
          data={studentAttendance}
          renderItem={({ item }) => {
            return (
              <CardInfo
                id={item.id}
                title={item.title}
                value={item.value}
                extra_details={item.extra_details}
              />
            );
          }}
          keyExtractor={(item) => item.id + ""}
        />
      </View>
      <MyActionButton />
    </View>
  );
}
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
