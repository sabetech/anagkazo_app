import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import MyActionButton from "../../components/MyActionButton";
import { ListItem } from "react-native-elements";
import PrayerSummary from "../../components/Prayer/PrayerSummary";
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_URL } from "../../config/index";
import AsyncStorage from "@react-native-community/async-storage";

const PrayerLog = ({ navigation }) => {
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getPrayerTimes(res);
    });
  }, []);

  const getPrayerTimes = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/prayer`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setPrayerTimes(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderItem = (item) => (
    <ListItem bottomDivider>
      <Avatar
        title={item.name[0]}
        source={item.avatar_url && { uri: item.avatar_url }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableHighlight>
          <View style={styles.header}>
            <FontAwesome5
              name="bars"
              size={28}
              color={"#ffffff"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </View>
        </TouchableHighlight>
        <Text style={styles.header}>Prayer Log</Text>
      </View>
      <View style={styles.prayerStatus}>
        <PrayerSummary numberOfHoursPrayed={2} />
      </View>
      <View>
        <FlatList
          data={prayerTimes}
          renderItem={renderItem({ item })}
          keyExtractor={(item) => item.id + ""}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#03A9F4",
    flexDirection: "row",
    elevation: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 32,
    marginLeft: 15,
    color: "white",
  },
  attendanceList: {
    height: "90%",
  },
  prayerStatus: {
    height: "20%",
    borderColor: "green",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default PrayerLog;
