import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { Icon } from "react-native-elements";


const submitEmailChange = (event) => {
  console.log(event.nativeEvent.text);
}

const Email = ({ containerStyle, oldemail }) => {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(oldemail);
  return (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.iconRow}>
      {
        <Icon
          name="email"
          underlayColor="transparent"
          iconStyle={styles.emailIcon}
        />
      }
    </View>
    <View style={styles.emailRow}>
    <TouchableOpacity onPress={(() => {
          setEditing(!editing);
        })}>
      <View style={styles.emailColumn}>
        {
      (editing && <TextInput 
              style={styles.emailText} 
              value={email}
              onBlur={event => setEditing(false)}
              blurOnSubmit={true}
              onChangeText={text => setEmail(text)}
              onSubmitEditing={event => {
                submitEmailChange(event);
              }} />)||
        <Text style={styles.emailText}>{email}</Text>
            }
      </View>
      </TouchableOpacity>
      <View style={styles.emailNameColumn}>
        <Text style={styles.emailNameText}>{"Email"}</Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 25,
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
});


export default Email;
