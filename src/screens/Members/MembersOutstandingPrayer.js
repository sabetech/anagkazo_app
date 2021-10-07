import React from "react";
import {View, TouchableHighlight, StyleSheet, Text} from "react-native";
import { Icon } from "react-native-elements";

export default function MembersOutstandingPrayer({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableHighlight>
                    <View style={styles.header}>
                        <Icon
                        name="menu"
                        size={28}
                        type="feather"
                        color={"#ffffff"}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                        />
                    </View>
                </TouchableHighlight>
                <Text style={styles.header}>Members To Pray For</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      height: 75,
      backgroundColor: "#694fad",
      flexDirection: "row",
      elevation: 10,
    },
    header: {
      fontSize: 21,
      marginTop: 32,
      marginLeft: 15,
      color: "#ffffff",
    }
});