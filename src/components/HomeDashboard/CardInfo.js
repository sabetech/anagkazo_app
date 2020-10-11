import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const CardInfo = ({ id, title, value, studentIndex, colorDetail, icon, type }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("dashboard-details", {
          id: id,
          studentIndex: studentIndex,
          titleScreen: title,
          colorDetail: colorDetail,
          icon:icon,
          type:type
        });
      }}
    >
      <ImageBackground
        source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          margin: 5,
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
              textAlign: "right",
            }}
          >
            <Feather name="arrow-right-circle" size={24} color={colorDetail} />
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, color: colorDetail }}>
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

  image: {},
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default CardInfo;
