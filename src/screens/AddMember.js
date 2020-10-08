import React from "react";

export default function AddMember() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>FLOW Prayer Attendance</Text>
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
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 20, //this only works in android .. find out iOS version
  },
  header: {
    fontSize: 24,
    marginTop: 32,
    marginLeft: 15,
    color: "white",
  },
  attendanceList: {
    height: "90%",
  },
});
