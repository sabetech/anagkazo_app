import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Login({ navigation }) {
  const [index_number, setIndexNumber] = React.useState("");
  const [passcode, setPassCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { login } = React.useContext(AuthContext);
  const { studentIndex } = React.useContext(AuthContext);

  useEffect(() => {
    if (studentIndex != null){
      navigation.navigate('home',{
                    screen: 'home',
                    params: {
                      studentIndex: studentIndex
                    }
                  });
    }

  },[studentIndex]);

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
          <Text style={{ fontSize: 18 }}>Login with your Student ID</Text>
          <Input
            style={styles.input}
            placeholder={"Index Number eg: 700100"}
            keyboardType={"numeric"}
            value={index_number}
            onChangeText={setIndexNumber}
          />
          <Text style={{ fontSize: 18, marginTop: 10 }}>Passcode</Text>
          <Input
            style={styles.input}
            placeholder={"passcode eg: 5023"}
            keyboardType={"numeric"}
            secureTextEntry={true}
            value={passcode}
            onChangeText={setPassCode}
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
                login(index_number, passcode).then(result => 
                {
                  if (result){
                    setLoading(false);
                    studentIndex = index_number;
                    navigation.navigate('home',{
                      screen: 'home',
                      params: {
                        studentIndex: index_number
                      }
                    });
                  }else{
                    setLoading(false);
                    alert("Wrong Credentials! Try again!");
                  }
                } 
              );
                
                
              }}
              colors={["rgba(32,150,255,0.9)", "rgba(5,255,163,0.4)"]}
            />
            
          )}
          <TouchableOpacity
            onPress={(()=> {
              navigation.navigate('signup');
            })}
          >
            <Text style={styles.link}>I don't have a Passcode! Sign Up</Text>
          </TouchableOpacity>
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
