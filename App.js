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
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "./src/config/index";
import { DrawerContent } from "./src/screens/DrawerContent";

const MyNavStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      //screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
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
    login: async (index_number) => {
      try {
        const response = await fetch(`${BASE_URL}/student/${index_number}`, {
          method: "GET",
        });

        const studentJson = await response.json();

        if (studentJson[0] == "failed") {
          return false;
        }

        await AsyncStorage.setItem(
          "student_index",
          studentJson.index_number.toString()
        );
        return true;
      } catch (error) {
        console.log(error);
      }
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
