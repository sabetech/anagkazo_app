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
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";

export function SignUp({ navigation }) {
  const [index_number, setIndexNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../res/imgs/login_background.jpg")}
        style={styles.image}
      >
        
        <View style={styles.anagkazoLogo}>
          <Image
            source={require("../../assets/imgs/logo_anagkazo.png")}
            style={styles.logo_img}
          />
        </View>
        <View style={styles.form}>
          <Text style={{ fontSize: 18 }}>Sign with your Email</Text>
          <Input
            style={styles.input}
            placeholder={"hugosmith@gmail.com"}
            keyboardType={"email-address"}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{ fontSize: 18, marginTop: 10 }}>Index Number</Text>
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
              title={"Sign Up"}
              style={styles.loginButton}
              onPress={() => {
                setLoading(true);
                signUp(index_number, email).then((result) => {
                  setLoading(false);
                  if (result) {
                      //use a snack bar for this ...
                    alert(`Your Passcode has been sent to your E-mail:\n${email}\n.Please use it to Login`);
                    navigation.navigate("login");
                  } else alert("Incorrect Credentials!, Try again or Sign up if you don't have a Passcode")
                });
              }}
              colors={["#CB356B", "#BD3F32"]}

            />
            
          )}
          <TouchableOpacity
            onPress={(()=> {
              navigation.navigate('login')
            })}
          >
            <Text style={styles.link}>I have a Passcode! Login</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 50,
  },
  loginButton: {
    marginVertical: 32,
  },
  anagkazoLogo: {
    alignItems: "center",
    marginTop: 50,
  },
  logo_img: {
    width: 100,
    height: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  input: { fontSize: 21 },
  link:{
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 18

  }
});
