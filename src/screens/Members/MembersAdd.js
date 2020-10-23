import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon, Divider, Button } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {BASE_URL} from "../../config/index";
import { Picker } from "@react-native-community/picker";
import { Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';



///add a counselling session here ...
export default function MembersAdd({ navigation }) {
  const [dateVal, setMyDate] = useState("");
  const [formVals, setFormVal] = useState({});  
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [image_uri, setImage] = useState(null);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
        setVisible(false);
        navigation.navigate('members');
    }

  useEffect(() => {
    
    (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();

    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
    });

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setFormVal({...formVals, date_of_birth: moment(currentDate).format("YYYY-MM-DD") });
    setMyDate(moment(currentDate).format("dddd, MMM DD YYYY"));
  };

  const submit = () =>
  {
    setSubmitLoading(true);
    let formData = new FormData();
    
    Object.keys(formVals).forEach(function(field){
        formData.append(field, formVals[field]);
    });

    let uriParts = image_uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('member_photo', {
        uri:image_uri, name: `photo.${fileType}`,
        type: `image/${fileType}`,});

    //TODO:validate before submit ..
    fetch(`${BASE_URL}/student/${studentIndex}/members/add`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        
      },
      body: formData,
    })
      .then((response) =>
        response.json().then((json) => {
          handleSuccessfulSubmission(json);
        })
      )
      .catch((e) => {
        console.log(e);
        alert("An error occurred. Check you internet");
      });
  };

  const handleSuccessfulSubmission = (json) => {
    setSubmitLoading(false);
    onToggleSnackBar();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
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
        <Text style={styles.header}>Add Members</Text>
      </View>
      <KeyboardAwareScrollView style={{ height: "90%", marginHorizontal:10 }}>
      <TextInput
        label="Full Member name"
        value={formVals.name}
        left={<TextInput.Icon 
            name="text" 
            color="grey" 
            size={32} 
            />}
        onChangeText={text => setFormVal({...formVals, name:text})}
        />
        <TextInput
            editable={false}
            placeholder="Date of Birth"
            left={<TextInput.Icon 
                    name="calendar" 
                    color="grey" 
                    size={32} 
                    onPress={(() => 
                        {setShow(true)})}/>}
            value={dateVal}
        />
        
        <TextInput
        label="Phone"
        value={formVals.phone}
        onChangeText={text => setFormVal({...formVals, phone:text})}
        left={<TextInput.Icon 
            name="phone" 
            color="grey" 
            size={32} 
            />}
        />
        
        <TextInput
        label="Whatsapp Number"
        value={formVals.whatsapp}
        onChangeText={text => setFormVal({...formVals, whatsapp:text})}
        left={<TextInput.Icon 
            name="whatsapp" 
            color="grey" 
            size={32} 
            />}
        />        
        <Text style={{marginTop:15}}>Gender</Text>
        <Picker
          prompt={"Gender"}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => {
            setFormVal({...formVals, gender: itemValue});
          }}
          mode={"dialog"}
          selectedValue={formVals.gender}
          style={{ width: "100%" }}
        >          
            <Picker.Item label={"Male"} value={"m"}/>
            <Picker.Item label={"Female"} value={"f"}/> 
        </Picker>

        <Text style={{marginTop:15}}>Marital Status</Text>
        <Picker
          prompt={"Marital Status"}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => {
            setFormVal({...formVals, marital_status: itemValue});
          }}
          mode={"dialog"}
          selectedValue={formVals.marital_status}
          style={{ width: "100%" }}
        >
            <Picker.Item label={"Single"} value={"single"}/>
            <Picker.Item label={"Married"} value={"married"}/>
        </Picker>

        <Text style={{marginTop:15}}>A-Church / F-Church</Text>
        <Picker
          prompt={"Member Category"}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => {
            setFormVal({...formVals, member_category: itemValue});
          }}
          mode={"dialog"}
          selectedValue={formVals.memberCategory}
          style={{ width: "100%" }}
        >
            <Picker.Item label={"A-Church"} value={"A-Church"}/>
            <Picker.Item label={"F-Church"} value={"F-Church"}/>
        </Picker>
        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3" }}
        />
        
        <TextInput
        label="Occupation"
        value={formVals.occupation}
        onChangeText={text => setFormVal({...formVals, occupation:text})}
        left={<TextInput.Icon 
            name="android-studio" 
            color="grey" 
            size={32} 
            />}
        />

        <TextInput
        label="Area of Residence"
        value={formVals.area_of_residence}
        onChangeText={text => setFormVal({...formVals, area_of_residence:text})}
        left={<TextInput.Icon 
            name="home" 
            color="grey" 
            size={32} 
            />}
        />

        <TextInput
        label="City"
        value={formVals.city}
        onChangeText={text => setFormVal({...formVals, city:text})}
        left={<TextInput.Icon 
            name="city-variant-outline" 
            color="grey" 
            size={32} 
           />}
        />

        <TextInput
        label="Country"
        value={formVals.country}
        onChangeText={text => setFormVal({...formVals, country:text})}
        left={<TextInput.Icon 
            name="earth" 
            color="grey" 
            size={32} 
            />}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Upload Image of Member" onPress={pickImage} />
            {image_uri && <Image source={{ uri: image_uri }} style={{ width: 200, height: 200 }} />}
        </View>

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
        duration={1000}
        action={{
            label: 'close',
            onPress: () => {
                setVisible(false);
                navigation.navigate('members');
            },
        }}
        >
        Success: Your member has been stored!
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
    backgroundColor: "green",
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
