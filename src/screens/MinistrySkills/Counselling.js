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
import { List } from 'react-native-paper';
import MyActionButton from "../../components/MyActionButton";
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';

//get members from here
export default function Counselling({ navigation, route }) {
  const [counsellings, setCounsellings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
      getCounsellings(res);
    });
  }, [isFocused]);

  const getCounsellings = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/counselling`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setCounsellings(responseJson);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getCounsellings(studentIndex);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor:route.params.tileColor}]}>
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
            return <List.Item
                      title={moment(item.date).format("dddd, MMM DD YYYY")}
                      left={props => <List.Icon {...props} icon="folder" />}
                      right={props => <Text style={{marginTop:10, fontSize:18, paddingRight:10}}>{item.value}</Text>}
                      onPress={(()=> navigation.navigate("counselling_detail", {
                        topBarColor:route.params.tileColor,
                        date:item.date
                      }))}
                    />
          }}
          keyExtractor={(item) => item.date + ""}
          refreshing={refreshing}
          onRefresh={handleRefresh}
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
