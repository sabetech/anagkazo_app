import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import Home from "./src/screens/Home";
import { AuthContext } from "./src/contexts/AuthContext";
import Profile_full from "./src/screens/Profile_full";
import Members from "./src/screens/Members";
import Attendance from "./src/screens/Attendance";
import QR_code_scanner from "./src/screens/Attendance_Screens/QR_code_scanner";

const MyNavStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="profile" component={Profile_full}></Drawer.Screen>
      <Drawer.Screen name="members" component={Members}></Drawer.Screen>
      <Drawer.Screen name="attendance" component={Attendance}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const auth = React.useMemo(() => ({
    login: (index_number) => {
      console.log("login", index_number);
      //async code goes here ..
    },
    detailsShown: {
      val: false,
    },
  }));

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <MyNavStack.Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <MyNavStack.Screen name="login" component={Login}></MyNavStack.Screen>
          <MyNavStack.Screen
            name="home"
            component={MainDrawer}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="qr_code_scanner"
            component={QR_code_scanner}
          ></MyNavStack.Screen>
        </MyNavStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
