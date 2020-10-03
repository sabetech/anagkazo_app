import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";

export function Login({ navigation }) {
  const [index_number, setIndexNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { login } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../res/imgs/login_background.jpg")}
        style={styles.image}
      >
        {/* <LinearGradient
          // Button Linear Gradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(255,110,196,0.2)", "rgba(120,115,245,0.8)"]}
        > */}
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
          {loading ? (
            <ActivityIndicator
              style={{ marginTop: 10 }}
              size="large"
              color="darkblue"
            />
          ) : (
            <FilledButton
              title={"Login"}
              style={styles.loginButton}
              onPress={() => {
                setLoading(true);
                login(index_number).then((res) => {
                  setLoading(false);
                  if (res) {
                    navigation.navigate("home");
                  } else console.log("Wrong Info");
                });
              }}
            />
          )}
        </View>
        {/* </LinearGradient> */}
      </ImageBackground>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  input: { fontSize: 21 },
});
