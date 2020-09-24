import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CardInfo = ({ title, value }) => {
  //const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        //navigation.navigate("videoPlayer");
      }}
    >
      <View style={styles.card}>
        <View style={styles.valueTitle}>
          <Text style={{ fontSize: 23 }}>{title}</Text>
          <Text style={{ fontSize: 40 }}>{value}</Text>
        </View>
      </View>
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
  imageDim: {
    width: 100,
    height: 200,
  },
  valueTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default CardInfo;
