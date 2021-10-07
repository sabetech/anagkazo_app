import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Members from "./Members";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MembersAttn from "./MembersAttn";
import MembersToCallVisit from "./MembersToCallVisit";
import MembersOutstandingPrayer from "./MembersOutstandingPrayer";

const Tab = createMaterialBottomTabNavigator();

export default function MembersTabs() {

    return (
        <Tab.Navigator initialRouteName="Members" activeColor="white" shifting={true} barStyle={{ backgroundColor: '#694fad' }} >
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
                    )
                    
                }}
                />
            <Tab.Screen
                name="Members Attendance"
                component={MembersAttn}
                options={{
                    tabBarLabel: "Members Attn.",
                    tabBarIcon: ({ color }) => (
                    <FontAwesome5
                        name="user-check"
                        color={color}
                        size={20}
                    />
                    )
                }}
                />
            <Tab.Screen
                name="Members to Call/Visit"
                component={MembersToCallVisit}
                options={{
                    tabBarLabel: "Call/Visit",
                    tabBarIcon: ({ color }) => (
                    <FontAwesome5
                        name="user-times"
                        color={color}
                        size={20}
                    />
                    )
                }}
                />
            <Tab.Screen
                name="Members to Pray For"
                component={MembersOutstandingPrayer}
                options={{
                    tabBarLabel: "Prayers",
                    tabBarIcon: ({ color }) => (
                    <FontAwesome5
                        name="pray"
                        color={color}
                        size={20}
                    />
                    )
                }}
                />
        </Tab.Navigator>
    );
}