import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";

export function Login({ navigation }) {
  const [index_number, setIndexNumber] = React.useState("");
  const { login } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.anagkazoLogo}>
        <Image
          source={require("../../assets/imgs/logo_anagkazo.png")}
          style={styles.logo_img}
        />
      </View>
      <View style={styles.form}>
        <Text style={{ fontSize: 24 }}>Login with your Student ID</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  form: {
    marginHorizontal: 20,
    marginTop: 100,
  },
  loginButton: {
    marginVertical: 32,
  },
  anagkazoLogo: {
    alignItems: "center",
    marginTop: 1,
  },
  logo_img: {
    width: 150,
    height: 150,
  },
  input: {},
});
