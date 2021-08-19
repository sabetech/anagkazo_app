import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, TouchableHighlight, FlatList, ActivityIndicator} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Checkbox } from 'react-native-paper';
import { BASE_URL } from "../../config/index";
import InfoCard from "../../components/Helpers/InfoCard";
import { Snackbar } from 'react-native-paper';

export default function ServantsArmedTrained({ navigation, route }) {
    
    const [studentSatResources, setStudentSatResources] = useState([]);
    const [studentIndex, setStudentIndex] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
      

    useEffect(() => {
        //setLoading(true);
        AsyncStorage.getItem("student_index").then((res) => {
          setStudentIndex(res);
          getAllStudentSatResources(res);
          
        });
      }, []);

      const getAllStudentSatResources = (studentIndex) => {
        fetch(`${BASE_URL}/student/${studentIndex}/satresourcebundle`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {            
            setStudentSatResources(responseJson);
            setRefreshing(false);
          })
          .catch((error) => {
            alert("An error occured. Check for internet connection")
          });
      };

      const postAssignedSatResource = (resource_id) => {
        fetch(`${BASE_URL}/student/${studentIndex}/satresource`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {resource_id: resource_id}
              ),
            })
            .then((response) => response.json())
            .then((responseJson) => {     
                onToggleSnackBar()
                setStudentSatResources(responseJson);
                setRefreshing(false);
            })
            .catch((error) => {
              alert("An error occured. Check for internet connection")
            });
        
      }

      const handleRefresh = () => {
        setRefreshing(true);
        getAllStudentSatResources(studentIndex);
      }


    return (
        <View style={styles.container}>
          <View style={[styles.topBar,{backgroundColor:route.params.tileColor}]}>
            <TouchableHighlight>
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
            </TouchableHighlight>
            <Text style={styles.header}>Servants Armed And Trained</Text>
          </View>
          <View style={{ height: "90%" }}>
          <InfoCard
          infoText="Tap the materials to check/Uncheck which of them you possess"
          colorDetail={route.params.tileColor}
        />
                <FlatList
                data={studentSatResources}
                renderItem={({ item, index }) => {
                    return (
                        <List.Item
                      title={item.resource_name}
                      left={props => <List.Icon {...props} icon="folder" />}
                      right={props =>(<Checkbox.IOS label="Item" status={(item.hasCopy) ? "checked":"unchecked"} color={route.params.tileColor} />)
                        }

                      onPress={(()=>{
                        postAssignedSatResource(item.id);
                        })}
                      
                    />
                        )
                }}
                keyExtractor={(item) => item.id + ""}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                />
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={1000}
                action={{
                    label: 'close',
                    onPress: () => setVisible(false)
                    
                }}>
                Success: You have Updated your SAT resources!
            </Snackbar>

          </View>
          )

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
  });