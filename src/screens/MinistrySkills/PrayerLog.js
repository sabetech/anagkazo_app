import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator, 
  Alert
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../../config/index";
import { List, Headline } from 'react-native-paper';
import { Icon } from "react-native-elements";
import MyActionButton from "../../components/MyActionButton";
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';

//get members from here
export default function PrayerLog({ navigation, route }) {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
      getPrayers(res);
    });
  }, [isFocused]);

  const getPrayers = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/prayer`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {

        setLoading(false);
        setPrayers(responseJson);
        setRefreshing(false);
      })
      .catch((error) => {
        handleNoInternetError(error)
      });
  };

  const handleNoInternetError = (e) => {
    Alert.alert(
      "Failure",
      "There is no internet connection " + e.message(),
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }


  const handleRefresh = () => {
    setRefreshing(true);
    getPrayers(studentIndex);
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
        <Text style={styles.header}>Prayer Log</Text>
      </View>
      <View style={{ height: "90%" }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}

        <Headline style={{textAlign:'center', marginTop:30}}>
            Total Hours Prayer:{prayers.totalHoursPrayed}
        </Headline>

        <FlatList
          data={prayers.prayerList}
          renderItem={({ item, index }) => {
            return <List.Item
                      title={moment(item.date_prayed).format("dddd, MMM DD YYYY")}
                      left={props => <Icon name={"praying-hands"} type={"font-awesome-5"} size={18} iconStyle={{color:"grey", marginTop:10, paddingRight:20}}/>}
                      right={props => <Text style={{marginTop:10, fontSize:18, paddingRight:10}}>{item.number_of_hours} hrs</Text>}
                    />
          }}
          keyExtractor={(item) => item.id + ""}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
      <MyActionButton icon="md-add" navigateTo="prayer_log_add" topBarColor={route.params.tileColor}/>
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
