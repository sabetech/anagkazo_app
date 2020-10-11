import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../../config/index";
import { List } from 'react-native-paper';
import MyActionButton from "../../components/MyActionButton";
import moment from "moment";

//get members from here
export default function Multiplication({ navigation, route }) {
  const [multiplication, setMultiplication] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getMultiplication(res);
    });
  }, []);

  const getMultiplication = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/multiplication`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMultiplication(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, {backgroundColor: route.params.tileColor,}]}>
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
        <Text style={styles.header}>Multiplication</Text>
      </View>
      <View style={{ height: "90%" }}>
        <FlatList
          data={multiplication}
          renderItem={({ item, index }) => {
            return (
              <List.Item
                      title={moment(item.date).format("dddd, MMM DD YYYY")}
                      left={props => <List.Icon {...props} icon="folder" />}
                      right={props => <Text style={{marginTop:10, fontSize:18, paddingRight:10}}>{item.value}</Text>}
                      onPress={(()=> navigation.navigate("multiplication_detail", {
                        topBarColor:route.params.tileColor,
                        date:item.date
                      }))}
                    />
            );
          }}
          keyExtractor={(item) => item.date + ""}
        />
      </View>
      <MyActionButton icon="md-add" navigateTo="member_add" />
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
    elevation: 10,
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "#ffffff",
  },
});
