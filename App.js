import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import Home from "./src/screens/Home";
import { AuthContext } from "./src/contexts/AuthContext";

const MyNavStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="profile" component={Home}></Drawer.Screen>
      <Drawer.Screen name="members" component={Home}></Drawer.Screen>
      <Drawer.Screen name="attendance" component={Home}></Drawer.Screen>
      <Drawer.Screen name="other" component={Home}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const auth = React.useMemo(() => ({
    login: (index_number) => {
      console.log("login", index_number);
      //async code goes here ..
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
        </MyNavStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
