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
import ListItem from "../ListItem";
import { TouchableHighlight } from "react-native-gesture-handler";
import { List } from 'react-native-paper';
import { Icon } from "react-native-elements";
import moment from "moment";

const Dashboard_Details = ({ navigation, route }) => {
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(
      `${BASE_URL}/student/${route.params.studentIndex}/${route.params.id}`,
      {
        method: "GET",
      }
    )
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
    <View style={styles.container}>
      <View
        style={{
          height: 75,
          backgroundColor: route.params.colorDetail,
          flexDirection: "row",
          elevation: 10,
        }}
      >
        <TouchableHighlight>
          <View style={styles.header}>
            <Ionicons
              name="md-arrow-back"
              size={32}
              color={"#ffffff"}
              onPress={() => {
                //swap back the dashboard content back
                navigation.navigate("home");
              }}
            />
            <Text style={{ fontSize: 32 }}></Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.header}>{route.params.titleScreen}</Text>
      </View>

      <View style={{ height: 680, marginHorizontal: 12 }}>
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
            return <List.Item
            id={item.id}  
            title={moment(item.title).format("dddd, MMM DD YYYY")}
            description={route.params.titleScreen}
            left={props => <Icon name={route.params.icon} type={route.params.type} iconStyle={{color:"grey", marginTop:10}}/>}
            right={props => <Text style={{marginTop: "8%", color:"grey"}}>{item.value}</Text>}
          />
          }}
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
    //this only works in android .. find out iOS version
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "#ffffff",
  },
});

export default Dashboard_Details;
