import React from "react";
import { View } from "react-native";
//import { Avatar, Icon } from "react-native-elements";
import { List, Avatar } from 'react-native-paper';

const ContactInitialsLabelItem = ({ name, description, initials }) => {
  return (
    <List.Item
    title={name}
    description={description}
    left={props => <View style={{marginTop:10,paddingRight:30}}>
                        <Avatar.Text
                            label={initials} size={64} style={{backgroundColor:"#d2d2d2"}}
                        />
                    </View>}
      
  />
  );
};


export default ContactInitialsLabelItem;
