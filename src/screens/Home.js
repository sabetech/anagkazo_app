import React, {useEffect, useState} from "react";
import {View, ActivityIndicator, StyleSheet, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeProfile from "../components/Profile/HomeProfile";
import { BASE_URL } from "../config/index";

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { ImageBackground } from "react-native";
import profileStyles from "../components/Profile/ProfileStyle";

const styles = StyleSheet.create({ ...profileStyles });
const Home = ({route, navigation}) => {

    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [index_number, set_index_number] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState("");
    
    useEffect(() => {
        
        getDashboardData(route.params.studentIndex);
        registerForPushNotificationsAsync();
        
    },[]);

    useEffect(() => {
        if (expoPushToken === "") return;

        submitNotificationToken();

    }, [expoPushToken]);

    const getDashboardData = async (studentIndex) => {
        setLoading(true);
        set_index_number(studentIndex);
        fetch(`${BASE_URL}/student/${studentIndex}/get_dashboard_values`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((responseJson) => {
              
              if (responseJson.status === 'failed') throw new Error('Student Don\'t exist');

              setStudentInfo(responseJson);
              setLoading(false);
              setLoaded(true);
              
            }).catch((error) => {
              Alert.alert("Error", "Fetching Student Info Did not complete. It may be that the student is no longer a student!",
                [
                  { text: "OK", 
                    onPress: () => AsyncStorage.removeItem("student_index").then(() => {
                      navigation.navigate("login");
                    }) 
                  }
                ]            
              )
            });
    }

    const submitNotificationToken = async () => {
        if (expoPushToken === "") return;
        console.log(expoPushToken);
        const response = await fetch(`${BASE_URL}/student/notification_token`, {
          method: "POST", 
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              index_number:index_number,
              device_token:expoPushToken
            }
          )}
        );
    }

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          setExpoPushToken(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    };

    return (
        <View>
          <ImageBackground 
              source={require('../res/imgs/geometry.jpg')}
              style={styles.dashboardBackground} />
            {
                loaded ? (
                    <HomeProfile studentInfo={studentInfo} />
                ) 
                : 
                (<ActivityIndicator 
                    size="large"
                    color="darkblue"
                    style={{flex: 1, 'justifyContent': 'center'}}/>)
            }
            
        </View>

    )   
};

export default Home;
