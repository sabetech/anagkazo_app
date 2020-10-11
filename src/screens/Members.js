import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../config/index";
import ContactListItem from "../components/Members/ContactListItem";
import MyActionButton from "../components/MyActionButton";

//get members from here
export default function Members({ navigation }) {
  const [studentMembers, setStudentMembers] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getStudentMembers(res);
    });
  }, []);

  const getStudentMembers = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/members`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setStudentMembers(responseJson);
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
        <Text style={styles.header}>Members</Text>
      </View>
      <View style={{ height: "90%" }}>
        <FlatList
          data={studentMembers}
          renderItem={({ item }) => {
            return (
              <ContactListItem name={item.name} photo_url={item.photo_url} />
            );
          }}
          keyExtractor={(item) => item.id + ""}
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
    backgroundColor: "#0F9D58",
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
