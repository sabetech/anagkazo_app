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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/index";
import { Icon } from "react-native-elements";
import { List } from 'react-native-paper';
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';

export default function CenterService_Screen({navigation}) {
  const [studentAttendance, setStudentAttn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setUpdateVal] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState('');

  const isFocused = useIsFocused();

  //use effect load student attendace info from here
  useEffect(() => {
    setUpdateVal();
    AsyncStorage.getItem("student_index").then((res) => {
      getCenterServiceData(res);
      setStudentIndex(res);
    });
  }, [isFocused]);

  const getCenterServiceData = (studentIndex) => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${studentIndex}/center_service_attn`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentAttn(responseJson);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getCenterServiceData(studentIndex);
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
        <Text style={styles.header}>Center Service</Text>
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
                title={moment(item.date_of_service).format("dddd, MMM DD YYYY")}
                description="Number of Souls"
                left={props => <Icon name={"church"} type={"font-awesome-5"} iconStyle={{color:"grey", marginTop:10, paddingRight:20}}/>}
                right={props => <Text style={{marginTop: "8%", color:"grey"}}>{item.number_of_souls}</Text>}
              />
            );
          }}
          keyExtractor={(item) => item.id + ""}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#12BDA7",
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
