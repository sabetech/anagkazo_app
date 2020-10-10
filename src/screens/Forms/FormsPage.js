import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import MenuCard from "../../components/Forms/MenuCard";
import FormMenu from "../../backend/ministry_skills_forms_menu.json";
import { ScrollView } from "react-native-gesture-handler";

export default function FormsPage({ navigation }) {
  const detailColor = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableHighlight>
          <View style={styles.header}>
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
        </TouchableHighlight>
        <Text style={styles.header}>Ministry Skills</Text>
      </View>
      <ScrollView>
        <View style={styles.menuList}>
          {FormMenu.map((menuItem, index) => (
            <MenuCard
              key={index}
              title={menuItem.title}
              cardBorderColor={detailColor[index % 4]}
              destinationScreen={menuItem.destinationScreen}
              icon={menuItem.icon}
              iconType={menuItem.iconType}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    elevation: 5, //this only works in android .. find out iOS version
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "white",
  },
  menuList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
});
