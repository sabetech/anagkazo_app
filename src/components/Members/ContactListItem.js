import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

const ContactListItem = ({
  name,
  phone,
  whatsappNo,
  photo_url,
  dateOfBirth,
}) => {
  return (
    <View style={styles.mainContactItem}>
      <View style={styles.listItem}>
        <Image
          style={styles.image}
          source={{ uri: `https://anagkazo.firstlovegallery.com/${photo_url}` }}
        />
        <View style={styles.textRow}>
          <View style={styles.textColumn}>
            <Text style={styles.contacText}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              {
                <Icon
                  name={"logo-whatsapp"}
                  type={"ionicon"}
                  underlayColor="transparent"
                  iconStyle={{ fontSize: 30, color: "green" }}
                  style={styles.callActionStyle}
                />
              }
            </View>
            <View>
              {
                <Icon
                  name={"phone"}
                  type={"font-awesome5"}
                  underlayColor="transparent"
                  iconStyle={{ fontSize: 30, color: "green" }}
                  style={styles.callActionStyle}
                />
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  textColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contacText: {
    fontSize: 18,
    marginLeft: 20,
    paddingTop: 15,
  },
  callActionStyle: {
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 15,
    //justifyContent: "flex-end",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    borderBottomWidth: 0.5,
    borderWidth: 0,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: "17%",
    borderWidth: 3,
    height: "78%",
    borderRadius: 75,
    borderColor: "#FFF",
  },
  whatsappIcon: {},
});

export default ContactListItem;
