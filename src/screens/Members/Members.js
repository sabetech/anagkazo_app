import React, { useEffect, useState } from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { Snackbar } from 'react-native-paper';
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../../config/index";
import ContactListItem from "../../components/Members/ContactListItem";
import MyActionButton from "../../components/MyActionButton";

//get members from here
export default function Members({ navigation }) {
  const [studentMembers, setStudentMembers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [studentIndex, setStudentIndex] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => {
    setVisible(false);
  }

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      getStudentMembers(res);
      setStudentIndex(res);
    });
  }, []);

  const getStudentMembers = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/members`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentMembers(responseJson);
        setRefreshing(false);
      })
      .catch((error) => {
        alert("check your internet connection.");
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getStudentMembers(studentIndex);
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    console.log("you get here? " + rowKey);
    deleteMember(rowKey)
    const newData = [...studentMembers];
    const prevIndex = studentMembers.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const deleteMember = (member_id) => {
    fetch(`${BASE_URL}/student/${studentIndex}/members/${member_id}/delete`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        onToggleSnackBar();
      })
      .catch((error) => {
        alert("Check your internet connection!");
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
        <Text style={styles.header}>Members</Text>
      </View>
      <View style={{ height: "90%" }}>
        <SwipeListView
          data={studentMembers}
          renderItem={({ item }) => {
            return (
              <ContactListItem index ={item.id} name={item.name} phone={item.phone} photo_url={item.photo_url} />
            );
          }}
          keyExtractor={(item) => item.id + ""}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableHighlight
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableHighlight>
            </View>
        )}
        
        rightOpenValue={-75}
        leftOpenValue={0}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        />
      </View>
      <MyActionButton icon="md-add" navigateTo="members_add" />

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
                navigation.navigate('members');
            },
        }}
        >
        Success: Your member has been stored!
      </Snackbar>

    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      height: 75,
      backgroundColor: "#0F9D58",
      flexDirection: "row",
      elevation: 10,
    },
    header: {
      fontSize: 21,
      marginTop: 32,
      marginLeft: 15,
      color: "#ffffff",
    },
    backTextWhite: {
      color: '#FFF',
    },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
  });
