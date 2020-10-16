import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../../config/index";
import ContactCounsellingItem from "../../components/Members/ContactCounsellingItem";
import moment from "moment";

//get members from here
export default function SheepSeekingDetail({ navigation, route }) {
  const [visitedPeople, setVisitedPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("student_index").then((res) => {
        getVisitedPeople(res);
    });
  }, []);

  const getVisitedPeople = (myStudentIndex) => {
    fetch(
      `${BASE_URL}/student/${myStudentIndex}/sheepseeking/${route.params.date}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setVisitedPeople(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor:route.params.topBarColor}]}>
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
            <Text style={styles.header}>Visited on {moment(route.params.date).format("ddd, MMM DD YYYY")}</Text>
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
          data={visitedPeople}
          renderItem={({ item }) => {
            return (
                <ContactCounsellingItem name={item.name} description={""} photo_url={item.photo_url} />
            );
          }}
          keyExtractor={(item) => item.id + ""}
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
