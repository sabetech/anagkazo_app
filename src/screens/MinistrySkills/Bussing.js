import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/index";
import { List } from 'react-native-paper';
import { Icon } from "react-native-elements";
import moment from "moment";

//get members from here
export default function Bussing({ navigation, route }) {
    const [bussing, setBussing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [studentIndex, setStudentIndex] = useState("");

    useEffect(() => {
        setLoading(true);
        AsyncStorage.getItem("student_index").then((res) => {
        setStudentIndex(res);
        getBussing(res);
        });
    }, []);

    const getBussing = (studentIndex) => {
        fetch(
            `${BASE_URL}/student/${studentIndex}/4`,
                {
                    method: "GET",
                }
        )
        .then((response) => response.json())
        .then((responseJson) => {
            setBussing(responseJson);
            setRefreshing(false);
            setLoading(false);
        })
        .catch((error) => {
            alert("Data cannot be retrieved. Check your internet");
        });
    
    }

  const handleRefresh = () => {
    setRefreshing(true);
    getBussing(studentIndex);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor:route.params.tileColor}]}>
        <TouchableHighlight>
          <View style={styles.header}>
            <FontAwesome5
              name="arrow-left"
              size={28}
              color={"#ffffff"}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={{ fontSize: 32 }}></Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.header}>Bussing History</Text>
      </View>
      <View style={{ height: "90%" }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}
        <FlatList
          data={bussing}
          renderItem={({ item }) => {
            return <List.Item
            id={item.id}  
            title={moment(item.title).format("dddd, MMM DD YYYY")}
            description={"Number of People Bussed on Sunday"}
            left={props => <Icon name={route.params.icon} type={route.params.type} iconStyle={{color:"grey", marginTop:10}}/>}
            right={props => <Text style={{marginTop: "8%", color:"grey"}}>{item.value}</Text>}
          />
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
    flexDirection: "row",
    elevation: 10,
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "#ffffff",
  },
});
