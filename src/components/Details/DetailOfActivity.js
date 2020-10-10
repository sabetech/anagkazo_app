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
import CustomListItem from "../../components/CustomListComponent/CustomListItem";
import MyActionButton from "../../components/MyActionButton";

//get members from here
export default function DetailOfActivity({ navigation }) {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getCounsellings(res);
    });
  }, []);

  const getCounsellings = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/counselling`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCounsellings(responseJson);
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
        <Text style={styles.header}>Counselling</Text>
      </View>
      <View style={{ height: "90%" }}>
        <FlatList
          data={counsellings}
          renderItem={({ item, index }) => {
            return (
              <CustomListItem key={index} date={item.date} value={item.value} />
            );
          }}
          keyExtractor={(index) => index + ""}
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
