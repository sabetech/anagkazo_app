import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { BASE_URL } from "../../config";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CardInfo from "./CardInfo";
import { TouchableHighlight } from "react-native-gesture-handler";

const Dashboard_Details = (props) => {
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/student/${props.studentIndex}/${props.fetchItem}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDashboardDetails(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ height: 475, marginHorizontal: 12 }}>
      <TouchableHighlight>
        <View style={styles.rightIcons}>
          <Ionicons
            name="md-arrow-back"
            size={32}
            color={"darkblue"}
            onPress={() => {
              //swap back the dashboard content back
              props.handler(false, 0);
            }}
          />
          <Text style={{ fontSize: 32 }}></Text>
        </View>
      </TouchableHighlight>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 10 }}
          size="large"
          color="darkblue"
        />
      ) : null}

      <FlatList
        data={dashboardDetails}
        renderItem={({ item }) => {
          return (
            <CardInfo
              id={item.id}
              title={item.title}
              value={item.value}
              extra_details={item.extra_details}
            />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightIcons: {
    marginTop: 5,
    width: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Dashboard_Details;
