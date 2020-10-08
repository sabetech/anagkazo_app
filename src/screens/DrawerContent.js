import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../config/index";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

export function DrawerContent(props) {
  //
  const [myIndexNumber, setIndexNumber] = useState();
  const [myStudentName, setStudentName] = useState();
  const [myClass, setStudentClass] = useState();

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((index_number) => {
      fetch(`${BASE_URL}/student/${index_number}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setIndexNumber(responseJson.index_number);
          setStudentName(responseJson.name);
          setStudentClass(responseJson.class);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar.Image
                source={{
                  uri: `http://anagkazo.firstlovegallery.com/storage/student_photo/${myIndexNumber}.JPG`,
                }}
                size={75}
              />
              <View>
                <Title style={styles.title}>{myStudentName}</Title>
                <Caption style={styles.caption}>{myClass}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("home");
              }}
            />
            <DrawerItem
              label="Profile"
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="face" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("profile");
              }}
            />
            <DrawerItem
              label="Members"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-group"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("members");
              }}
            />
            <DrawerItem
              label="Attendance"
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="barcode-scan"
                  color={color}
                  size={size}
                />
              )}
              onPress={() => {
                props.navigation.navigate("attendance");
              }}
            />
            <DrawerItem
              label="Ministry Skills"
              icon={({ color, size }) => (
                <FontAwesome name="wpforms" size={size} color={color} />
              )}
              onPress={() => {
                props.navigation.navigate("forms_page");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          onPress={() => {
            AsyncStorage.removeItem("student_index").then(() => {
              props.navigation.navigate("login");
            });
          }}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
  },
  caption: {
    fontSize: 15,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});
