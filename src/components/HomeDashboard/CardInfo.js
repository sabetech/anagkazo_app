import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
//import { Avatar } from 'react-native-elements';
import { Avatar } from 'react-native-paper';

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const CardInfo = ({ id, title, value, studentIndex, description, colorDetail, icon, type }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={{padding: 5}}
      onPress={() => {
        navigation.navigate("dashboard-details", {
          id: id,
          studentIndex: studentIndex,
          titleScreen: title,
          description: description,
          colorDetail: colorDetail,
          icon:icon,
          type:type
        });
      }}
    >
      <LinearGradient
          // Button Linear Gradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1.5, y: -0.6 }}
          colors={["rgba(255,255,255,1)", "rgba(255,255,255,1)"]}
          style={{
            elevation: 2,
            height: 80,
            borderRadius: 15
          }}
        >
          
          <Text style={{ fontSize: 24, color: colorDetail, marginLeft: 15, padding: 10, }}>
          <Avatar.Icon size={32} icon="folder" />
              {title} {value} 
              <Text >
                <Feather name="chevron-right" size={24} color={"#D3D3D3"}  />
              </Text>
          </Text>
          
          
          <View style={{ flex: 1 }}></View>
      </LinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    marginBottom: 5,
    height: 80,
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
