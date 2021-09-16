import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Icon } from 'react-native-elements'
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
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
                {title} : {value}
            </Text>
            <Icon name="chevron-right" type={"feather"} color={"#D3D3D3"}/>
          </View>
          

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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  textStyle: { 
    fontSize: 24, 
    marginStart: 20, 
    paddingVertical: "7%",
    color: 'grey'
  },
  featherContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  image: {},
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default CardInfo;
