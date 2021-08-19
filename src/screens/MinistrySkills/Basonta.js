import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../config/index";
import ContactCounsellingItem from "../../components/Members/ContactCounsellingItem";
import { Overlay } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';


//get members from here
export default function Basonta({ navigation, route }) {
  const [basontaMembers, setBasontaMembers] = useState([]);
  const [basontas, setBasontas] = useState([]);
  const [studentIndex, setStudentIndex] = useState("");
  const [selectedBasonta, setPickerBasonta] = useState([]);
  const [member_id, setMemberID] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    count = 0;
  };
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
        setVisible(false);
    }

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
      getBasontaMembers(res);
    });

  }, []);

  const getBasontaMembers = (myStudentIndex) => {
    fetch(
      `${BASE_URL}/student/${myStudentIndex}/listmemberbasonta`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setBasontaMembers(responseJson);

        getBasontas();
      })
      .catch((error) => {
        alert("Check your internet connection");
      });
  };

  const setBasonta = (member_id, basonta_id) => {
    //members/{member_id}/addtobasonta/{basonta_id}
    fetch(
      `${BASE_URL}/student/members/${member_id}/addtobasonta/${basonta_id}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        onToggleSnackBar();
        
        getBasontaMembers(studentIndex); //reload the page

      })
      .catch((error) => {
        alert("Check your internet connection");
      });
  }

  const getBasontas = () => {
    fetch(
      `${BASE_URL}/student/basontas`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setBasontas(responseJson);
      })
      .catch((error) => {
        alert(error)
      });
  }

  let count = 0;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor:route.params.tileColor}]}>
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
            <Text style={styles.header}>Basonta</Text>
      </View>
      <View style={{ height: "90%" }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}
        <FlatList
          data={basontaMembers}
          renderItem={({ item }) => {
            return (
              <ContactCounsellingItem name={item.name} 
              description={(item.basonta == null) ? "No Basonta (Tap To Change)" : item.basonta} 
              photo_url={item.photo_url}
              key={item.id} 
              onPress={(()=>{
                toggleOverlay()
                setMemberID(item.id)
              })}/>
            );
          }}
          keyExtractor={(item) => item.id + ""}
        />
      </View>
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} >
          <View style={{width:Dimensions.get('screen').width - 50}}>
              <Text>Select Basonta</Text>
              <Picker
                prompt={"Basonta"}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => {
                  count++;
                  if (count == 1) return;
                  if (itemValue == null) return;
                  if (member_id == null) return;

                  setPickerBasonta(itemValue);
                  setBasonta(member_id, itemValue);

                }}
                mode={"dropdown"}
                selectedValue={selectedBasonta}
                style={{ width: "100%" }}
              >
                {
                  basontas.map((basonta) => (
                    <Picker.Item id={basonta.id} label={basonta.basonta} value={basonta.id}/>
                  ))
                }   
              </Picker>
          </View>

      </Overlay>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
            },
        }}
        >
        Success: The Basonta has been assign to the Member
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
});
