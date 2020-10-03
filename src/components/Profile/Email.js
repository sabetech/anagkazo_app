import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

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

const Email = ({ containerStyle, email }) => (
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
      <View style={styles.emailColumn}>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.emailNameColumn}>
        <Text style={styles.emailNameText}>{"Email"}</Text>
      </View>
    </View>
  </View>
);

export default Email;
