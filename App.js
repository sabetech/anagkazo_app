import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import Home from "./src/screens/Home";
import { AuthContext } from "./src/contexts/AuthContext";
import Profile from "./src/screens/Profile";
import Members from "./src/screens/Members";
import Attendance from "./src/screens/Attendance";
import QR_code_scanner from "./src/screens/Attendance_Screens/QR_code_scanner";
import DashboardDetail from "./src/screens/Dashboard/Dashboard-detail";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "./src/config/index";
import { DrawerContent } from "./src/screens/DrawerContent";
import Counselling from "./src/screens/MinistrySkills/Counselling";
import FormsPage from "./src/screens/Forms/FormsPage";
import SheepSeeking from "./src/screens/MinistrySkills/SheepSeeking";
import Multiplication from "./src/screens/MinistrySkills/Multiplication";
import CounsellingDetail from "./src/screens/MinistrySkills/CounsellingDetail";
import Counselling_add from "./src/screens/MinistrySkills/Counselling_add";

const MyNavStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="profile" component={Profile}></Drawer.Screen>
      <Drawer.Screen name="members" component={Members}></Drawer.Screen>
      <Drawer.Screen name="attendance" component={Attendance}></Drawer.Screen>
      <Drawer.Screen name="forms_page" component={FormsPage}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState("login");
  useEffect(() => {
    AsyncStorage.getItem("student_index")
      .then(() => {
        setInitialRoute("home");
      })
      .catch(() => {
        setInitialRoute("login");
      });
  }, []);

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
          initialRouteName={initialRoute}
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
          <MyNavStack.Screen
            name="member_add"
            component={QR_code_scanner}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="dashboard-details"
            component={DashboardDetail}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="counselling"
            component={Counselling}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="counselling_detail"
            component={CounsellingDetail}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="counselling_add"
            component={Counselling_add}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="sheepseeking"
            component={SheepSeeking}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="multiplication"
            component={Multiplication}
          ></MyNavStack.Screen>
        </MyNavStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
