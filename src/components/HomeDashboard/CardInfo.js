import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const CardInfo = ({ id, title, value, extra_details, handler }) => {
  return (
    <TouchableHighlight
      onPress={() => {
        if (handler != null) handler(true, id);
      }}
    >
      <ImageBackground
        source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
        style={styles.image}
      >
        <LinearGradient
          // Button Linear Gradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1.5, y: -0.6 }}
          colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.4)"]}
          style={{
            padding: 15,
            height: 120,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff",
            }}
          ></Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, color: "#000" }}>
              {title}: {value}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </LinearGradient>
      </ImageBackground>
    </TouchableHighlight>
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
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
  },
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default CardInfo;
