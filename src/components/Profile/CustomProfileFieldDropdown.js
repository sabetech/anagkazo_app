import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {BASE_URL} from "../../config/index";




const submitValChange = (event, index, field, setEdited, url_part) => {
  
  //url_part = "edit"
  //url_part = "member/edit"

  fetch(`${BASE_URL}/student/${index}/${url_part}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        field: field,
        value: event.nativeEvent.text,
        member_id: index
    }
    ),
  })
    .then((response) =>
      response.json().then((json) => {
        setEdited(true);
      })
    )
    .catch((e) => {
      console.log(e);
      alert("An error Occured. Check Your internet connection");
    });
}

const CustomProfileFieldDropDown = ({ containerStyle, value, field,userReadableField, icon, type, index, url_part, overrideColor='gray', raised=false, onPress=null }) => {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [curValue, setCurValue] = useState("Type Here...");

  useEffect(()=>{
    setCurValue(value);
  },[value]);

  return (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.iconRow}>
      {
        <Icon
          raised={raised}
          reverseColor={"white"}
          name={icon}
          type={type}
          underlayColor="transparent"
          iconStyle={[styles.emailIcon,{color:overrideColor}]}

          onPress={onPress}

        />
      }
    </View>
    <View style={styles.emailRow}>
      <TouchableOpacity onPress={(() => {
          setEditing(true);
          
        })}>
      <View style={[styles.emailColumn,{justifyContent: "space-between"}]}>
      {
      (editing && <TextInput 
              style={styles.emailText} 
              value={curValue}
              onBlur={event => setEditing(false)}
              blurOnSubmit={true}
              onChangeText={text => setCurValue(text)}
              onSubmitEditing={event => {
                submitValChange(event, index, field, setEdited, url_part);
              }} />)||
        <Text style={styles.emailText}>{curValue != "" ? curValue : "Not Set"}</Text>
        }
      <View style={styles.editStatusIcon}>
      {(editing &&
        <ActivityIndicator
          size={"small"}
          color={"green"}
        />) ||
        (edited ? <Icon
          name={"check"}
          type={"antdesign"}
          underlayColor="transparent"
          iconStyle={styles.editStatusIcon}
        /> : null)
      }
    </View>
      </View>
      <View style={styles.emailNameColumn}>
        <Text style={styles.emailNameText}>{userReadableField}</Text>
      </View>
      </TouchableOpacity>
     
    </View>
  </View>
  )}


const styles = StyleSheet.create({
  container: {
    marginTop:15,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  emailColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  emailIcon: {
    color: "gray",
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  emailNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  emailRow: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: "center",
  },
  editStatusIcon: {
    marginRight: 10,
    color: "green"
  }
});

export default CustomProfileFieldDropDown;
