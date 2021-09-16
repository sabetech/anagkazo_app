import React from "react";
import {View} from "react-native";
import { Chip } from 'react-native-elements';
import ActivityRings from "react-native-activity-rings";
import { Divider, Title } from 'react-native-paper';


const ProgressMinistrySkillRing = ({title}) => {
    const activityData = [ 
        { 
            label: "36 months",
            value: 0.7,
            color: "#c800ff"
        }, 
        { 
            label: "18 months",
            value: 0.6 ,
        }, 
        { 
            label: "9 months",
            value: 0.2 
        }
      ];
  
      const activityConfig = { 
        width: 170,  
        height: 170
        
      };
    return (
        <View>
            <Title style={{marginLeft: 20}}>{title}</Title>
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