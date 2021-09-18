import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  ImageBackground, Dimensions
} from "react-native";

import MyActionButton from "../../components/MyActionButton";
import { BASE_URL } from "../../config/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "react-native-elements";
import { List } from 'react-native-paper';
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';


export default function AnagkazoLive_Screen({navigation}) {
  const [studentAttendance, setStudentAttn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getAnagkazoLiveAttn(res);
      setStudentIndex(res);
    });
  }, [isFocused]);

  const getAnagkazoLiveAttn = (studentIndex) => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${studentIndex}/anagkazo_live`, {
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
    getAnagkazoLiveAttn(studentIndex);
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
        <Text style={styles.header}>Anagkazo Live</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 10 }}
          size="large"
          color="darkblue"
        />
      ) : null}
      <View style={styles.attendanceList}>
      <ImageBackground 
              source={require('../../res/imgs/geometry.jpg')}
              style={styles.dashboardBackground} />
        <FlatList
          data={studentAttendance}
          renderItem={({ item }) => {
            return (
              <List.Item
                id={item.id}  
                title={moment(item.title).format("dddd, MMM DD YYYY")}
                description="Status"
                left={props => <Icon name={"access-point"} type={"material-community"} iconStyle={{color:"grey", marginTop:10,paddingRight:20}}/>}
                right={props => <Text style={{marginTop: "8%", color:"black"}}>{item.value}</Text>}
              />
            );
          }}
          keyExtractor={(item) => item.id + ""}
          onRefresh={handleRefresh}
          refreshing={refreshing}
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
    backgroundColor: "#067E6B",
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
  dashboardBackground:{
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute"
  }
});
