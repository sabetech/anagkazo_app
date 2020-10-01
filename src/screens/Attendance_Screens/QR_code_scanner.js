import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BASE_URL } from "../../config/index";
import AwesomeAlert from "react-native-awesome-alerts";

export default function QR_code_scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    //break result from QR code into readable sections ...
    setScanned(true);
    //an async post request to post your attendance wont be bad
    postAttendanceSubmission(JSON.parse(data));
  };

  const postAttendanceSubmission = (data) => {
    console.log(data.date);

    fetch(`${BASE_URL}/student/700446/attendance_post`, {
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
          handleAfterAttendanceSubmitted(json);
        })
      )
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAfterAttendanceSubmitted = (json) => {
    setShowAlert(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.hideAlert();
        }}
      />
    </View>
  );
}
