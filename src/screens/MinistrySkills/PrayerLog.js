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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/index";
import { List, Headline } from 'react-native-paper';
import { Icon } from "react-native-elements";
import MyActionButton from "../../components/MyActionButton";
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

//get members from here
export default function PrayerLog({ navigation, route }) {
  const [prayers, setPrayers] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  let unmounted = false;
  const isFocused = useIsFocused();

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
    setVisible(false);
  }

  useEffect(() => {
    
    if (unmounted) return;
    
    setLoading(true);
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
      getPrayers(res);
    });

    return () => {
      unmounted = true;
    }
  }, [isFocused]);

  const getPrayers = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/prayer`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        if (unmounted) return;
        setLoading(false);
        setPrayers(responseJson);
        setRefreshing(false);
      })
      .catch((error) => {
        handleNoInternetError(error)
      });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const afterBurnPrayers = prayers.prayerList.filter(item => item.id != rowKey);
    setPrayers({...prayers, prayerList: afterBurnPrayers});

    deletePrayerLog(rowKey);
  }

  const deletePrayerLog = (prayer_log_id) => {
    fetch(`${BASE_URL}/student/${studentIndex}/prayer_log/${prayer_log_id}/delete`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        onToggleSnackBar();
      })
      .catch((error) => {
        alert("Check your internet connection!");
        console.log(error);
      });
  }



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

        <SwipeListView
          disableRightSwipe={true}
          data={prayers.prayerList}
          renderItem={({ item }) => {
            return (
              <List.Item
                      style={{backgroundColor: 'white'}}
                      title={moment(item.date_prayed).format("dddd, MMM DD YYYY")}
                      left={props => <Icon name={"praying-hands"} type={"font-awesome-5"} size={18} iconStyle={{color:"grey", marginTop:10, paddingRight:20}}/>}
                      right={props => <Text style={{marginTop:10, fontSize:18, paddingRight:10}}>{item.number_of_hours} hrs</Text>}
                    />
            );
          }}
          keyExtractor={(item) => item.id + ""}
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableHighlight
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableHighlight>
            </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        rightOpenValue={-75}
        leftOpenValue={0}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        
        />  


        {/* <FlatList
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
        />*/}
      </View> 
      <MyActionButton icon="md-add" navigateTo="prayer_log_add" topBarColor={route.params.tileColor}/>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
            },
        }}
        >
        Success: You have delete your prayer log successfullly
      </Snackbar>
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
  backTextWhite: {
    color: '#FFF',
  },
rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
},
rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
}
});
