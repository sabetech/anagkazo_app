import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const InfoCard = ({ infoText, colorDetail }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
        style={{
          resizeMode: "cover",
          justifyContent: "center",
          margin: 15,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: colorDetail,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1.5, y: -0.6 }}
          colors={["rgba(255,255,255,1)", "rgba(255,255,255,0.9)"]}
          style={{
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={styles.iconStyle}>
            <Feather name="info" size={24} color={colorDetail} />
          </Text>
          <View>
            <Text style={[{ color: colorDetail, textAlign: "left" }]}>
              {infoText}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  card: {
    elevation: 10,
    marginBottom: 5,
    height: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  image: {},
  infoText: {
    fontSize: 15,
    marginLeft: 30,
  },
  iconStyle: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
    textAlign: "right",
    paddingBottom: 10,
  },
});

export default InfoCard;
