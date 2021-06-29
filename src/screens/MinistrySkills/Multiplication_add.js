import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
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
export default function Multiplication_add({ navigation, route }) {
  const [dateVal, setMyDate] = useState("");
  const [formVals, setFormVal] = useState({date:"",soul_won:"", soul_phone:""});
  const [show, setShow] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [soulWon, setSoulWon] = React.useState("");
  const [soulPhone, setSoulPhone] = React.useState("");
  const [serverResponseString, setServerResponse] = useState("");
  
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
      setVisible(false);
      navigation.navigate('multiplication');
    };

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
    });
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setFormVal({...formVals, date: moment(currentDate).format("YYYY-MM-DD") });
    setMyDate(moment(currentDate).format("dddd, MMM DD YYYY"));
  };

  const myfxn = () => {
    setShow(true);
  };

  const onSoulWon = (text) => {
        setFormVal({...formVals, soul_won: text });
        setSoulWon(text);
    }
  const onSoulPhone = (text) => {
        setFormVal({...formVals, soul_phone: text });
        setSoulPhone(text);
    }

  const submit = () =>
  {
    setSubmitLoading(true);
    
    //TODO:validate before submit ..
    fetch(`${BASE_URL}/student/${studentIndex}/multiplication`, {
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
            //TODO: check the json if returns an evil response, give feedback
        setSubmitLoading(false);
        handleSuccessfulSubmission(json);
        })
      )
      .catch((e) => {
        setSubmitLoading(false);
        handleNoInternetError(e);
      });
  };

  const handleSuccessfulSubmission = (json) => {
    setServerResponse(json.payload.msg);
    if (json.response === "failed") handleServerError(json);
    if (json.response === "success") onToggleSnackBar();
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
      "There is no internet connection" + e.message(),
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
        <Text style={styles.header}>Record Outreach</Text>
      </View>
      <KeyboardAwareScrollView style={{ height: "90%", marginHorizontal:10 }}>
        <InfoCard
          infoText="The souls you win on outreach are saved here. Choose the date of the outreach and type in the name and phone number of the soul won."
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
            label="Name of Soul Won"
            value={soulWon}
            onChangeText={text => onSoulWon(text)}
        />
        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3",  }}
        />
        <TextInput
            label="Phone Number"
            value={soulPhone}
            onChangeText={text => onSoulPhone(text)}
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
                navigation.navigate('multiplication');
            },
        }}>
        Success: Your Outreach Data has been Updated!
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
