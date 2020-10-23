import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";


const ContactListItem = ({ index, name, phone, photo_url }) => {
  return (
    <ListItem key={index} bottomDivider onPress={(()=>{
      console.log("working yet");
    })}>
        <Avatar rounded size="medium" source={{uri: `https://anagkazo.firstlovegallery.com/${photo_url}`}} />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle>{phone}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    
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
