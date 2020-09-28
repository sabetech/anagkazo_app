import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import FLOWPrayer_Screen from "./Attendance_Screens/FLOWPrayer_Screen";
import PropheticEncounter_Screen from "./Attendance_Screens/PropheticEncounter_Screen";
import AnagkazoLive_Screen from "./Attendance_Screens/AnagkazoLive_Screen";
import OtherServices_Screen from "./Attendance_Screens/OtherServices_Screen";

const Tab = createMaterialBottomTabNavigator();

export default function AttendanceTabs() {
  return (
    <Tab.Navigator
      initialRouteName="FLOWPrayer_Screen"
      activeColor="white"
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="FLOWPrayer_Screen"
        component={FLOWPrayer_Screen}
        options={{
          tabBarLabel: "FLOW Prayer",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="flash-on" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PropheticEncounter_Screen"
        component={PropheticEncounter_Screen}
        options={{
          tabBarLabel: "Prophetic Encounter",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="toys" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AnagkazoLive_Screen"
        component={AnagkazoLive_Screen}
        options={{
          tabBarLabel: "Anagkazo Live",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="straighten" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="OtherServices_Screen"
        component={OtherServices_Screen}
        options={{
          tabBarLabel: "Special Events",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="streetview" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
