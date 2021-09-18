import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
// import { Avatar, Icon } from "react-native-elements";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { List } from 'react-native-paper';

const ContactCounsellingItem = ({ name, description, photo_url, onPress = null }) => {
  return (
    <List.Item
    title={name}
    description={description}
    style={{backgroundColor: 'white'}}
    left={props => 
              <View style={{marginTop:10,paddingRight:30}}>
                        <Avatar rounded
                            source={{ uri: `https://anagkazo.firstlovegallery.com/${photo_url}` }}
                            size="large"
                        />
                    </View>}
    onPress={onPress}
      
  />
  // <ListItem bottomDivider >
  //     <Avatar rounded size="medium" source={{uri: `https://anagkazo.firstlovegallery.com/${photo_url}`}} />
  //     <ListItem.Content>
  //       <ListItem.Title>{name}</ListItem.Title>
  //       <ListItem.Subtitle>{description}</ListItem.Subtitle>
  //     </ListItem.Content>
  //     <ListItem.Chevron />
  //   </ListItem>


  );
};


export default ContactCounsellingItem;
