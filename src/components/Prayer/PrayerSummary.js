import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const PrayerSummary = ({ numberOfHoursPrayed }) => {
  return (
    <ImageBackground
      source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
      style={styles.image}
    >
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1.5, y: -0.6 }}
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0.6)"]}
        style={{
          padding: 15,
          height: 80,
          //borderRadius: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24 }}>
            Your have Prayer for {numberOfHoursPrayed} Hours
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    marginBottom: 5,
    height: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4285F4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,

    //elevation: 5,
  },
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default PrayerSummary;
