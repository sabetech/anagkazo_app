import React, {useEffect, useState} from "react";
import {View, ActivityIndicator} from "react-native";
import Profile from "../components/Profile/ProfileCard";
import HomeProfile from "../components/Profile/HomeProfile";
import { BASE_URL } from "../config/index";



const Home = ({route, navigation}) => {

    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(false);    
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        console.log(route);
        getDashboardData(route.params.studentIndex);
        
    },[]);

    const getDashboardData = async (studentIndex) => {
        setLoading(true);
        fetch(`${BASE_URL}/student/${studentIndex}/get_dashboard_values`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((responseJson) => {
              
              setStudentInfo(responseJson);
              setLoading(false);
              setLoaded(true);
              

            }).catch((error) => {
              console.error(error);
            });

    }

    return (
        <View>
            {
                loaded ? (
                    <HomeProfile studentInfo={studentInfo} />
                ) 
                : 
                (<ActivityIndicator 
                    size="large"
                    color="darkblue"
                    style={{flex: 1, alignItems: 'center', 'justifyContent': 'space-around'}}/>)
            }
        </View>

    )   
};

export default Home;
