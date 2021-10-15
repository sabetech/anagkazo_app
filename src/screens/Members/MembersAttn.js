import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableHighlight, TextInput, Dimensions
  } from "react-native";
import { Surface, Text } from 'react-native-paper';
import { Icon } from "react-native-elements";
import { BASE_URL } from "../../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {Picker} from '@react-native-community/picker';
import { Alert } from "react-native";
import { FlatList } from "react-native";
import MemberAttnListItem from "./MemberAttnListItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Divider } from 'react-native-elements';

export default function MembersAttn({ navigation }) {
    const [studentMembersAttn, setStudentMembersAttn] = useState([]);
    const [studentIndex, setStudentIndex] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pickerVal, setPickerVal] = useState("");
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [events, setMembersEvent] = useState([]);

    let unmounted = false;

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => {
        setVisible(false);
    }

    useEffect(() => {
        
      if (unmounted) return;
      
      AsyncStorage.getItem('student_index').then((studentIndex_Value) => {
        getMembersEvent();
        setStudentIndex(studentIndex_Value);
        getMembersAttn(studentIndex_Value);
      });        
    
    }, [pickerVal, dateValue]);

    const onDateChange = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate;
      setDateValue(moment(currentDate).format("YYYY-MM-DD"));
    };

    const handleRefresh = () => {
        setRefreshing(true);
        getMembersAttn(studentIndex);
    }

    const getMembersEvent = () => {
      fetch(`${BASE_URL}/student/member_events/get`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          let arrayOfEvents = Object.keys(responseJson).map(item => ({value: item, label:responseJson[item]}));
          setMembersEvent(arrayOfEvents);
          setPickerVal(arrayOfEvents[0].value)
        }).catch((e) => Alert.alert("Error " +e.message()));
    }

    const getMembersAttn = (studentIndex) => {
      if (!pickerVal) return;
      if (!dateValue) return;

        fetch(`${BASE_URL}/student/${studentIndex}/membersAttn?date=${dateValue}&event=${pickerVal}`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (unmounted) return;
              setStudentMembersAttn(responseJson);
              setRefreshing(false);
            })
            .catch((error) => {
              alert("check your internet connection."+error);
            });
    }

    const markAttn = (rowMap, id, attnStatus) => {
      fetch(`${BASE_URL}/student/${studentIndex}/members/markAttendance`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            status: attnStatus,
            event: pickerVal,
            date: dateValue,
            member_id: id
        }
        )
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (unmounted) return;

        let memberIndex = studentMembersAttn.findIndex(item => item.member_id == responseJson.payload.data.member_id);
        
        let studentMembersAttn_Copy = [...studentMembersAttn];
        studentMembersAttn_Copy.splice(memberIndex, 1, responseJson.payload.data);
        setStudentMembersAttn(studentMembersAttn_Copy);
        
        rowMap[id].closeRow();
      })
    }

    const makePresent = (rowMap, id) => {

      markAttn(rowMap, id, 1);
    }

    const makeAbsent = (rowMap, id) => {
      markAttn(rowMap, id, 0);
    }

    const resetAttn = (rowMap, id) => {
      markAttn(rowMap, id, -1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableHighlight>
                    <View style={styles.header}>
                        <Icon
                        name="menu"
                        size={28}
                        type="feather"
                        color={"#ffffff"}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                        />
                    </View>
                </TouchableHighlight>
                <Text style={styles.header}>Members Attendance</Text>
            </View>
            
            <View>
                <Surface style={styles.surface}>
                  <Text style={{fontSize: 18}}>Choose Service</Text>
                  <Picker
                    selectedValue={pickerVal}
                    style={{height: 50, textAlign: 'center', alignItems: 'center',justifyContent: 'center',width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>
                      setPickerVal(itemValue)
                    }
                    >
                      {
                        events.map((item, i) => <Picker.Item style={{alignSelf:'center'}}key={i} label={item.label} value={item.value} />)
                      }
                  </Picker>
                  
                  <Divider orientation="horizontal" />

                  <Text style={{fontSize: 18}}>Select Date: {dateValue && moment(dateValue).format("MMM-DD-YYYY")}</Text>
                  <TouchableHighlight onPress={() => setShow(true)} >
                    <TextInput 
                      style={styles.dateTextInput}
                      editable={false}
                      value={dateValue}
                    />
                </TouchableHighlight>
              </Surface> 
              </View>
              <View style={{flex: 1}}>
              <SwipeListView
                  disableRightSwipe={false}
                  data={studentMembersAttn}
                  renderItem={({ item }) => {
                    return (
                      <MemberAttnListItem key={item.member_id} index={item.member_id} name={item.member_name} photo_url={item.photo_url} attn_status={item.is_present}/>
                    );
                  }}
                  keyExtractor={(item) => item.member_id + ""}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableHighlight
                          style={[styles.presentMemberStyle]}
                          onPress={() => makePresent(rowMap, data.item.member_id)}
                        >
                        <Text >Present</Text> 
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            onPress={() => resetAttn(rowMap, data.item.member_id)}
                        >
                            <Text style={styles.backTextWhite}>Reset</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                          style={[styles.backRightBtn, styles.backRightBtnRight]}
                          onPress={() => makeAbsent(rowMap, data.item.member_id)}
                        >
                        <Text style={styles.backTextWhite}>Absent</Text>
                      </TouchableHighlight>
                    </View>
                )}
                
                rightOpenValue={-150}
                leftOpenValue={75}
                previewOpenValue={-40}
                previewOpenDelay={3000}
        />

              </View>
          
            
      {show && (
        <DateTimePicker
          value={new Date()}
          mode={"date"}
          display="default"
          onChange={onDateChange}
        />
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      height: 75,
      backgroundColor: "#694fad",
      flexDirection: "row",
      elevation: 10,
    },
    header: {
      fontSize: 21,
      marginTop: 32,
      marginLeft: 15,
      color: "#ffffff",
    },
    surface: {
      padding: 8,
      height: 150,
      width: Dimensions.get("window").width,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 4,
    },
    dateTextInput:{ 
      width: 200, 
      borderColor: 'gray', 
      borderWidth: 1 ,
      textAlign: 'center'
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
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
  backTextWhite: {
    color: '#FFF'
  },
  presentMemberStyle: {
    backgroundColor: "#47ff3d",
    justifyContent: 'center',
    width: 75,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  }

}
);