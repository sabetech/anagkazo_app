import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Linking } from "react-native";
import { Icon } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {BASE_URL} from "../../config/index";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";

import moment from "moment";


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
          console.log(json);
        setEdited(true);
      })
    )
    .catch((e) => {
      console.log(e);
      alert("An error Occured. Check Your internet connection");
    });
}

const CustomDateField = ({ containerStyle, value, field,userReadableField, icon, type, index, url_part, overrideColor='gray', raised=false, onPress=null }) => {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [curValue, setCurValue] = useState("Type Here...");
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (editing) inputRef.current.focus();
  },[editing])
  
  useEffect(()=>{
    setCurValue(value);
  },[value]);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setCurValue(moment(currentDate).format("YYYY-MM-DD"));
  };

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
          setShow(true);
        })}>
      <View style={[styles.emailColumn,{justifyContent: "space-between"}]}>
      {
      (editing && <TextInput 
              editable = {false}
              ref={inputRef}
              style={styles.emailText} 
              value={curValue}
              selectTextOnFocus={true}
              onBlur={event => setEditing(false)}
              blurOnSubmit={true}
              onChangeText={text => setCurValue(text)}
              onSubmitEditing={event => {
                submitValChange(event, index, field, setEdited, url_part);
              }} />)||
        <Text style={styles.emailText}>{curValue != "" ? curValue : "Not Set (Tap to Edit)"}</Text>
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
    {show && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            display="default"
            onChange={onDateChange}
          />
        )}
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

export default CustomDateField;
