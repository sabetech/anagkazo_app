import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { BASE_URL } from "../../config";
import { Ionicons } from "@expo/vector-icons";
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
            title={<Text style={{fontSize: 20}}> {moment(item.title).format("dddd, MMM DD YYYY")}</Text>}
            left={props => <Icon name={route.params.icon} type={route.params.type} iconStyle={{color:"grey", marginTop:8}}/>}
            right={props => <Text style={{fontSize: 20, color:"grey", marginTop: 6}}>{item.value}</Text>}
          />
          }}
          keyExtractor={(item) => item.id + ""}
        />
        
      </View>
        {  
          route.params.id === 2 ?
          (<MyActionButton icon="md-add" navigateTo={"prayer_log_add"} topBarColor={"#DB4437"}/>) : null

        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {

  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "#ffffff",
  },
});

export default Dashboard_Details;
