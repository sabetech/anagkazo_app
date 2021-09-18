import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/index";
import ContactCounsellingItem from "../../components/Members/ContactCounsellingItem";
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';


//get members from here
export default function CounsellingDetail({ navigation, route }) {
  const [counsellings, setCounsellingsPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const isFocused = useIsFocused();

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
    setVisible(false);
  }
  
  let unmounted = false;
  useEffect(() => {
    setLoading(true); //use the contextAPI to pass universally used props
    AsyncStorage.getItem("student_index").then((res) => {
      getCounsellings(res);
      setStudentIndex(res);
    });

    return () => {
      unmounted = true;
    }
  }, [isFocused]);

  const getCounsellings = (myStudentIndex) => {
    fetch(
      `${BASE_URL}/student/${myStudentIndex}/counselling/${route.params.date}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (unmounted) return;
        setLoading(false);
        setCounsellingsPeople(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const afterBurnCounselling = counsellings.filter(item => item.id != rowKey);
    setCounsellingsPeople(afterBurnCounselling);

    deleteCounsellingOnServer(rowKey);
  }

  const deleteCounsellingOnServer = (counsel_id) => {
    fetch(`${BASE_URL}/student/${studentIndex}/counselling/${counsel_id}/delete`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        onToggleSnackBar();
      })
      .catch((error) => {
        alert("Check your internet connection!");
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor:route.params.topBarColor}]}>
        <TouchableHighlight>
          <View style={styles.header}>
            <FontAwesome5
              name="arrow-left"
              size={28}
              color={"#ffffff"}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={{ fontSize: 32 }}></Text>
          </View>
        </TouchableHighlight>
            <Text style={styles.header}>Counselled on {moment(route.params.date).format("ddd, MMM DD YYYY")}</Text>
      </View>
      <View style={{ height: "90%" }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}
        <SwipeListView
          disableRightSwipe={true}
          data={counsellings}
          renderItem={({ item }) => {
            return (
              <ContactCounsellingItem name={item.name} description={item.issue_counselled} photo_url={item.photo_url} />
            );
          }}
          keyExtractor={(item) => item.id + ""}
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
            },
        }}
        >
        Success: Have Deleted a counsel Successfully!
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
    paddingLeft: 15
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
}
});
