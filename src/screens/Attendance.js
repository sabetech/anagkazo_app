import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import FLOWPrayer_Screen from "./Attendance_Screens/FLOWPrayer_Screen";
import PropheticEncounter_Screen from "./Attendance_Screens/PropheticEncounter_Screen";
import AnagkazoLive_Screen from "./Attendance_Screens/AnagkazoLive_Screen";
import OtherServices_Screen from "./Attendance_Screens/OtherServices_Screen";
import CenterService_Screen from "./Attendance_Screens/CenterService_Screen";

const Tab = createMaterialBottomTabNavigator();

export default function AttendanceTabs() {
  return (
    <Tab.Navigator initialRouteName="FLOWPrayer_Screen" activeColor="white" labeled={true} >
      <Tab.Screen
      
        name="FLOWPrayer_Screen"
        component={FLOWPrayer_Screen}
        options={{
          tabBarLabel: "FLOW Prayer",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="praying-hands"
              color={color}
              size={20}
            />
          ),
          tabBarColor:"#4285F4"
        }}
      />
      <Tab.Screen
        name="PropheticEncounter_Screen"
        component={PropheticEncounter_Screen}
        options={{
          tabBarLabel: "Prophetic Encounter",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="church" color={color} size={26} />
          ),
          tabBarColor:"#4F0F97"
        }}
      />
      <Tab.Screen
        name="AnagkazoLive_Screen"
        component={AnagkazoLive_Screen}
        options={{
          tabBarLabel: "Anagkazo Live",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="access-point"
              color={color}
              size={26}
            />
          ),
          tabBarColor: "#067E6B"
        }}
      />

      <Tab.Screen
        name="CenterSerivice_Screen"
        component={CenterService_Screen}
        options={{
          tabBarLabel: "Center Service",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="church"
              color={color}
              size={26}
            />
          ),
          tabBarColor: "#12BDA7"
        }}
      />



      <Tab.Screen
        name="OtherServices_Screen"
        component={OtherServices_Screen}
        options={{
          tabBarLabel: "Special Events",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
          tabBarColor: "#DB4437"
        }}
      />
    </Tab.Navigator>
  );
}
