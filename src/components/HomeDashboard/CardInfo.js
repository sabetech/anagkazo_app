import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("videoPlayer");
      }}
    >
      <View style={styles.card}>
        {/* <Image
          source={{
            uri: `https://unsplash.com/photos/ktrLmQlZLUI/download?force=true&w=640`,
          }}
          style={styles.imageDim}
        /> */}
        <View style={styles.videoTitle}>
          <Text style={{ fontSize: 25 }} ellipsizeMode="tail" numberOfLines={2}>
            {props.title}
          </Text>
          <Text style={{ fontSize: 16 }}>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    marginBottom: 50,
    height: 230,
  },
  imageDim: {
    width: "100%",
    height: 200,
  },
  videoTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default Card;
