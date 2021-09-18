import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
  } from "react-native";
import { Icon } from "react-native-elements";
import {studentIndex} from "../../contexts/AuthContext";

export default function MembersAttn({ navigation }) {
    const [studentMembersAttn, setStudentMembersAttn] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = React.useState(false);

    let unmounted = false;

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (unmounted) return;
        getMembersAttn(studentIndex);
    
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        getMembersAttn(studentIndex);
    }

    const getMembersAttn = () => {
        fetch(`${BASE_URL}/student/${myStudentIndex}/membersAttn`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (unmounted) return;
              setStudentMembersAttn(responseJson);
              setRefreshing(false);
            })
            .catch((error) => {
              alert("check your internet connection.");
            });
    }

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
                <Text style={styles.header}>Members Attendance</Text>
            </View>
            



      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      height: 75,
      backgroundColor: "#067E6B",
      flexDirection: "row",
      elevation: 10,
    },
    header: {
      fontSize: 21,
      marginTop: 32,
      marginLeft: 15,
      color: "#ffffff",
    }
}
);