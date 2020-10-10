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
import CustomListItem from "../../components/CustomListComponent/CustomListItem";
import MyActionButton from "../../components/MyActionButton";

//get members from here
export default function Counselling({ navigation }) {
  const [counsellings, setCounsellings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}
        <FlatList
          data={counsellings}
          renderItem={({ item, index }) => {
            return <CustomListItem date={item.date} value={item.value} />;
          }}
          keyExtractor={(item) => item.date + ""}
        />
      </View>
      <MyActionButton icon="md-add" navigateTo="counselling_add" />
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
