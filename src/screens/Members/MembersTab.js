import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Members from "./Members";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MembersAttn from "./MembersAttn";

const Tab = createMaterialBottomTabNavigator();

export default function MembersTabs() {

    return (
        <Tab.Navigator initialRouteName="Members" activeColor="white" labeled={true} >
            <Tab.Screen
                name="Members"
                component={Members}
                options={{
                    tabBarLabel: "Members",
                    tabBarIcon: ({ color }) => (
                    <FontAwesome5
                        name="users"
                        color={color}
                        size={20}
                    />
                    ),
                    tabBarColor:"#067E6B"
                }}
                />
            <Tab.Screen
                name="Members Attendance"
                component={MembersAttn}
                options={{
                    tabBarLabel: "Members Attendance",
                    tabBarIcon: ({ color }) => (
                    <FontAwesome5
                        name="user-check"
                        color={color}
                        size={20}
                    />
                    ),
                    tabBarColor:"#067E6B"
                }}
                />
        </Tab.Navigator>
    );
}