import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";

export function Login({ navigation }) {
  const [index_number, setIndexNumber] = React.useState("");
  const { login } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Login with your Student ID</Text>
      <Input
        style={styles.input}
        placeholder={"Index Number eg: 700100"}
        keyboardType={"numeric"}
        value={index_number}
        onChangeText={setIndexNumber}
      />
      <FilledButton
        title={"Login"}
        style={styles.loginButton}
        onPress={() => {
          login(index_number);

          navigation.navigate("home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    marginVertical: 32,
  },
  input: {},
});
