import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import Home from "./src/screens/Home";
import { AuthContext } from "./src/contexts/AuthContext";
import Profile from "./src/screens/Profile";
import Members from "./src/screens/Members/Members";
import MembersAdd from "./src/screens/Members/MembersAdd";
import MemberDetail from "./src/screens/Members/Member_Detail";

import Basonta from "./src/screens/MinistrySkills/Basonta";

import Attendance from "./src/screens/Attendance";
import QR_code_scanner from "./src/screens/Attendance_Screens/QR_code_scanner";
import DashboardDetail from "./src/screens/Dashboard/Dashboard-detail";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "./src/config/index";
import { DrawerContent } from "./src/screens/DrawerContent";
import Counselling from "./src/screens/MinistrySkills/Counselling";
import FormsPage from "./src/screens/Forms/FormsPage";
import SheepSeeking from "./src/screens/MinistrySkills/SheepSeeking";
import SheepSeeking_add from "./src/screens/MinistrySkills/SheepSeeking_add";
import SheepSeekingDetail from "./src/screens/MinistrySkills/SheepSeekingDetail";
import Multiplication from "./src/screens/MinistrySkills/Multiplication";
import MultiplicationDetail from "./src/screens/MinistrySkills/MultiplicationDetail"
import Multiplication_add from "./src/screens/MinistrySkills/Multiplication_add";
import CounsellingDetail from "./src/screens/MinistrySkills/CounsellingDetail";
import Counselling_add from "./src/screens/MinistrySkills/Counselling_add";
import PrayerLog from "./src/screens/MinistrySkills/PrayerLog";
import PrayerLog_add from "./src/screens/MinistrySkills/PrayerLog_add";
import ServantsArmedTrained from "./src/screens/MinistrySkills/ServantsArmedTrained";
import UnderstandingCampaign from "./src/screens/MinistrySkills/UnderstandingCampaign";
import Bussing from "./src/screens/MinistrySkills/Bussing";
import { SignUp } from "./src/screens/SignUp";
import PastoralPointSummary from "./src/screens/PastoralPoints/PastoralPointSummary";
import PastoralPoint_Detail from "./src/screens/PastoralPoints/PastoralPoint_Detail";


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
      <Drawer.Screen name="pastoral_point_summary" component={PastoralPointSummary}></Drawer.Screen>
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
      .catch((e) => {
        setInitialRoute("login");
        console.log(e);
      });
  }, []);

  const auth = React.useMemo(() => ({
    login: async (index_number, passcode) => {
      try {
        const response = await fetch(`${BASE_URL}/student/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              index_number:index_number,
              passcode:passcode
          })
        });

        const responseJSON = await response.json();
        
        if (responseJSON[0] == "failed") {
          return false;
        }
        
        await AsyncStorage.setItem(
          "student_index",
          responseJSON.index_number.toString()
        );
        
        return true;


      } catch (error) {
        console.log(error);
        alert("Check your internet Connection");

      }
    },
    signUp: async (index_number, email) => {
      try {
        const response = await fetch(`${BASE_URL}/student/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              index_number:index_number,
              email:email
          })
        });

        const responseJSON = await response.json();
        
        console.log(responseJSON);
        
        if (responseJSON[0] == "failed") {
          return false;
        }

        return true;

      } catch (error) {

        alert("Check your internet Connection");

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
          <MyNavStack.Screen name="signup" component={SignUp}></MyNavStack.Screen>
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
            name="sheepseeking_detail"
            component={SheepSeekingDetail}
          ></MyNavStack.Screen>


          <MyNavStack.Screen
            name="sheepseeking_add"
            component={SheepSeeking_add}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
            name="multiplication"
            component={Multiplication}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="multiplication_detail"
            component={MultiplicationDetail}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="multiplication_add"
            component={Multiplication_add}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
            name="prayer_log"
            component={PrayerLog}
          ></MyNavStack.Screen>
          <MyNavStack.Screen
            name="prayer_log_add"
            component={PrayerLog_add}
          ></MyNavStack.Screen>
          
          <MyNavStack.Screen
            name="servants_armed_trained"
            component={ServantsArmedTrained}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
            name="understanding_campaign"
            component={UnderstandingCampaign}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
            name="bussing"
            component={Bussing}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
            name="members_add"
            component={MembersAdd}
          ></MyNavStack.Screen>

          <MyNavStack.Screen 
          name="member_detail"
          component={MemberDetail}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
          name="member_basonta"
          component={Basonta}
          ></MyNavStack.Screen>

          <MyNavStack.Screen
          name="pastoralpoint_detail"
          component={PastoralPoint_Detail}
          ></MyNavStack.Screen>
          
        </MyNavStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
SheepSeeking_add
