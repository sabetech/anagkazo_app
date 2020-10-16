import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, TouchableHighlight, FlatList, TextInput, Dimensions} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { List, Checkbox, Snackbar } from 'react-native-paper';
import { BASE_URL } from "../../config/index";
import InfoCard from "../../components/Helpers/InfoCard";
import { Overlay,Input, Button } from 'react-native-elements';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";


export default function UnderstandingCampaign({ navigation, route }) {
    
    const [ucPassed, setUCpassed] = useState([]);
    const [studentIndex, setStudentIndex] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [showCalender, setshowCalender] = useState(false);
    const [dateVal, setMyDate] = useState("");
    const [scoreVal, setScoreVal] = useState(0);
    const [dateTaken, setDateTaken] = useState("");
    const [uc_school_id, setUC_school_id] = useState(0);
    const [uc_school_name, setUC_school_name] = useState("");
    const [visible, setVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
      };

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    
    const onDateChange = (event, selectedDate) => {
        setshowCalender(false);
        const currentDate = selectedDate || date;
        setDateTaken(moment(currentDate).format("YYYY-MM-DD"));
        setMyDate(moment(currentDate).format("dddd, MMM DD YYYY"));
    };

    const showcalender = () => {
        setshowCalender(true);
    }

    const onChangeText = (text) => {
      setScoreVal(text)
    }

    const onSubmit = (score) => {
      setOverlayVisible(false);
      postUCupdate(uc_school_id, score, dateTaken);
    }

    useEffect(() => {
        
        AsyncStorage.getItem("student_index").then((res) => {
          setStudentIndex(res);
          getAllStudentSatResources(res);
          
        });
      }, []);

      const getAllStudentSatResources = (studentIndex) => {
        fetch(`${BASE_URL}/student/${studentIndex}/understandingcampaignbundle`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {            
            setUCpassed(responseJson);
            setRefreshing(false);
          })
          .catch((error) => {
            alert("An error occured. Check for internet connection")
          });
      };

      const handleRefresh = () => {
        setRefreshing(true);
        getAllStudentSatResources(studentIndex);
      }

      const postUCupdate = (uc_school_id, score, date_taken) => {
        fetch(`${BASE_URL}/student/${studentIndex}/understandingcampaign`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {
                    uc_school_id: uc_school_id,
                    score:score,
                    date:date_taken
                }
              ),
            })
            .then((response) => response.json())
            .then((responseJson) => {     
                onToggleSnackBar()
                setUCpassed(responseJson);
                setRefreshing(false);
            })
            .catch((error) => {
              alert("An error occured. Check for internet connection")
            });
        
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
            <Text style={styles.header}>Servants Armed And Trained</Text>
          </View>
          <View style={{ height: "90%" }}>
          <InfoCard
          infoText="Tap the respective Understanding Campaign School to update your score"
          colorDetail={route.params.tileColor}
        />
                <FlatList
                data={ucPassed}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                      title={item.uc_school_name}
                      description={`Score:${item.score}`}
                      left={props => <List.Icon {...props} icon="folder" />}
                      right={props =>(<Checkbox.IOS label="Item" status={(item.passed) ? "checked":"unchecked"} color={route.params.tileColor} />)
                        }

                      onPress={(()=>{
                        toggleOverlay();
                        setUC_school_id(item.id);
                        setScoreVal(item.score);
                        setUC_school_name(item.uc_school_name);
                      })}
                    />
                    )
                }}
                keyExtractor={(item) => item.id + ""}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                />
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={1000}
                action={{
                    label: 'close',
                    onPress: () => setVisible(false)
                    
                }}>
                Success: You have Updated your Understanding Campaign Scores!
            </Snackbar>

            <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} >
                <View style={{width:Dimensions.get('screen').width - 50}}>
                    <Text>Select the date you wrote {uc_school_name}</Text>
                
                    <Input
                        editable={false}
                        placeholder="<- Click to choose Date Taken"
                        leftIcon={{ type: "font-awesome", name: "calendar", onPress: showcalender }}
                        value={dateVal}
                        />
                      <Text>Enter Your Score!</Text>
                      <TextInput
                        style={{ height: 40, borderBottomWidth:0.5, borderBottomColor:"grey",marginBottom:10 }}
                        onChangeText={text => onChangeText(text)}
                        value={scoreVal+""}
                        keyboardType={"numeric"}
                      />
                      <Button title="Submit"
                            onPress={(()=>onSubmit(scoreVal))}/>

                </View>

            </Overlay>
            
            {showCalender && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            display="default"
            onChange={onDateChange}
          />
        )}


          </View>
          )

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