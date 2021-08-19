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
import { BASE_URL } from "../../config/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import { Icon } from "react-native-elements";
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';

export default function FLOWPrayer_Screen({navigation}) {
  const [studentAttendance, setStudentAttn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState('');

  const isFocused = useIsFocused();

  //use effect load student attendace info from here
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getFLOWAttenData(res);
      setStudentIndex(res);
    });
  }, [isFocused]);

  const getFLOWAttenData = (studentIndex) => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${studentIndex}/vision_lectures_attn`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentAttn(responseJson);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getFLOWAttenData(studentIndex);
  }

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
        <Text style={styles.header}>Vision Lectures Attendance</Text>
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
                description="Status"
                left={props => <Icon name={"eye"} type={"font-awesome-5"} iconStyle={{color:"grey", marginTop:10,paddingRight:20}}/>}
                right={props => <Text style={{marginTop: "8%", color:"grey"}}>{item.status}</Text>}
              />              
            );
          }}
          keyExtractor={(item) => item.id + ""}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
      <MyActionButton icon={"scan"} navigateTo={"qr_code_scanner"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#4285F4",
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
