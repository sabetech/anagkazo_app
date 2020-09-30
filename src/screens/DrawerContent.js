import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { BASE_URL } from "../config/index";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar.Image
                source={{
                  uri:
                    "http://anagkazo.firstlovegallery.com/storage/student_photo/700446.JPG",
                }}
                size={75}
              />
              <View>
                <Title style={styles.title}>Name of student here</Title>
                <Caption style={styles.caption}>Class goes here</Caption>
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
          onPress={() => {}}
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
    fontSize: 24,
    marginTop: 3,
    fontWeight: "bold",
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
