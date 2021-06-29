import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BASE_URL } from "../../config/index";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

export default function QR_code_scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();
  const [studentIndex, setStudentIndex] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
    });


  }, []);

  const handleBarCodeScanned = ({ data }) => {
    //break result from QR code into readable sections ...
    setScanned(true);
    //an async post request to post your attendance wont be bad
    postAttendanceSubmission(JSON.parse(data));
  };

  const postAttendanceSubmission = (data) => {

    fetch(`${BASE_URL}/student/${studentIndex}/attendance_post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: data.event,
        date: data.date,
        service_type: data.service_type,
      }),
    })
      .then((response) =>
        response.json().then((json) => {
          console.log(json);
          handleAfterAttendanceSubmitted(json);
        })
      )
      .catch((e) => {
        createScanFailureAlert({payload:{msg: e.message}});
      });
  };

  const handleAfterAttendanceSubmitted = (json) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (json.response == "success"){
      createScanSuccessAlert(json);
    }else{
      createScanFailureAlert(json);
    }
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const createScanSuccessAlert = (json) => {
    Alert.alert(
      'Scan Successful!',
      json.payload.msg,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ],
      { cancelable: false }
    );
  }

  const createScanFailureAlert = (failure) => {
    console.log(failure);
    Alert.alert(
      'Scan Failed!',
      failure.payload.msg,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ],
      { cancelable: false }
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      > 
      
      <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
        </BarCodeScanner>
      
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="You have successfully CheckedIn"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="OK"
        confirmButtonColor="#33DD55"
        onCancelPressed={() => {
          navigation.goBack();
        }}
      />

      
    </View>
  );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
});