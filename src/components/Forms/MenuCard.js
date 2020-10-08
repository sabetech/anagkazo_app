import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

//NEEDLESS TO SAY, I HATE THE STRUCTURE OF MY CODE ... ANYWAYS .. BABY REACT NATIVE STEPS SO YEAH
const MenuCard = ({
  title,
  cardBorderColor,
  destinationScreen,
  icon,
  iconType,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainCard}>
      {/* // <TouchableHighlight
    //   onPress={() => {
    //     navigation.navigate(destinationScreen, {
    //       titleScreen: title,
    //       tileColor: cardBorderColor,
    //     });
    //   }}
    // > */}
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1.5, y: -0.6 }}
        colors={["rgba(255,255,255,0.9)", "rgba(225,225,255,0.4)"]}
        style={[styles.card, { borderColor: cardBorderColor }]}
      >
        <View>
          {
            <Icon
              name={icon}
              type={iconType}
              underlayColor="transparent"
              size={52}
              color="grey"
              style={styles.iconStyle}
            />
          }
        </View>
      </LinearGradient>
      {/* </TouchableHighlight> */}
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: { width: "40%", margin: "5%" },
  card: {
    padding: 10,
    height: 130,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconStyle: { margin: 20 },
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default MenuCard;
