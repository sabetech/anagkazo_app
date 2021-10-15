import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { Chip } from 'react-native-paper';

const MemberAttnListItem = ({ index, name, attn_status, photo_url, navigateTo }) => {

    //get membship attendance status here

  
    return (
      <ListItem bottomDivider >
          <Avatar rounded size="medium" source={{uri: `https://anagkazo.firstlovegallery.com/${photo_url}`}} />
          <ListItem.Content>
            <ListItem.Title>{name}
            </ListItem.Title>
            <ListItem.Subtitle>
              {
                attn_status === -1 ? <Chip style={{backgroundColor: '#e2dfdf'}}>Not Set!</Chip>
                                  : (attn_status === 0) ? <Chip style={{backgroundColor: '#f55124'}} textStyle={{color:'white'}}>Absent</Chip>
                                  : <Chip style={{backgroundColor: '#00fa00'}} textStyle={{color:'black'}}>Present</Chip>
              }
              
            
            </ListItem.Subtitle>
          </ListItem.Content>
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
  
  export default MemberAttnListItem;
  