import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {BASE_URL} from "../../config/index";


const submitValChange = (event, studentIndex, field, setEdited) => {
  
  fetch(`${BASE_URL}/student/${studentIndex}/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        field: field,
        value: event.nativeEvent.text
    }
    ),
  })
    .then((response) =>
      response.json().then((json) => {
        handleSuccessfulSubmission(json);
        setEdited(true);
      })
    )
    .catch((e) => {
      console.log(e);
      alert("An error Occured. Check Your internet connection");
    });
}

const handleSuccessfulSubmission= (json) =>{
  console.log(json);
}

const CustomProfileField = ({ containerStyle, value, field, icon, type,studentIndex }) => {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [submitting, setSubmitted] = useState(false);
  const [curValue, setCurValue] = useState("");

  useEffect(()=>{
    setCurValue(value);
  },[]);

  return (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.iconRow}>
      {
        <Icon
          name={icon}
          type={type}
          underlayColor="transparent"
          iconStyle={styles.emailIcon}
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
                submitValChange(event, studentIndex, field, setEdited);
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
        <Text style={styles.emailNameText}>{field}</Text>
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

export default CustomProfileField;
