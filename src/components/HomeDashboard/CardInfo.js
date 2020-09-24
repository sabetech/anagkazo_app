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
        <Image
          source={{
            uri: `https://anagkazo.firstlovegallery.com/storage/student_photo/700446.JPG`,
          }}
          style={styles.imgDim}
        />
        {/* <View style={styles.valueTitle}>
          <Text style={{ fontSize: 50 }}>Wacenta Service</Text>
          <Text style={{ fontSize: 16 }}>"This Wacenta too"</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    elevation: 10,
    marginBottom: 50,
    height: 150,
    marginHorizontal: 10,
    borderWidth: 4,
    borderRadius: 10,
  },
  imageDim: {
    width: 100,
    height: 200,
  },
  videoTitle: {
    width: 300,
    marginLeft: 30,
  },
});

export default Card;
