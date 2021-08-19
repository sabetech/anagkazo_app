import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoCard from "../../components/Helpers/InfoCard";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Icon, Divider, Button } from "react-native-elements";
import { Switch } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {BASE_URL} from "../../config/index";
import { Picker } from "@react-native-community/picker";
import AwesomeAlert from "react-native-awesome-alerts";



///add a counselling session here ...
export default function Counselling_add({ navigation }) {
  const [dateVal, setMyDate] = useState("");
  const [formVals, setFormVal] = useState({date:"",member_id:0, issue_counselled:"", has_podcast:false});
  const [pickerVal, setPickerVal] = useState("");
  const [pickeroptions, setPickerOptions] = useState([]);
  const [isPodcastSwitchOn, setIsSwitchOn] = React.useState(false);
  const [show, setShow] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [serverResponseString, setServerResponse] = useState("");

  useEffect(() => {
    
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
      loadMembers(res);
    });
  }, []);

  const loadMembers = (studentIndex) => {
    fetch(`${BASE_URL}/student/${studentIndex}/members`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setPickerOptions(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setFormVal({...formVals, date: moment(currentDate).format("YYYY-MM-DD") });
    setMyDate(moment(currentDate).format("dddd, MMM DD YYYY"));
  };

  const myfxn = () => {
    setShow(true);
  };

  const setIssue = (txt) => {
    setFormVal({...formVals, issue_counselled: txt});
  };

  const onToggleSwitch = () => setIsSwitchOn(!isPodcastSwitchOn);

  const submit = () =>
  {
    console.log(formVals);
    //TODO:validate before submit ..
    fetch(`${BASE_URL}/student/${studentIndex}/counselling`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        formVals
      ),
    })
      .then((response) =>
        response.json().then((json) => {
          handleSuccessfulSubmission(json);
        })
      )
      .catch((e) => {
        counsellingSaveError(e);
        navigation.navigate('counselling');
      });
  };

  const handleSuccessfulSubmission = (json) => {
    setServerResponse(json.payload.msg);
    
    if (json.response === "success"){
      setShowAlert(true);
    }

    if (json.response === "failed") {
      counsellingServerLogicError(json);
    }
  }

  const counsellingServerLogicError = (json) => Alert.alert(
    json.response,
    json.payload.msg,
    [
      { text: "OK" }
    ],
    { cancelable: false }
  );

  const counsellingSaveError = (e) =>
    Alert.alert(
      "Failure",
      "An Error Occured! Make sure you have internet access!" + e.message(),
      [
        { text: "OK", onPress: () => navigation.navigate('counselling') }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
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
        </TouchableOpacity>
        <Text style={styles.header}>Add Counselling Session</Text>
      </View>
      <KeyboardAwareScrollView style={{ height: "90%", marginHorizontal:10 }}>
        <InfoCard
          infoText="This is where you can add a counselling session you have had with your member. Select the date of the Counselling and a summary of the issue presented by the member"
          colorDetail={"#4285F4"}
        />

        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3" }}
        />

        <Input
          editable={false}
          placeholder="<- Click to Select Date"
          leftIcon={{ type: "font-awesome", name: "calendar", onPress: myfxn }}
          value={dateVal}
        />
        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3",  }}
        />
        <Text style={{ textAlign: "left", marginLeft: 8, paddingTop:20 }}>
          Choose The Member you Counselled
        </Text>

        <Picker
          prompt={"Choose the member you counselled"}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            setPickerVal(itemValue);
            setFormVal({...formVals, member_id: itemValue});
          }}
          mode={"dropdown"}
          selectedValue={pickerVal}
          style={{ width: "100%" }}
        >
          {
            pickeroptions.map((member) => (
              <Picker.Item key={member.id} label={member.name} value={member.id}/>
            ))
          }

        </Picker>
        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3" }}
        />
        <Text style={{ textAlign: "left", marginLeft: 8, paddingTop:20 }}>
          Issue
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          placeholder={"Type in the issue"}
          style={{
            textAlignVertical: "top",
            margin: 10,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={setIssue}
        />

        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3" }}
        />

        <View style={{ flex:1, flexDirection:"row", paddingVertical:20}}>
          <Text style={{fontSize:18}}> Has Podcast? </Text>
          <Switch value={isPodcastSwitchOn} onValueChange={onToggleSwitch} color={"#4285F4"} />
        </View>
        
        

        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3" }}
        />

        <View style={{ margin: 10, padding:10}}>
        <Button raised
          title="Submit"
          icon={
          <Icon
            name="arrow-right"
            type="font-awesome-5"
            size={25}
            color="white"
            style={{padding:5}}
          />
          }
          style={{height:48, fontSize: 32}}

          onPress={submit}
        />
        </View>

        {show && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            display="default"
            onChange={onDateChange}
          />
        )}

<AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message={serverResponseString}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="OK"
        cancelButtonColor="#4285F4"
        onCancelPressed={() => {
          navigation.navigate('counselling');
        }}
      />
      </KeyboardAwareScrollView>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 75,
    backgroundColor: "#4285F4",
    flexDirection: "row",
    elevation: 10,
  },
  header: {
    fontSize: 21,
    marginTop: 32,
    marginLeft: 15,
    color: "#ffffff",
  },
  myForm: {
    marginHorizontal: 10
  }
});
