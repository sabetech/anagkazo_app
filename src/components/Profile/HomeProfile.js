import React, { useState, useEffect } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button } from 'react-native-elements';
import { TabBar } from "react-native-tab-view";

import profileStyles from "./ProfileStyle";
import DashboardCardList from "../HomeDashboard/DashboardCardList";
import MyActionButton from "../../components/MyActionButton";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({ ...profileStyles });

const HomeProfile = ({studentInfo}) => {
  const navigation = useNavigation();

    const renderContactHeader = () => {
        const { photo_url, name } = studentInfo;

        return (
          <View style={[styles.headerContainer, { elevation: 5 }]}>
            <View style={styles.coverContainer}>
              
              <ImageBackground
                source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
                style={styles.coverImage}
              >
                <View style={{fontSize: 21,
                              marginTop: 32,
                              marginLeft: 15,
                              alignSelf: 'flex-start',
                              color: "#ffffff",}}>
                    <Icon
                      name="menu"
                      size={28}
                      type="feather"
                      color={"#ffffff"}
                      onPress={() => {
                        navigation.toggleDrawer();
                      }}
                      
                    />
                </View>
                <View style={styles.coverTitleContainer}>
                  <Text style={styles.coverTitle} >{name}</Text>
                </View>
                <View style={styles.coverMetaContainer}>
                  <Text style={styles.coverName}>{studentInfo?.center?.center_name || "No Center Assigned!"}</Text>
                  <Text style={styles.coverBio}>
                    {studentInfo.class}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: "http://anagkazo.firstlovegallery.com/" + photo_url,
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={{marginTop: -55}}>
              <View style={{ flexDirection: 'row-reverse', }}>
                <View style={{padding: 5}}>
                    <Text>Members</Text>
                    <Button
                    title={studentInfo.memberCount.toString()}
                    type="clear"
                    onPress={() => navigation.navigate("members")}
                    />
                </View>
                <View style={{padding: 5}}>
                    <Text>Pastoral Points</Text>
                    <Button
                    title={studentInfo.pastoralPoint.toString()}
                    type="clear"
                    onPress={() => navigation.navigate("pastoral_point_summary")}
                    />
                </View>
              </View>
            </View>
          </View>
        );
    };

    renderTabBar = (props) => {
      return (
        <TabBar
          indicatorStyle={styles.indicatorTab}
          renderLabel={renderLabel(props)}
          pressOpacity={0.8}
          style={styles.tabBar}
          {...props}
        />
      );
    };
  
    const renderLabel = (props) => () => {
      return (
        <View style={styles.tabRow}>
          <Animated.Text style={styles.tabLabelNumber} >
            {route.count}
          </Animated.Text>
          <Animated.Text style={styles.tabLabelText}>
            {route.title}
          </Animated.Text>
        </View>
      );
    };

    
    return (
      <View >
        <View >
          {renderContactHeader()}
        </View>
        <DashboardCardList studentInfo={studentInfo} />
        <MyActionButton icon={"md-qr-scanner"} navigateTo={"qr_code_scanner"} />
      </View>
    );
}

export default HomeProfile;