import React, {useState, useEffect} from "react";
import {Alert, View} from "react-native";
import { Chip } from 'react-native-elements';
import ActivityRings from "react-native-activity-rings";
import { Divider, Title } from 'react-native-paper';
import { BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProgressMinistrySkillRing = ({name, skill}) => {
    
    const [progress, setProgress] = useState({
        month36: 0,
        month18: 0,
        month9: 0
    });

    useEffect(() => {
        
        AsyncStorage.getItem("student_index").then((res) => {
            getProgressMinistrySkill(res);
          });
      
          return () => {
            unmounted = true
          }

    }, []);

    const getProgressMinistrySkill = (studentIndex) => {
        fetch(`${BASE_URL}/student/${studentIndex}/getStudentProgress?skill=${name}`, 
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            setProgress({...progress, 
                                        month36:responseJson.original.progress36,
                                        month18:responseJson.original.progress18,
                                        month9:responseJson.original.progress9            
                        });
        }).catch((e) => {
            Alert.alert("Error", "Check your Internet Connection");
        });
    }

    const activityData = [ 
        { 
            label: "36 months",
            value: progress.month36,
            color: "#c800ff"
        }, 
        { 
            label: "18 months",
            value: progress.month18 ,
        }, 
        { 
            label: "9 months",
            value: progress.month9 
        }
      ];
      
      const activityConfig = { 
        width: 170,  
        height: 170
        
      };
    return (
        <View>
            <Title style={{marginLeft: 20}}>{skill}</Title>
            <ActivityRings 
                theme={"light"} 
                legend={true} 
                legendTitle={"Awesome"} 
                data={activityData} 
                config={activityConfig} 
            />
            <Divider />
        </View>
    );
}

export default ProgressMinistrySkillRing;