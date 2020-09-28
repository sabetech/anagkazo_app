import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CardInfo = ({ title, value, extra_details }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Dashboard_Details_Screen", {
          videoId: props.videoId,
          title: props.title,
        });
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
          colors={["rgba(32,150,255,0.9)", "rgba(5,255,163,0.4)"]}
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
          >
            Click For More Details
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 35, color: "rgb(255,255,255)" }}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "right",
                alignSelf: "stretch",
                fontSize: 45,
                color: "rgb(255,255,255)",
              }}
            >
              {value}
            </Text>
          </View>
          <Text style={{ color: "rgb(255,255,255)" }}>{extra_details}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
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
