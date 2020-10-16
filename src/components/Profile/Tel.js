import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const submitTelChange = (event) => {
  console.log(event.nativeEvent.text);
}

const Tel = ({ containerStyle, name, number }) => {

  const [editing, setEditing] = useState(false);
  const [number_val, setPhoneNumber ] = useState(number);
  

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        <Ionicons name="ios-call" size={24} color="gray" />
      </View>
      <View style={styles.telRow}>
        <TouchableOpacity onPress={(() => {
          setEditing(!editing);
        })}>
          <View style={styles.telNumberColumn}>
            {
            (editing && <TextInput 
              style={styles.telNumberText} 
              value={number_val}
              onBlur={event => setEditing(false)}
              blurOnSubmit={true}
              onChangeText={text => setPhoneNumber(text)}
              onSubmitEditing={event => {
                submitTelChange(event);
              }} />)||
            <Text style={styles.telNumberText}>{number_val}</Text>
            }
          </View>
        </TouchableOpacity>
        <View style={styles.telNameColumn}>
          <Text style={styles.telNameText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 25,
  },
  iconRow: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  smsIcon: {
    color: "darkgray",
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: "flex-start",
  },
  telIcon: {
    color: "gray",
    fontSize: 30,
  },
  telNameColumn: {
    justifyContent: "flex-start",
  },
  telNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200",
  },
  telNumberColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Tel;
