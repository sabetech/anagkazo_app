import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const CustomListItem = ({ date, value }) => {
  const navigation = useNavigation();
  function showDetails() {
    navigation.navigate("counselling_detail", {
      date: date,
    });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        showDetails();
      }}
    >
      <View style={styles.mainContactItem}>
        <View style={styles.listItem}>
          <View style={styles.textRow}>
            <View style={styles.textColumn}>
              <Text style={styles.contacText}>
                {moment(date).format("dddd, MMM DD YYYY")}: {value}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  textColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contacText: {
    fontSize: 18,
    marginLeft: 20,
    paddingTop: 15,
  },
  callActionStyle: {
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 15,
    //justifyContent: "flex-end",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    borderBottomWidth: 0.5,
    borderWidth: 0,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: "17%",
    borderWidth: 3,
    height: "78%",
    borderRadius: 75,
    borderColor: "#FFF",
  },
  whatsappIcon: {},
});

export default CustomListItem;
