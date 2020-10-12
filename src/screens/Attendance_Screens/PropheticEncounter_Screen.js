import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import MyActionButton from "../../components/MyActionButton";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../../config/index";
import { Icon } from "react-native-elements";
import { List } from 'react-native-paper';
import moment from "moment";

export default function PropheticEncounter_Screen({navigation}) {
  const [studentAttendance, setStudentAttn] = useState([]);
  const [loading, setLoading] = useState(false);

  //use effect load student attendace info from here
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getSundayFLOWData(res);
    });
  }, []);

  const getSundayFLOWData = (studentIndex) => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${studentIndex}/3`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentAttn(responseJson);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableHighlight>
          <View style={styles.header}>
            <Icon
              name="menu"
              size={28}
              type="feather"
              color={"#ffffff"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </View>
        </TouchableHighlight>
        <Text style={styles.header}>Flow Encounter</Text>
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
              <List.Item
                id={item.id}  
                title={moment(item.title).format("dddd, MMM DD YYYY")}
                description="Prophetic Encounter"
                left={props => <Icon name={"church"} type={"material-community"} iconStyle={{color:"grey", marginTop:10, paddingRight:20}}/>}
                right={props => <Text style={{marginTop: "8%", color:"grey"}}>{item.value}</Text>}
              />
            );
          }}
          keyExtractor={(item) => item.id + ""}
        />
      </View>
      <MyActionButton icon={"md-qr-scanner"} navigateTo={"qr_code_scanner"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#4F0F97",
    flexDirection: "row",
    elevation: 20, //this only works in android .. find out iOS version
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "white",
  },
  attendanceList: {
    height: "90%",
  },
});
