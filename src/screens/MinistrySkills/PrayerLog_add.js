import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,Alert
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoCard from "../../components/Helpers/InfoCard";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Input, Icon, Divider, Button } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {BASE_URL} from "../../config/index";
import { Snackbar } from 'react-native-paper';


///add a sheep seeking visitation here ...
export default function PrayerLog_add({ navigation, route }) {
  const [dateVal, setMyDate] = useState("");
  const [formVals, setFormVal] = useState({date_time_prayed:"",number_of_hours_prayed:0});
  const [show, setShow] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [serverResponseString, setServerResponse] = useState("");
  
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
      setVisible(false);
      navigation.navigate('prayer_log');
    };

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
    });
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setFormVal({...formVals, date_time_prayed: moment(currentDate).format("YYYY-MM-DD") });
    setMyDate(moment(currentDate).format("dddd, MMM DD YYYY"));
  };

  const myfxn = () => {
    setShow(true);
  };

  const onTextChange = (text) => setFormVal({...formVals, number_of_hours_prayed: parseInt(text) });

  const submit = () =>
  {
    setSubmitLoading(true);
    if (isNaN(text)){
        alert("Make sure the value is a number.")
        setSubmitLoading(false);
        return;
    }
    
    //TODO:validate before submit ..
    fetch(`${BASE_URL}/student/${studentIndex}/prayer`, {
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
          
        setSubmitLoading(false);
        handleSuccessfulSubmission(json);
        })
      )
      .catch((e) => {
        setSubmitLoading(false);
        handleNoInternetError(e)
      });
  };

  const handleSuccessfulSubmission = (json) => {
    setServerResponse(json.payload.msg);
    if (json.response === "success") onToggleSnackBar();

    if (json.response === "failure") handleServerError(json);
  }

  const handleServerError = (json) => {
    Alert.alert(
      "Failure",
      json.payload.msg,
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  const handleNoInternetError = (e) => {
    Alert.alert(
      "Failure",
      "There is not internet " + e.message(),
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar,{backgroundColor: route.params.topBarColor}]}>
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
        <Text style={styles.header}>Update Prayer Log</Text>
      </View>
      <KeyboardAwareScrollView style={{ height: "90%", marginHorizontal:10 }}>
        <InfoCard
          infoText="This is where you log you prayer hours. Select the date you prayed and the number of hours you prayed"
          colorDetail={route.params.topBarColor}
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
        <TextInput
            selectionColor={route.params.topBarColor}
            underlineColor={route.params.topBarColor}
            label="Number of hours Prayed"
            value={text}
            onChangeText={text => {
                setText(text)
                onTextChange(text)}
            }
        />
        
        <View style={{ margin: 10, padding:10}}>
        
        { (submitLoading &&
            <Button
            title="Loading"
            loading
          />) ||
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
        }

        </View>

        {show && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
                navigation.navigate('prayer_log');
            },
        }}>
        {serverResponseString}
      </Snackbar>
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
