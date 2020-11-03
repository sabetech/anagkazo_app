import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import InfoCard from "../../components/Helpers/InfoCard";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Input, Icon, Divider, Button, BottomSheet, ListItem, SearchBar } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {BASE_URL} from "../../config/index";
import { Snackbar } from 'react-native-paper';


///add a sheep seeking visitation here ...
export default function CenterService_AttnAdd({ navigation, route }) {
  const [dateVal, setMyDate] = useState("");
  const [formVals, setFormVal] = useState({number_of_souls:"",center_id:0,date:""});
  const [show, setShow] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [centers, setCenterList] = useState([]);
  const [centersInMemory, setCentersInMemory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState('No Center Selected');
  const [search, setSearch] = useState('');

  
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => {
      setVisible(false);
      navigation.goBack();
    };

  useEffect(() => {
    AsyncStorage.getItem("student_index").then((res) => {
      setStudentIndex(res);
    });
    getCentersList();

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

  const getCentersList = () => {
    fetch(`${BASE_URL}/centers`)
      .then((response) => response.json())
      .then((responseJson) => {
          
        setCenterList(responseJson); 
        setCentersInMemory(responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
  };


  const submit = () =>
  {
    setSubmitLoading(true);
    
    fetch(`${BASE_URL}/student/${studentIndex}/center_service_attn`, {
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
        handleSuccessfulSubmission();
        })
      )
      .catch((e) => {
        setSubmitLoading(false);
        alert("An error Occured in your submission. Your submission was not successful. Make Sure you have internet connection")
      });
  };

  const handleSuccessfulSubmission = () => {
    onToggleSnackBar();
  }

  const updateSearch = (search) => {
    setSearch(search);
    const filteredCenters = centersInMemory.filter(center => 
        (center.center_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
    setCenterList(filteredCenters);
  };

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
        <Text style={styles.header}>Center Service Attendance</Text>
      </View>
      <View style={{ height: "90%", marginHorizontal:10 }}>
        <InfoCard
          infoText="This is where you record you center service attendance"
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
            selectionColor={route.params.topBarColor}
            underlineColor={route.params.topBarColor}
            label="Number of Souls"
            value={formVals.number_of_souls}
            keyboardType={'numeric'}
            onChangeText={text => {
                 setFormVal({...formVals, number_of_souls: text })
                }
            }
        />
        <Divider
          height={1}
          width={"100%"}
          style={{ backgroundColor: "#d3d3d3",  }}
        />

        <Button
        title={selectedCenter+" \n(Click to Choose Center)"}
        type="clear"
        onPress={()=>setIsVisible(true)}
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
                navigation.goBack();
            },
        }}>
        Success: Your Center Attendance is recorded Successfully
      </Snackbar>
      </View>
      <BottomSheet isVisible={isVisible} style={{height:"100%"}} onPress={()=>setIsVisible(false)}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <Button icon={{
            name: "close",
            size: 22,
            color: "white"
        }} 
        title="Close" 
        buttonStyle={{backgroundColor: "red"}}
        onPress={()=>setIsVisible(false)}
        />

        {centers.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={()=>{
                setFormVal({...formVals, center_id: l.id })
                setIsVisible(false);
                setSelectedCenter(l.center_name);
                }}>
            <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.center_name}</ListItem.Title>
            </ListItem.Content>
            </ListItem>
        ))}
      </BottomSheet>


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
