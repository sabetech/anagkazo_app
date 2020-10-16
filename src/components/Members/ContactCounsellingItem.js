import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { List } from 'react-native-paper';

const ContactCounsellingItem = ({ name, description, photo_url }) => {
  return (
    <List.Item
    title={name}
    description={description}
    left={props => <View style={{marginTop:10,paddingRight:30}}>
                        <Avatar rounded
                            source={{ uri: `https://anagkazo.firstlovegallery.com/${photo_url}` }}
                            size="large"
                        />
                    </View>}
      
  />
  );
};


export default ContactCounsellingItem;
